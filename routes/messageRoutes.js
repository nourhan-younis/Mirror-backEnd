const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', messageController.createMessage); // public

router.get('/', protect, messageController.getAllMessages);


module.exports = router;
