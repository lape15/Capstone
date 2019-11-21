const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const extname = file.originalname
    .toLowerCase()
    .match(/.(gif)$/);
  const mimetype = file.mimetype.match(
    /.(gif)$/,
  );
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format'), false);
  }
};

// Multer doesn't allow error handling for file size limits
// const fileSize = (req, file, cb) => {
//   let maxsize = 1 * 1024 * 1024;
//   if (file.size === maxsize) {
//     cb(null, true);
//   } else {
//     cb(new Error("File is large"), false);
//   }
// };

const multerUploads = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter,
}).single('file');

const dUri = new Datauri();

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
const dataUri = (req) => dUri.format(
  path.extname(req.file.originalname).toString(),
  req.file.buffer,
);

module.exports = { multerUploads, dataUri };