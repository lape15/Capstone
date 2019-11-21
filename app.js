const express = require ('express');
const app = express();

const bodyParser = require ('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// cloudinary import
// eslint-disable-next-line no-unused-vars
const { resolve } = require('path');
// eslint-disable-next-line no-unused-vars
const { uploader, cloudinaryConfig } = require('./config/cloudinary');
// eslint-disable-next-line no-unused-vars
const { multerUploads } = require('./middleware/multer');
app.use('*', cloudinaryConfig);

const admin = require ('./routes/admin');
const employee = require('./routes/employee');
const gif = require('./routes/gif');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Allow-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

// Using body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(`/api/${process.env.VERSION}/admin`, admin);
app.use(`/api/${process.env.VERSION}/employee`, employee);
app.use(`/api/${process.env.VERSION}/employee`, gif);

module.exports = app;