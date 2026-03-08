require('dotenv').config();
const express   = require('express');
const cloudinary = require('cloudinary').v2;
const cors      = require('cors');
const path      = require('path');

const app = express();

// ── CORS ────────────────────────────────────────────────────
// Allow all origins during development; lock down in production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'username', 'password']
}));

app.use(express.json());

// ── Static frontend files ───────────────────────────────────
// Place eBudget.html and admin.html in the /public folder
app.use(express.static(path.join(__dirname, 'public')));

// ── Cloudinary ──────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log('🔁 Cloudinary configured');

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth',    require('./routes/auth.json'));
app.use('/api/admin',   require('./routes/admin.json'));
app.use('/api/entries', require('./routes/entries.json'));

// ── Health check ────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Catch-all: serve eBudget.html for unknown routes ────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'eBudget.html'));
});

// ── Start ───────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 eBudget API running on port ${PORT}`));
