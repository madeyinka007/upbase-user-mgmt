const mongoose = require('mongoose')
const _config = require('../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema({
    fname: {type: String, default:""},
    lname: {type: String, default:""},
    username: {type: String, unique:true, default:""},
    password: {type: String},
    role: {type:String, enum:["admin", "regular"], default:"regular"},
    age: {type:Number},
    occupation: {type:String, default:""},
    avatar: {type:String, default:""},
    profile: {type:String, default:""},
    facebook: {type:String, default:""},
    twitter: {type:String, default:""},
    date_added: {type:Date, default: Date.now}
})

var modelInit = mongoose.model(_collection.user, SchemaDef)
module.exports = modelInit