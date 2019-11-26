/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/config')
const { validateCreateAdmin, validateLogin, validateCreateUser } = require('./../middleware/validation');
const { checkPhone, checkEmail, loginEmail } = require('../middleware/check');





// get all admins
exports.createUser = async (req, res, next) => {
  // validate input
  const { error } = validateCreateUser(req.body);
  if (error) {
    const errMessage = error.details[0].message.replace('"', '');
    return res.status(400).json({
      message: errMessage,
    });
  }

  // if username is taken
  const phoneFeedback = await checkPhone(req.body.phone);
  if (phoneFeedback) {
    return res.status(400).json({
      status: 'error', message: phoneFeedback,
    });
  }

  // if email already exist
  const emailFeedback = await checkEmail(req.body.email);
  if (emailFeedback) {
    return res.status(400).json({
      status: 'error', message: emailFeedback,
    });
  }

  // execute query
  const {
    fullname, email, phone, address, gender, department, jobrole,
  } = req.body;
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password', salt);
  // run query
  await pool.query('INSERT INTO users (fullname, email, password, phone, jobrole, address, gender, department) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [fullname, email, hashedPassword, phone, jobrole, address, gender, department], (error, results) => {
    try {
      res.status(201).json({ status: 'success', message: 'User account successfully created' });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  });
};

// get all employees
exports.employees = async (req, res, next) => {
  // execute query
  await pool.query('SELECT id,fullname,email,city,jobrole,phone,address,gender,department,date FROM users WHERE jobrole != $1', ['admin'], (error, results) => {
    try {
      res.status(200).json({
        status: 'success', data: results.rows,
      });
    } catch (error) {
      res.status(400).json({
        error, status: 'error',
      });
    }
  });
};
