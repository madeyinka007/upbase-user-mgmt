var Base = require('./BaseModel')
var schemaInit = require('./schema/UserSchema')

var modelInit = Base.extend('UserModel', {
    init: function(){
        this._super(schemaInit,"USERS");
    }
})
module.exports = new modelInit()