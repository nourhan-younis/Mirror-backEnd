const AboutUs = require('../models/AboutUs');
const fs = require('fs');
const path = require('path');

// GET AboutUs
exports.getAboutUs = async (req, res) => {
  try {
    const data = await AboutUs.findOne();
    if (!data) return res.status(404).json({ message: 'About Us not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE OR UPDATE AboutUs
exports.createOrUpdateAboutUs = async (req, res) => {
  try {
    // Parse stats if sent as string
    if (req.body.stats && typeof req.body.stats === 'string') {
      req.body.stats = JSON.parse(req.body.stats);
    }

    // Handle uploaded image
    if (req.file) {
      req.body.imageUrl = `/uploads/about/${req.file.filename}`;
    }

    let about = await AboutUs.findOne();

    if (about) {
      // Update
      Object.keys(req.body).forEach(key => {
        about[key] = req.body[key];
      });
      await about.save();
    } else {
      // Create
      about = new AboutUs(req.body);
      await about.save();
    }

    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};