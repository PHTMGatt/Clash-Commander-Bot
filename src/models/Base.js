//src\models\'Base.js'

const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema({
  uploaderId: { type: String, required: true },
  link: { type: String, required: true },
  townHall: { type: Number, required: true },
  type: { type: String, required: true }, // war, cwl, legend
  style: { type: String, default: 'unknown' },
  messageId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Base', baseSchema);
