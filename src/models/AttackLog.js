//src\models\'AttackLog.js'

const mongoose = require('mongoose');

const attackLogSchema = new mongoose.Schema({
  playerTag: { type: String, required: true },
  type: { type: String, enum: ['war', 'legend'], required: true },
  date: { type: Date, default: Date.now },
  result: String,
  stars: Number,
  destruction: Number
});

module.exports = mongoose.model('AttackLog', attackLogSchema);
