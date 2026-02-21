const express = require('express');
const router = express.Router();
const controller = require('../controllers/whoWeServeController');

// GET how we work
router.get('/', controller.getWhoWeServe);

// CREATE / UPDATE (admin)
router.post('/', controller.createOrUpdateWhoWeServe);

module.exports = router;