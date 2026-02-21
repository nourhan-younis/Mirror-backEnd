const WhoWeServe = require('../models/WhoWeServe');

// GET
exports.getWhoWeServe = async (req, res) => {
  try {
    const data = await WhoWeServe.findOne();
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE OR UPDATE
exports.createOrUpdateWhoWeServe = async (req, res) => {
  try {
    let doc = await WhoWeServe.findOne();

    if (doc) {
      Object.assign(doc, req.body);
      await doc.save();
    } else {
      doc = new WhoWeServe(req.body);
      await doc.save();
    }

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};