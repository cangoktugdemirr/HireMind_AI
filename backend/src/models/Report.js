const mongoose = require('mongoose');

const questionScoreSchema = new mongoose.Schema({
  question: String,
  score: Number,
  feedback: String
}, { _id: false });

const reportSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobPostingId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true, unique: true },
  overallScore: { type: Number, required: true },
  cvMatchScore: { type: Number, required: true },
  questionScores: [questionScoreSchema],
  strengths: [String],
  weaknesses: [String],
  aiEvaluation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
