const express = require('express');
const router = express.Router();

const authEmployee = require('../middleware/authEmployee');

// Controllers
const likeCtrl = require('../controllers/gif');

// routes
router.post('/', authEmployee, likeCtrl.likePost);

module.exports = router;
