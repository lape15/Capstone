const express = require ('express');
const router = express.Router();
const authEmployee = require ('../middleware/authEmployee');


const employeeCtrl = require('../controllers/employee');

router.get('/employees', authEmployee, employeeCtrl.getEmployees);
router.post('/login', employeeCtrl.loginEmployee);

module.exports = router;