const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');

const authEmployee = require('../middleware/authEmployee');

const gifCtrl = require('../controllers/gif')

// creating routes

router.get('/articles/user', authEmployee, gifCtrl.getPosts);
router.get('/articles/all', authEmployee, gifCtrl.getAllPosts);
router.get('/article/:id', authEmployee, gifCtrl.getPost);
router.put('/post', authEmployee, gifCtrl.updatePost);
router.delete('/post', authEmployee, gifCtrl.deletePost);
router.post('/upload', [authEmployee, multer.multerUploads], gifCtrl.uploadGif);
router.post('/post', authEmployee, gifCtrl.createPost)

module.exports = router; 








