const mongoose = require('mongoose');

const whoWeServeItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const whoWeServeSchema = new mongoose.Schema(
  {
    header: { type: String, required: true },
    description: { type: String, required: true },
    items: [whoWeServeItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('WhoWeServe', whoWeServeSchema);