const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

// Public get all
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// Private create, update, delete
router.post('/', protect, upload.array('images', 10), projectController.createProject);
router.put('/:id', protect, upload.array('images', 10), projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);
router.post('/upload', protect, upload.array('images', 10), (req, res) => {
  const files = req.files.map(f => `/uploads/${f.filename}`);
  res.json({ images: files });
});


module.exports = router;
