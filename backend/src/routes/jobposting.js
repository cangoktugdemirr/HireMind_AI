const express = require('express');
const { auth, requireRole } = require('../middleware/auth');
const JobPosting = require('../models/JobPosting');
const CV = require('../models/CV');
const Interview = require('../models/Interview');
const User = require('../models/User');
const { matchCandidateToJob, generateInterviewQuestions } = require('../services/ai.service');

const router = express.Router();

// Arka planda çalışan eşleştirme fonksiyonu
const matchCandidatesForJob = async (jobPosting) => {
  try {
    const availableCVs = await CV.find({ isMatched: false });
    console.log(`Eşleştirme başladı: ${availableCVs.length} aday kontrol ediliyor...`);

    for (const cv of availableCVs) {
      try {
        const { score } = await matchCandidateToJob(cv, jobPosting);
        console.log(`Aday ${cv.userId} - Puan: ${score}`);

        if (score >= 50) {
          cv.isMatched = true;
          cv.matchedJobId = jobPosting._id;
          await cv.save();

          const { questions } = await generateInterviewQuestions(jobPosting, cv);

          const interview = await Interview.create({
            candidateId: cv.userId,
            jobPostingId: jobPosting._id,
            questions,
            answers: []
          });

          jobPosting.matchedCandidates.push({
            candidateId: cv.userId,
            cvId: cv._id,
            matchScore: score,
            status: 'pending'
          });

          console.log(`Aday eşleşti: ${cv.userId}, mülakat oluşturuldu: ${interview._id}`);
        }
      } catch (err) {
        console.error(`Aday ${cv.userId} eşleştirme hatası:`, err.message);
      }
    }

    await jobPosting.save();
    console.log('Eşleştirme tamamlandı.');
  } catch (err) {
    console.error('matchCandidatesForJob genel hatası:', err);
  }
};

// POST /api/jobpostings — İlan oluştur
router.post('/', auth, requireRole('hr'), async (req, res) => {
  try {
    const { title, description, requiredSkills } = req.body;

    if (!title || !description || !requiredSkills) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur' });
    }

    const jobPosting = await JobPosting.create({
      hrUserId: req.user.id,
      title,
      description,
      requiredSkills,
      matchedCandidates: []
    });

    // Eşleştirmeyi async başlat, HTTP yanıtını bekleme
    matchCandidatesForJob(jobPosting);

    res.status(201).json({ jobPostingId: jobPosting._id });
  } catch (err) {
    console.error('İlan oluşturma hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// GET /api/jobpostings — HR'ın ilanlarını listele
router.get('/', auth, requireRole('hr'), async (req, res) => {
  try {
    const postings = await JobPosting.find({ hrUserId: req.user.id }).sort({ createdAt: -1 });

    const result = postings.map((p) => ({
      _id: p._id,
      title: p.title,
      requiredSkills: p.requiredSkills,
      totalCandidates: p.matchedCandidates.length,
      completedCount: p.matchedCandidates.filter((c) => c.status === 'completed').length,
      createdAt: p.createdAt
    }));

    res.json({ jobPostings: result });
  } catch (err) {
    console.error('İlan listeleme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// GET /api/jobpostings/dashboard-stats — HR paneli için gerçek istatistikler ve aktiviteler
router.get('/dashboard-stats', auth, requireRole('hr'), async (req, res) => {
  try {
    const postings = await JobPosting.find({ hrUserId: req.user.id });
    const jobIds = postings.map(p => p._id);
    const totalPostings = postings.length;

    // Tüm mülakatları getir
    const interviews = await Interview.find({ jobPostingId: { $in: jobIds } })
      .populate('candidateId', 'name')
      .populate('jobPostingId', 'title')
      .sort({ createdAt: -1 })
      .lean();

    // İstatistikler için sayıları hesapla
    const completedCount = interviews.filter(i => i.status === 'completed').length;
    const pendingCount = interviews.filter(i => i.status === 'pending' || i.status === 'in_progress').length;
    
    // Toplam Aday: Sisteme kayıtlı ve mülakatı olan benzersiz aday sayısı
    const uniqueCandidates = new Set(interviews.map(i => i.candidateId?._id?.toString())).size;
    const totalAvailableCandidates = await CV.countDocuments(); // Havuzdaki toplam CV sayısı

    // Yaklaşan mülakatlar (bekleyen veya devam eden)
    const upcomingInterviews = interviews
      .filter(i => i.status === 'pending' || i.status === 'in_progress')
      .slice(0, 5)
      .map(i => ({
        _id: i._id,
        candidateName: i.candidateId?.name || 'Bilinmiyor',
        jobTitle: i.jobPostingId?.title || 'Bilinmiyor',
        status: i.status === 'pending' ? 'Bekliyor' : 'Devam Ediyor',
        date: i.createdAt
      }));

    // Son aktiviteler
    const recentActivities = [];
    interviews.slice(0, 10).forEach(i => {
      if (i.status === 'completed') {
        recentActivities.push({
          id: i._id + '-completed',
          type: 'completed',
          title: 'Mülakat Tamamlandı',
          desc: `${i.jobPostingId?.title} pozisyonu için ${i.candidateId?.name} adlı adayın mülakatı tamamlandı.`,
          time: i.completedAt || i.createdAt
        });
      } else {
        recentActivities.push({
          id: i._id + '-matched',
          type: 'matched',
          title: 'Yeni Aday Eşleşti',
          desc: `Yapay zeka ${i.jobPostingId?.title} ilanı için ${i.candidateId?.name} adlı adayı eşleştirdi.`,
          time: i.createdAt
        });
      }
    });

    recentActivities.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json({
      stats: {
        totalPostings,
        totalCandidates: uniqueCandidates,
        totalPoolCandidates: totalAvailableCandidates,
        completedCount,
        pendingCount
      },
      upcomingInterviews,
      recentActivities: recentActivities.slice(0, 5)
    });

  } catch (err) {
    console.error('Dashboard stats hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// GET /api/jobpostings/:id — İlan detayı + aday listesi
router.get('/:id', auth, requireRole('hr'), async (req, res) => {
  try {
    const posting = await JobPosting.findOne({ _id: req.params.id, hrUserId: req.user.id });
    if (!posting) {
      return res.status(404).json({ message: 'İlan bulunamadı' });
    }

    // Her aday için kullanıcı adını ve mülakat bilgisini getir
    const candidatesWithDetails = await Promise.all(
      posting.matchedCandidates.map(async (mc) => {
        const [user, cv, interview] = await Promise.all([
          User.findById(mc.candidateId).select('name'),
          CV.findById(mc.cvId).select('educationLevel experienceLevel skills'),
          Interview.findOne({ candidateId: mc.candidateId, jobPostingId: posting._id }).select('_id status')
        ]);
        return {
          candidateId: mc.candidateId,
          name: user ? user.name : 'Bilinmiyor',
          educationLevel: cv ? cv.educationLevel : '',
          experienceLevel: cv ? cv.experienceLevel : '',
          skills: cv ? cv.skills : '',
          matchScore: mc.matchScore,
          status: mc.status,
          interviewId: interview ? interview._id : null
        };
      })
    );

    res.json({
      jobPosting: {
        _id: posting._id,
        title: posting.title,
        description: posting.description,
        requiredSkills: posting.requiredSkills,
        createdAt: posting.createdAt,
        candidates: candidatesWithDetails
      }
    });
  } catch (err) {
    console.error('İlan detay hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// PUT /api/jobpostings/:id — İlan güncelle
router.put('/:id', auth, requireRole('hr'), async (req, res) => {
  try {
    const { title, description, requiredSkills } = req.body;
    const posting = await JobPosting.findOneAndUpdate(
      { _id: req.params.id, hrUserId: req.user.id },
      { title, description, requiredSkills },
      { new: true }
    );
    if (!posting) return res.status(404).json({ message: 'İlan bulunamadı' });
    res.json(posting);
  } catch (err) {
    console.error('İlan güncelleme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// DELETE /api/jobpostings/:id — İlan sil
router.delete('/:id', auth, requireRole('hr'), async (req, res) => {
  try {
    const posting = await JobPosting.findOneAndDelete({ _id: req.params.id, hrUserId: req.user.id });
    if (!posting) return res.status(404).json({ message: 'İlan bulunamadı' });
    res.json({ message: 'İlan silindi' });
  } catch (err) {
    console.error('İlan silme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// PATCH /api/jobpostings/:id/candidate — Aday durumu güncelle
router.patch('/:id/candidate', auth, requireRole('hr'), async (req, res) => {
  try {
    const { candidateId, status } = req.body;
    const posting = await JobPosting.findOne({ _id: req.params.id, hrUserId: req.user.id });
    if (!posting) return res.status(404).json({ message: 'İlan bulunamadı' });

    const candidateIndex = posting.matchedCandidates.findIndex(c => c.candidateId.toString() === candidateId);
    if (candidateIndex === -1) return res.status(404).json({ message: 'Aday bulunamadı' });

    posting.matchedCandidates[candidateIndex].status = status;
    await posting.save();
    res.json({ message: 'Aday durumu güncellendi' });
  } catch (err) {
    console.error('Durum güncelleme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
