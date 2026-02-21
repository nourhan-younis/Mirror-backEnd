const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  number: String,
  title: String,
  description: String
});

const howWeWorkSchema = new mongoose.Schema({
  heading: String,
  description: String,
  steps: [stepSchema]
}, { timestamps: true });

module.exports = mongoose.model('HowWeWork', howWeWorkSchema);