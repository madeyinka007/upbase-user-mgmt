const express = require('express')
const router = express.Router()
const multer = require('multer')
const _config = require('./../config/app.json')
const Resp = require('./../controllers/Response')
const Util = require('./../libraries/Utility')

router.post('/upload', (req, res) => {
    var location = _config.asset_folder
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, location)
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() +'_'+ file.originalname)
        }
    })
    var upload = multer({ storage : storage}).single('file');
    upload(req,res,function(err) {
        if(err) {
            Util.resp(res).json(Resp.error({msg: "Error uploading file.",resp:err}))
        }
        var image_path = _config.image_path+'/'+req.file.filename
        Util.resp(res).json(Resp.success({msg:"File Uploaded Successfully",resp:image_path}))
    });
})


module.exports = router