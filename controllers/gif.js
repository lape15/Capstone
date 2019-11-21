/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const { multerUploads, dataUri } = require('../middleware/multer');
const { v2, cloudinaryConfig } = require('../config/cloudinary');

// const { validatePost } = require('./../middleware/validation');

// create post
exports.createPost = async (req, res, next) => {
  await pool.query('INSERT INTO posts (fullname, email, username, password, phone) VALUES ($1, $2, $3, $4, $5)', [fullname, email, username, hashedPassword, phone], (error, results) => {
    try {
      res.status(201).json({ status: 'success', message: 'Employee added sucessfully.' });
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  });
};

exports.uploadGif = (req, res, next) => {
  if (req.file) {
    const file = dataUri(req).content;
    return v2.uploader
      .upload(file, {
        resource_type: 'auto',
      })
      .then((result) => {
        const fileUploadedUrl = result.url;
        res.status(201).json({ status: 'success', message: 'GIF uploaded sucessfully.', url: fileUploadedUrl });
      })
      .catch((err) => {
        res.status(400).json({
          message: 'Something went wrong while processing your request',
          success: false,
          data: {
            err,
          },
        });
      });
  }
};