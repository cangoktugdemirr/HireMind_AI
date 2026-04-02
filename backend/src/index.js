require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/cv', require('./routes/cv'));
app.use('/api/jobpostings', require('./routes/jobposting'));
app.use('/api/interviews', require('./routes/interview'));
app.use('/api/reports', require('./routes/report'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu çalışıyor: http://localhost:${PORT}`));
