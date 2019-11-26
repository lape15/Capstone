const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {pool} = require ('../config/config');
const { validateLogin } = require('./../middleware/validation');
const {loginEmail} = require('../middleware/check');




exports.loginUser = async (req, res) => {
  // validate input
  const { error } = validateLogin(req.body);
  if (error) {
    const errMessage = error.details[0].message.replace('"', '');
    return res.status(404).json({
      message: errMessage,
    });
  }

  // if username exists
  const userResult = await loginEmail(req.body.email);
  if (!userResult) {
    return res.status(400).json({
      status: 'error', message: 'Invalid Login Credentials',
    });
  }
  const user = userResult[0];
  // execute query
  // check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      status: 'error', message: 'Invalid Login Credentials',
    });
  }
  // Json Web Token
  const token = jwt.sign({ _id: user.id, role: user.jobrole }, process.env.TOKEN_SECRET);
  const userData = {
    // eslint-disable-next-line max-len
    name: user.fullname, email: user.email, username: user.username, phone: user.phone, date: user.date, gender: user.gender, role: user.jobrole,
  };
  res.status(200).json({
    status: 'success', message: 'Logged in sucessfully.', token, user: userData,
  });
};

// get all employees
exports.getUsers = async (req, res, next) => {
  // fetch user
  const userid = req.user._id;
  // execute query
  await pool.query('SELECT id,fullname,email,city,address,phone,department,gender,date FROM users WHERE jobrole != $1', ['admin'], (error, results) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const data = results.rows.filter((row) => row.id !== userid);
      res.status(200).json({
        status: 'success', data,
      });
    } catch (error) {
      res.status(404).json({
        error, status: 'error',
      });
    }
  });
};
