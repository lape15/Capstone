const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');

const authEmployee = require('../middleware/authEmployee');

const gifCtrl = require('../controllers/gif')

router.post('/upload', [authEmployee, multer.multerUploads], gifCtrl.uploadGif)

module.exports = router; 