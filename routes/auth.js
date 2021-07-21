const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const authController = require('./../controllers/Auth')
const {authenticateUser, checkAdmin} = require('./../middleware/Authenticate')

router.post('/register', (req, res) => {
    authController.register(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/login', (req, res) => {
    authController.login(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/usercontext', authenticateUser, (req, res) => {
    authController.usercontext(req, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router