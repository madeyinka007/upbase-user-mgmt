const userModel = require('./../model/UserModel')
const Util = require('./../libraries/Utility')
const dotenv = require('dotenv')

exports.seedAdmin = () => {
    userModel.findOne({conditions:{role: "admin"}}, (state) => {
        if (state && state._id) {
            return "Admin account already exists"
        }
        var user = {fname:"Admin",lname:"Upbase",username:"admin",password:Util.get_hash(process.env.admin_pass),role:"admin"}
        userModel.save(user, (resp) => {
            if (!resp._id)
                return "could not save user information"
            else 
                return "Admin user created successfully"

        })
    })
}