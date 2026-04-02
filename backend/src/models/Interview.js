const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobPostingId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
  questions: [String],
  answers: [String],
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  startedAt: { type: Date, default: null },
  completedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interview', interviewSchema);
