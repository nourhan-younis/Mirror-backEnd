const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
  heading: String,
  subHeading: String,
  shortText: String,
  fullText: String,
  videoUrl: String,
  stats: [
    {
      title: String,
      value: String
    }
  ],
  imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', aboutUsSchema);