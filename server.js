// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// ✅ Serve files from the public folder correctly
app.use(express.static(path.join(__dirname, 'public')));

// Serve the status page
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🌐 Keep-alive server listening on port ${PORT}`);
});

// 🔁 Optional: Keep-alive ping (only needed for Render dyno prevention)
setInterval(() => {
  fetch('https://clash-commander-bot.onrender.com').catch(() => {});
}, 14 * 60 * 1000);
