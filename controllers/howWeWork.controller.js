const HowWeWork = require('../models/HowWeWork');

// GET
exports.getHowWeWork = async (req, res) => {
  try {
    const data = await HowWeWork.findOne();
    if (!data) return res.json({ data });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE OR UPDATE
exports.createOrUpdateHowWeWork = async (req, res) => {
  try {
    let doc = await HowWeWork.findOne();

    if (doc) {
      // ✅ Update existing document properly
      Object.assign(doc, req.body);
      await doc.save();
    } else {
      // ✅ Create new document
      doc = new HowWeWork(req.body);
      await doc.save();
    }

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};