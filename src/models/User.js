//src\models\'User.js'

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  playerTag: { type: String, required: true },
  townHall: { type: Number }
});

module.exports = mongoose.model('User', userSchema);
