const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Protect all except login
router.post('/', protect, adminController.createAdmin);
router.get('/', protect, adminController.getAllAdmins);
router.put('/:id', protect, adminController.updateAdmin);
router.delete('/:id', protect, adminController.deleteAdmin);

// Login = public
router.post('/login', adminController.loginAdmin);

module.exports = router;
