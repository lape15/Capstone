const express = require ('express');
const {Client} = require('pg');
const app = express();

//db connect string
const db = "postgres://admin:Goodgirl2#@localhost/teamwork_db";
const client = new Client ({
    connectionString: db
});
client.connect();

const bodyParser = require ('body-parser');

app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Allow-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
})
 
// Using body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))




module.exports = app;