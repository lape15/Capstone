const express = require ('express');
const router = express.Router();
const authEmployee = require ('../middleware/authEmployee');


const employeeCtrl = require('../controllers/employee');

router.get('/employees', authEmployee, employeeCtrl.getUsers);
router.post('/auth/login', employeeCtrl.loginUser);




module.exports = router;