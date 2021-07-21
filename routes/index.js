const express = require('express')
const router = express.Router()
const _config = require('./../config/app.json')

const api_url = _config.app_base+_config.api._url+_config.api._version

router.use(api_url+'/auth', require('./auth'))
router.use(api_url+'/user', require('./user'))
router.use(api_url+'/assets', require('./assets'))

module.exports = router