const express = require ('express');
const router = express.Router();


const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');

// router
router.get('/employees', auth, adminCtrl.employees);
router.post('/auth/createuser', auth, adminCtrl.createUser);

module.exports = router;




