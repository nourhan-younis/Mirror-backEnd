const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos'); // Save videos here
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov|avi|mkv/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    return cb(null, true);
  } else {
    cb('Error: Only video files are allowed!');
  }
};

const upload = multer({ storage, fileFilter });

router.post('/upload', upload.single('video'), videoController.uploadVideo);
router.get('/', upload.single('video'), videoController.getVideos);
router.delete('/:filename', videoController.deleteVideo);

module.exports = router;
