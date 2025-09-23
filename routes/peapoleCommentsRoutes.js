const express = require('express');
const router = express.Router();
const PeapoleCommentsController = require('../controllers/peapoleCommentsController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

// Public
router.get('/', PeapoleCommentsController.getAllComments);
router.get('/:id', PeapoleCommentsController.getCommentsById);

// Private
router.post('/', protect, upload.single('img'), PeapoleCommentsController.createComment);
router.put('/:id', protect, upload.single('img'), PeapoleCommentsController.updateComment);
router.delete('/:id', protect, PeapoleCommentsController.deleteComment);
router.post('/upload', protect, upload.array('images', 10), (req, res) => {
  const files = req.files.map(f => `/uploads/${f.filename}`);
  res.json({ images: files });
});

module.exports = router;
