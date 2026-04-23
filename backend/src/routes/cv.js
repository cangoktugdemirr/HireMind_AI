const express = require('express');
const { auth, requireRole } = require('../middleware/auth');
const CV = require('../models/CV');
const JobPosting = require('../models/JobPosting');
const Interview = require('../models/Interview');
const { matchCandidateToJob, generateInterviewQuestions } = require('../services/ai.service');

const router = express.Router();

const matchJobForCandidate = async (cv) => {
  if (cv.isMatched) return; // Zaten eşleşmişse atla
  
  try {
    const activeJobs = await JobPosting.find().sort({ createdAt: -1 }); // En yenilerden başla
    console.log(`Eşleştirme başlatılıyor: ${activeJobs.length} ilan taranıyor...`);

    for (const job of activeJobs) {
      if (cv.isMatched) break;
      try {
        const { score } = await matchCandidateToJob(cv, job);
        console.log(`İlan ${job._id} - Puan: ${score}`);

        if (score >= 50) {
          cv.isMatched = true;
          cv.matchedJobId = job._id;
          await cv.save();

          const { questions } = await generateInterviewQuestions(job, cv);

          const interview = await Interview.create({
            candidateId: cv.userId,
            jobPostingId: job._id,
            questions,
            answers: []
          });

          job.matchedCandidates.push({
            candidateId: cv.userId,
            cvId: cv._id,
            matchScore: score,
            status: 'pending'
          });
          await job.save();

          console.log(`İlan eşleşti: ${job._id}, mülakat oluşturuldu: ${interview._id}`);
          break; // İlk uygun ilanda eşleşmeyi bırak
        }
      } catch (err) {
        console.error(`İlan ${job._id} eşleştirme hatası:`, err.message);
      }
    }
  } catch (err) {
    console.error('matchJobForCandidate genel hatası:', err);
  }
};

// POST /api/cv — CV oluştur veya güncelle (upsert)
router.post('/', auth, requireRole('candidate'), async (req, res) => {
  try {
    const { fullName, email, phone, educationLevel, schoolDepartment, experienceLevel, lastPosition, skills, about } = req.body;

    if (!fullName || !email || !phone || !educationLevel || !schoolDepartment || !experienceLevel || !skills) {
      return res.status(400).json({ message: 'Zorunlu alanlar eksik' });
    }

    const cv = await CV.findOneAndUpdate(
      { userId: req.user.id },
      { userId: req.user.id, fullName, email, phone, educationLevel, schoolDepartment, experienceLevel, lastPosition, skills, about },
      { upsert: true, new: true, runValidators: true }
    );

    // Eşleştirmeyi async başlat, HTTP yanıtını bekleme
    matchJobForCandidate(cv);

    res.json({ message: 'CV kaydedildi', cv });
  } catch (err) {
    console.error('CV kayıt hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// GET /api/cv/me — Adayın CV'sini getir
router.get('/me', auth, requireRole('candidate'), async (req, res) => {
  try {
    const cv = await CV.findOne({ userId: req.user.id });
    res.json({ cv: cv || null });
  } catch (err) {
    console.error('CV getirme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// GET /api/cv/:id — HR adayın CV'sini getirir
router.get('/:id', auth, requireRole('hr'), async (req, res) => {
  try {
    const cv = await CV.findOne({ userId: req.params.id });
    if (!cv) {
      return res.status(404).json({ message: 'CV bulunamadı' });
    }
    res.json({ cv });
  } catch (err) {
    console.error('CV getirme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
