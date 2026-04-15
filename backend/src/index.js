require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

// CORS ayarı: Geliştirme aşamasında localhost:5173, üretimde ise her yere (veya VERCEL URL'sine) izin ver
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://hiremind.com.tr',
  'https://www.hiremind.com.tr',
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true 
}));


app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/cv', require('./routes/cv'));
app.use('/api/jobpostings', require('./routes/jobposting'));
app.use('/api/interviews', require('./routes/interview'));
app.use('/api/reports', require('./routes/report'));

// Vercel için app'i listen yapmadan export ediyoruz
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Sunucu çalışıyor: http://localhost:${PORT}`));
}

module.exports = app;
