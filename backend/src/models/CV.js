const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  educationLevel: {
    type: String,
    enum: ['Lise', 'Ön Lisans', 'Lisans', 'Yüksek Lisans', 'Doktora'],
    required: true
  },
  schoolDepartment: { type: String, required: true },
  experienceLevel: {
    type: String,
    enum: ['Deneyimsiz', '0-1 yıl', '1-3 yıl', '3-5 yıl', '5-10 yıl', '10+ yıl'],
    required: true
  },
  lastPosition: { type: String, default: '' },
  skills: { type: String, required: true },
  about: { type: String, maxlength: 500, default: '' },
  isMatched: { type: Boolean, default: false },
  matchedJobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', default: null }
}, { timestamps: true });

module.exports = mongoose.model('CV', cvSchema);
