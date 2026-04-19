const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur' });
    }
    if (!['candidate', 'hr'].includes(role)) {
      return res.status(400).json({ message: 'Geçersiz rol' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Bu e-posta zaten kayıtlı' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Register hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
  }
});

  // POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // email is now treated as identifier

    if (!email || !password) {
      return res.status(400).json({ message: 'Kullanıcı adı/E-posta ve şifre zorunludur' });
    }

    // Try finding by email or name
    const user = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { name: email }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı veya şifre hatalı' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı veya şifre hatalı' });
    }

    const token = signToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Login hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
  }
});

module.exports = router;
