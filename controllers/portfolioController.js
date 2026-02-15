const Portfolio = require('../models/portfolio');
const fs = require('fs');
const path = require('path');

exports.uploadPortfolio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'PDF required' });
    }

    // check existing portfolio
    const existing = await Portfolio.findOne();

    // delete old file if exists
    if (existing) {
      const oldPath = path.join('uploads/pdf', existing.pdf);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      existing.title = req.file.originalname;
      existing.pdf = req.file.filename;
      await existing.save();

      return res.json({
        message: 'Portfolio replaced successfully',
        data: existing,
      });
    }

    // create new
    const portfolio = await Portfolio.create({
      title: req.body.title,
      pdf: req.file.filename,
    });

    res.status(201).json({
      message: 'Portfolio uploaded',
      data: portfolio,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const data = await Portfolio.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
