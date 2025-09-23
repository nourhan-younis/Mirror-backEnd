const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

// Public
router.get('/', teamController.getAllTeam);
router.get('/:id', teamController.getTeamById);

// Private
router.post('/', protect, upload.single('img'), teamController.createTeam);
router.put('/:id', protect, upload.single('img'), teamController.updateTeam);
router.delete('/:id', protect, teamController.deleteTeam);
router.post('/upload', protect, upload.array('images', 10), (req, res) => {
  const files = req.files.map(f => `/uploads/${f.filename}`);
  res.json({ images: files });
});

module.exports = router;
