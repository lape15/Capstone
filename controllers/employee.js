const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {pool} = require ('../config/config');
const { validateEmployeeLogin } = require('./../middleware/validation');

exports.getEmployees = async (req, res, next) => {
    await pool.query('SELECT * FROM employees', (error, results) => {
        try{
            res.status(200).json(results.rows);
        } catch (error){
            res.status(404).json({
                error,
            })
        }

    })
};

exports.loginEmployee = async (req, res) => {
    // validate input
    const { error } = validateEmployeeLogin(req.body);
    if (error) {
      const errMessage = error.details[0].message.replace('"', '');
      return res.status(404).json({
        message: errMessage,
      });
    }
    // execute query
    const { username, password } = req.body;
    await pool.query('SELECT * FROM employees WHERE username = $1', [username], async (error, results) => {
      try {
        // return if username is wrong
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
        const token = jwt.sign({ _id: user.id, role: 'employee' }, process.env.TOKEN_SECRET);
        const userData = { name: user.fullname, email: user.email, username: user.username, phone: user.phone, gender: user.gender, date: user.date };
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