const express = require('express');
const router = express.Router();


const authEmployee = require('../middleware/authEmployee');
const commentCtrl = require('../controllers/gif');

router.post('/' ,authEmployee,commentCtrl.commentPost );
module.exports = router;