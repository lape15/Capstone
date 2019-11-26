/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const { pool } = require('../config/config');

// check username
const checkPhone = async (phone) => {
  let response;
  try {
    response = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    const data = response.rows;
    if (data.length === 0) {
      return false;
    }
    return 'Sorry buddy, Phone Number is already taken';
  } catch (error) {
    // handle error
    // do not throw anything
  }
};

// check email
const checkEmail = async (email) => {
  let response;
  try {
    response = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const data = response.rows;
    if (data.length === 0) {
      return false;
    }
    return 'Email already exists';
  } catch (error) {
    // handle error
    // do not throw anything
  }
};

const loginEmail = async (email) => {
  let response;
  try {
    response = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const data = response.rows;
    if (data.length === 0) {
      return false;
    }
    return data;
  } catch (error) {
    // handle error
    // do not throw anything
  }
};

module.exports.checkPhone = checkPhone;
module.exports.checkEmail = checkEmail;
module.exports.loginEmail = loginEmail;
