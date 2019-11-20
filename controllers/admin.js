/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('./../config/config');
const { validateCreateAdmin, validateLogin } = require('./../middleware/validation');

// get admins
exports.getAdmins = async (req, res, next) => {
  await pool.query('SELECT id,fullname,email,role,username,date FROM admin', (error, results) => {
    try {
      res.status(200).json(results.rows);
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  });
};

const checkemail = (email) => pool.query('SELECT * FROM admin WHERE email = $1', [email], async (error, results) => {
  try {
    if (results.rows === undefined || results.rows.length === 0) {
      const valid = true;
      console.log(valid);
    }
    const valid = false;
    // eslint-disable-next-line no-empty
  } catch (error) { }
});

// create admin
exports.createAdmin = async (req, res) => {
  const { error } = validateCreateAdmin(req.body);
  if (error) {
    const errMessage = error.details[0].message.replace('"', '');
    return res.status(404).json({
      message: errMessage,
    });
  }
  const check = await checkemail(req.body.email);
  if (!check) {
    return res.status(404).json({
      message: 'Email Already Exist',
    });
  }
  const { fullname, email, username } = req.body;
  const role = 'admin';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password', salt);
  await pool.query('INSERT INTO admin (fullname, email, username, role, password) VALUES ($1, $2, $3, $4, $5)', [fullname, email, username, role, hashedPassword], (error, results) => {
    try {
      res.status(201).json({ status: 'success', message: 'Admin added sucessfully.' });
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  });
};

exports.loginAdmin = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    const errMessage = error.details[0].message.replace('"', '');
    return res.status(404).json({
      message: errMessage,
    });
  }
  const { email, password } = req.body;
  await pool.query('SELECT * FROM admin WHERE email = $1', [email], async (error, results) => {
    try {
      if (results.rows === undefined || results.rows.length === 0) {
        return res.status(404).json({
          message: 'Invalid Login Credentials',
        });
      }
      const user = results.rows[0];
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          message: 'Invalid Login Credentials',
        });
      }
      // Json Web Token
      const token = jwt.sign({ _id: user.id, role: 'admin' }, process.env.TOKEN_SECRET);
      const userData = { name: user.fullname, email: user.email, username: user.username };
      res.status(201).json({
        status: 'success', message: 'Logged in sucessfully.', token, user: userData,
      });
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  });
};
