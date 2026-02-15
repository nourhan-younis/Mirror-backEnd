const express = require('express');
const router = express.Router();
const upload = require('../middleware/pdfUpload');
const controller = require('../controllers/portfolioController');

router.post('/', upload.single('pdf'), controller.uploadPortfolio);
router.get('/', controller.getPortfolio);

module.exports = router;
