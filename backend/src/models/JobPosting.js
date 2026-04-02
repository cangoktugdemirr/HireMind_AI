const mongoose = require('mongoose');

const matchedCandidateSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cvId: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true },
  matchScore: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, { _id: false });

const jobPostingSchema = new mongoose.Schema({
  hrUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  requiredSkills: { type: String, required: true },
  matchedCandidates: [matchedCandidateSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobPosting', jobPostingSchema);
