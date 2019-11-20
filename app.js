const express = require ('express');
const app = express();

const bodyParser = require ('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const admin = require ('./routes/admin');

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

module.exports = app;