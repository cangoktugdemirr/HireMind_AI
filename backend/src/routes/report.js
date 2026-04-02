const express = require('express');
const { auth } = require('../middleware/auth');
const Report = require('../models/Report');
const Interview = require('../models/Interview');

const router = express.Router();

// GET /api/reports/interview/:interviewId
router.get('/interview/:interviewId', auth, async (req, res) => {
  try {
    const report = await Report.findOne({ interviewId: req.params.interviewId });

    if (!report) {
      return res.json({ report: null });
    }

    // Erişim kontrolü: HR veya ilgili aday
    const isHR = req.user.role === 'hr';
    const isCandidate = report.candidateId.toString() === req.user.id;

    if (!isHR && !isCandidate) {
      return res.status(403).json({ message: 'Bu rapora erişim yetkiniz yok' });
    }

    // Aday bilgisini al
    const interview = await Interview.findById(req.params.interviewId)
      .populate('candidateId', 'name')
      .populate('jobPostingId', 'title');

    res.json({
      report: {
        ...report.toObject(),
        candidateName: interview?.candidateId?.name || 'Bilinmiyor',
        jobTitle: interview?.jobPostingId?.title || 'Bilinmiyor',
        educationLevel: null,
        experienceLevel: null
      }
    });
  } catch (err) {
    console.error('Rapor getirme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
