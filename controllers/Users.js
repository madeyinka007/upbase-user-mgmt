const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const userModel = require('./../model/UserModel')

const userInit = {

    update: (param, callback) => {
        var error = [], data = {}
        if (!param.identity)error.push('Provide user identity')
        if (param.firstname)data.firstname = param.firstname
        if (param.lastname)data.lastname = param.lastname
        if (param.username)data.username = param.username
        if (param.occupation)data.occupation = param.occupation
        if (param.age)data.age = param.age
        if (param.avatar)data.avatar = param.avatar
        if (param.profile)data.profile = param.profile

        if (error.length == 0) {
            userModel.update(data, {_id:param.identity}, (resp) => {
                if (!resp._id) {
                    return callback(Resp.error({msg:"Could not save user information"}))
                }else{
                    return callback(Resp.success({msg:"User Information update successful"}))
                }
            })
        } else {
            return callback(resp.error({msg:"Invalid Parameter", resp:null}))
        }       
    },

    by_identity: (param, callback) => {
        userModel.findOne({conditions:{_id:param}}, (state) => {
            if (state && !state.error) {
                return callback(Resp.success({msg:"User found", resp:state}))
            }else{
                return callback(Resp.error({msg: "User not found!"}))
            }
        })
    },

    pull: (param, callback) => {
        var conditions = Util.filter_params(param)
        userModel.findAll({conditions:conditions}, (state) => {
            if (state && !state.error) {
                return callback(Resp.success({msg:"Users records found", resp:state}))
            } else {
                return callback(Resp.error({msg:"Could not fetch users data", resp:null}))
            }
        })
    },

    del: (param, callback) => {
        var error = []
        if (!param)error.push('Provide identity')

        if (error.length == 0) {
            userModel.findOne({conditions:{_id:param}}, (state) => {
                if (state && !state.error) {
                    userModel.del(param, (resp) => {
                        if (resp){
                            return callback(Resp.success({msg:"Record deleted successfully"}))
                        } else
                            return callback(Resp.error({msg:"Error in deleting record"}))
                    })
                }
            })
        }
    }
}

module.exports = userInit