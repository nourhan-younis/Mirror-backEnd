const express = require('express');
const router = express.Router();
const { getAboutUs, createOrUpdateAboutUs } = require('../controllers/aboutUsController');
const multer = require('multer');
const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = 'uploads/about';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split('.').pop();
    cb(null, uniqueSuffix + '.' + ext);
  }
});
const upload = multer({ storage });

router.get('/', getAboutUs);
router.post('/', upload.single('image'), createOrUpdateAboutUs);

module.exports = router;