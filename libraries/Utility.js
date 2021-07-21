const _config = require('./../config/app.json')

const Utility = {
    date_time: function(dt){
        var moment = require('moment-timezone');
        return moment.tz(dt, "Africa/Lagos").format('YYYY-MM-DD HH:mm:ss');
    },

    param_extract: function(req){
        var data = {}
        if (req.fields)
            data = req.fields
        else if(req.body)
            data = req.body;

        return data
    },

    get_hash: function(value) {
        const bcrypt = require('bcrypt')
        const saltRounds = bcrypt.genSaltSync(_config.bcrypt._rounds)
        return bcrypt.hashSync(value, saltRounds)    
    },

    check_password: function(value1, value2) {
        const bcrypt = require('bcrypt')
        const result = bcrypt.compareSync(value1, value2)
        return result
    },

    generate_token:  function(payload) {
        const jwt = require('jsonwebtoken')
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY})
        return token;
    },

    filter_params: function(param) {
        var exclude_key = ["limit", "skip", "sortby", "orderby", "page"], filter = {}
        for (key in param) {
            if (param[key] != "" && exclude_key.indexOf(key) == -1) {
                filter[key] = param[key]
            }
        }
        return filter
    },

    resp: function(res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res;
    }
}

module.exports = Utility