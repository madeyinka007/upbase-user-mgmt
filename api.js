const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const Logger = require('./libraries/Logger')
const _config = require('./config/app.json')
const dotenv = require('dotenv').config()

const {seedAdmin} = require('./seeder/admin')
//seedAdmin()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(require('./routes'))
app.use('/images', express.static(path.join("assets")))

app.listen(process.env.PORT, ()=>{
    Logger.init({msg:_config.app_name+ ' version '+_config.app_version+ ' Listening on http://[:]'+process.env.PORT+_config.app_base+_config.api._url+_config.api._version })
})