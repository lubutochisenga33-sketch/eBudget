require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
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

// ── Database ────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => { console.error('❌ MongoDB connection error:', err); process.exit(1); });

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/admin',   require('./routes/admin'));
app.use('/api/entries', require('./routes/entries'));

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
