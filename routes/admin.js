const express = require ('express');
const router = express.Router();


const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');

// router
router.get('/', auth, adminCtrl.getAdmins);
router.post('/', auth, adminCtrl.createAdmin);
router.post('/employee', auth, adminCtrl.createEmployee);
router.post('/login', adminCtrl.loginAdmin);

module.exports = router;




