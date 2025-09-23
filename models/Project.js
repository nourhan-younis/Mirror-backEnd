const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  images: [String],
  name: { type: String, required: true },
  location: String,
  customerName: String,
  projectCost: Number,
  projectTime: String,
  scopeOfWork: String,
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
