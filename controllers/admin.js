/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/config')
const { validateCreateAdmin, validateLogin, validateCreateEmployee } = require('./../middleware/validation');

// get all admins
exports.getAdmins = async (req, res, next) => {
  // execute query
  await pool.query('SELECT id,fullname,email,role,username,date FROM admin', (error, results) => {
    try {
      res.status(200).json({
        status: 'success', data: results.rows,
      });
    } catch (error) {
      res.status(404).json({
        error, status: 'error',
      });
    }
  });
};

// create admin
exports.createAdmin = async (req, res, next) => {
  // validate input
  const { error } = validateCreateAdmin(req.body);
  if (error) {
    const errMessage = error.details[0].message.replace('"', '');
    return res.status(404).json({
      message: errMessage,
    });
  }
  // execute query
  const { email } = req.body;
  await pool.query('SELECT * FROM admin WHERE email = $1', [email], async (error, user) => {
    try {
      // check if email exist
      if (user.rows.length === 1) {
        return res.status(400).json({
          status: 'error', message: 'Email already exists',
        });
      }
      const { fullname, email, username } = req.body;
      const role = 'admin';
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password', salt);
      // run query
      await pool.query('INSERT INTO admin (fullname, email, username, role, password) VALUES ($1, $2, $3, $4, $5)', [fullname, email, username, role, hashedPassword], (error, results) => {
        try {
          res.status(201).json({ status: 'success', message: 'Admin added sucessfully.' });
        } catch (error) {
          res.status(404).json({
            error,
          });
        }
      });
    } catch (error) {
      res.status(404).json({
        error, status: 'error',
      });
    }
  });
};

// login admin
exports.loginAdmin = async (req, res) => {
  // validate input
  const { error } = validateLogin(req.body);
  if (error) {
    const errMessage = error.details[0].message.replace('"', '');
    return res.status(404).json({
      message: errMessage,
    });
  }
  // execute query
  const { email, password } = req.body;
  await pool.query('SELECT * FROM admin WHERE email = $1', [email], async (error, results) => {
    try {
      // return if email is wrong
      if (results.rows === undefined || results.rows.length === 0) {
        return res.status(404).json({
          status: 'error', message: 'Invalid Login Credentials',
        });
      }
      const user = results.rows[0];
      // check password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          status: 'error', message: 'Invalid Login Credentials',
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
        error, status: 'error',
      });
    }
  });
};

// create employee
exports.createEmployee = async (req, res, next) => {
  // validate input
  const { error } = validateCreateEmployee(req.body);
  if (error) {
    const errMessage = error.details[0].message.replace('"', '');
    return res.status(404).json({
      message: errMessage,
    });
  }
  // execute query
  const { email } = req.body;
  await pool.query('SELECT * FROM employees WHERE email = $1', [email], async (error, user) => {
    try {
      // check if email exist
      if (user.rows.length === 1) {
        return res.status(400).json({
          status: 'error', message: 'Email already exists',
        });
      }
      const {
        fullname, email, username, phone,
      } = req.body;
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password', salt);
      // run query
      await pool.query('INSERT INTO employees (fullname, email, username, password, phone) VALUES ($1, $2, $3, $4, $5)', [fullname, email, username, hashedPassword, phone], (error, results) => {
        try {
          res.status(201).json({ status: 'success', message: 'Employee added sucessfully.' });
        } catch (error) {
          res.status(404).json({
            error,
          });
        }
      });
    } catch (error) {
      res.status(404).json({
        error, status: 'error',
      });
    }
  });
};

// get all employees
exports.employees = async (req, res, next) => {
  // execute query
  await pool.query('SELECT id,fullname,email,city,username,phone,marital_status,gender,date FROM employees', (error, results) => {
    try {
      res.status(200).json({
        status: 'success', data: results.rows,
      });
    } catch (error) {
      res.status(404).json({
        error, status: 'error',
      });
    }
  });
};
