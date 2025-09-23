const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    linkedIn: { type: String },
    whatsapp: { type: String },
    email: { type: String },
   images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
