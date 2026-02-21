const express = require('express');
const router = express.Router();
const controller = require('../controllers/howWeWork.controller');

// GET how we work
router.get('/', controller.getHowWeWork);

// CREATE / UPDATE (admin)
router.post('/', controller.createOrUpdateHowWeWork);
// or use PUT if you prefer
// router.put('/', controller.createOrUpdateHowWeWork);

module.exports = router;