const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const userModel = require('./../model/UserModel')

const authInit = {

    register: (param, callback) => {
        var error = []
        if (!param.firstname)error.push('First name is required')
        if (!param.lastname)error.push('Last name is required')
        if (!param.username)error.push('Username is required')
        if (!param.password)error.push('Password is required')

        if (error.length == 0) {
            var data = {
                fname: param.firstname,
                lname: param.lastname,
                username: param.username,
                password: Util.get_hash(param.password)
            }
            userModel.save(data, (resp) => {
                if (!resp._id) {
                    return callback(Resp.error({msg:"User Information already exist"}))
                } else {
                    return callback(Resp.success({msg:"User created successfully", resp:resp}))
                }
            })
        } else {
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
        }
    },

    login: (param, callback) => {
        var error = []
        if (!param.username)error.push('Provide a username')
        if (!param.password)error.push('Password cannot be blank')

        if (error.length == 0) {
            userModel.findOne({conditions:{username:param.username}}, (user) => {
                if (user && user != null) {
                    let match = Util.check_password(param.password, user.password)
                    if (match) {
                        const payload = {id:user._id,username:user.username,role:user.role}
                        const token = Util.generate_token(payload)
                        return callback(Resp.success({msg:"Login Successful", resp:token}))
                    }else {
                        return callback(Resp.error({msg:"Invalid Credentials"}))
                    }
                }else
                    return callback(Resp.error({msg:"User not found!"}))
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    usercontext: (param, callback) => {
        var userobj = {}
        if (param.userInfo) {
            userModel.findOne({conditions:{_id:param.userInfo.id}}, (state) => {
                userobj.id = state.id
                userobj.username = state.username
                userobj.role = state.role
                return callback(Resp.success({msg:"User Information found", resp:userobj}))
            }) 
        } else {
            return callback(Resp.error({msg:"Please sign up to get started", resp:null}))
        }
    }
}

module.exports = authInit