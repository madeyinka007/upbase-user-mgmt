const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const userController = require('./../controllers/Users')
const {authenticateUser, checkAdmin} = require('./../middleware/Authenticate')

router.post('/modify', (req, res) => {
    userController.update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    userController.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull',(req, res) => {
    userController.pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    userController.del(req.query.identity, (state) =>{
        Util.resp(res).json(state)
    })
})

module.exports = router