const mongoose = require('mongoose');

const peapoleCommentsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    message: { type: String },
    position: { type: String },
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('PeapoleComments', peapoleCommentsSchema);
