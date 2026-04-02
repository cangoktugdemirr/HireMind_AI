const express = require('express');
const { auth, requireRole } = require('../middleware/auth');
const Interview = require('../models/Interview');
const JobPosting = require('../models/JobPosting');
const CV = require('../models/CV');
const Report = require('../models/Report');
const { analyzeInterviewAnswers } = require('../services/ai.service');

const router = express.Router();

// Arka planda rapor oluşturan fonksiyon
const generateReport = async (interview) => {
  try {
    const [jobPosting, cv] = await Promise.all([
      JobPosting.findById(interview.jobPostingId),
      CV.findOne({ userId: interview.candidateId })
    ]);

    if (!jobPosting || !cv) {
      console.error('Rapor için ilan veya CV bulunamadı');
      return;
    }

    const reportData = await analyzeInterviewAnswers(
      jobPosting,
      cv,
      interview.questions,
      interview.answers
    );

    await Report.create({
      candidateId: interview.candidateId,
      jobPostingId: interview.jobPostingId,
      interviewId: interview._id,
      overallScore: reportData.overallScore,
      cvMatchScore: reportData.cvMatchScore,
      questionScores: reportData.questionScores,
      strengths: reportData.strengths,
      weaknesses: reportData.weaknesses,
      aiEvaluation: reportData.aiEvaluation
    });

    // JobPosting'deki adayın durumunu 'completed' yap
    await JobPosting.updateOne(
      { _id: interview.jobPostingId, 'matchedCandidates.candidateId': interview.candidateId },
      { $set: { 'matchedCandidates.$.status': 'completed' } }
    );

    console.log(`Rapor oluşturuldu: interview ${interview._id}`);
  } catch (err) {
    console.error('generateReport hatası:', err);
  }
};

// GET /api/interviews/my — Adayın mülakatını getir
router.get('/my', auth, requireRole('candidate'), async (req, res) => {
  try {
    const interview = await Interview.findOne({ candidateId: req.user.id })
      .populate('jobPostingId', 'title');
    res.json({ interview: interview || null });
  } catch (err) {
    console.error('Mülakat getirme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// POST /api/interviews/:id/start — Mülakatı başlat
router.post('/:id/start', auth, requireRole('candidate'), async (req, res) => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, candidateId: req.user.id });
    if (!interview) return res.status(404).json({ message: 'Mülakat bulunamadı' });
    if (interview.status === 'completed') {
      return res.status(400).json({ message: 'Mülakat zaten tamamlandı' });
    }

    interview.status = 'in_progress';
    interview.startedAt = new Date();
    await interview.save();

    res.json({ interview });
  } catch (err) {
    console.error('Mülakat başlatma hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// POST /api/interviews/:id/submit — Mülakatı gönder
router.post('/:id/submit', auth, requireRole('candidate'), async (req, res) => {
  try {
    const { answers } = req.body;
    const interview = await Interview.findOne({ _id: req.params.id, candidateId: req.user.id });

    if (!interview) return res.status(404).json({ message: 'Mülakat bulunamadı' });
    if (interview.status === 'completed') {
      return res.status(400).json({ message: 'Mülakat zaten tamamlandı' });
    }
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Yanıtlar gerekli' });
    }

    interview.answers = answers;
    interview.status = 'completed';
    interview.completedAt = new Date();
    await interview.save();

    // Raporu async başlat
    generateReport(interview);

    res.json({ message: 'Mülakat tamamlandı, rapor hazırlanıyor' });
  } catch (err) {
    console.error('Mülakat gönderme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// DELETE /api/interviews/:id/abandon — Mülakatı terk et
router.delete('/:id/abandon', auth, requireRole('candidate'), async (req, res) => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, candidateId: req.user.id });
    if (!interview) return res.status(404).json({ message: 'Mülakat bulunamadı' });
    if (interview.status === 'completed') {
      return res.status(400).json({ message: 'Tamamlanan mülakat terk edilemez' });
    }

    interview.status = 'pending';
    interview.answers = [];
    interview.startedAt = null;
    await interview.save();

    res.json({ message: 'Mülakat sıfırlandı' });
  } catch (err) {
    console.error('Mülakat terk hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
