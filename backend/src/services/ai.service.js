const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY,
  baseURL: process.env.AI_BASE_URL
});

const MODEL = process.env.AI_MODEL;

const parseJSON = (text) => {
  // Markdown kod bloğu içindeyse temizle
  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  return JSON.parse(cleaned);
};

/**
 * Adayın CV'sini iş ilanıyla eşleştir
 * @returns {{ score: number, reason: string }}
 */
const matchCandidateToJob = async (cv, jobPosting) => {
  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: 'system',
        content:
          'Sen bir İK uzmanı asistanısın. Adayın CV\'sini iş ilanıyla karşılaştır. 0-100 arasında uygunluk puanı ver. 50+ uyumlu demektir. YALNIZCA JSON döndür: {"score": <int>, "reason": "<max 2 cümle Türkçe>"}'
      },
      {
        role: 'user',
        content:
          `İŞ İLANI — Pozisyon: ${jobPosting.title} | Açıklama: ${jobPosting.description} | Beceriler: ${jobPosting.requiredSkills}\n` +
          `ADAY CV — Eğitim: ${cv.educationLevel} / ${cv.schoolDepartment} | Deneyim: ${cv.experienceLevel}\n` +
          `          Son Pozisyon: ${cv.lastPosition || 'Belirtilmemiş'} | Beceriler: ${cv.skills}\n` +
          `          Hakkında: ${cv.about || 'Belirtilmemiş'}`
      }
    ]
  });

  return parseJSON(response.choices[0].message.content);
};

/**
 * Pozisyona özel 10 Türkçe mülakat sorusu üret
 * @returns {{ questions: string[] }}
 */
const generateInterviewQuestions = async (jobPosting, cv) => {
  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: 'system',
        content:
          'Sen bir İK mülakatı uzmanısın. Pozisyona özel 10 Türkçe mülakat sorusu üret. 7-8 teknik (pozisyona özgü) + 2-3 davranışsal (STAR metodolojisi). YALNIZCA JSON döndür: {"questions": ["soru1", ..., "soru10"]}'
      },
      {
        role: 'user',
        content:
          `İLAN — Pozisyon: ${jobPosting.title} | Beceriler: ${jobPosting.requiredSkills}\n` +
          `ADAY — Eğitim: ${cv.educationLevel}/${cv.schoolDepartment} | Deneyim: ${cv.experienceLevel} | Beceriler: ${cv.skills}`
      }
    ]
  });

  return parseJSON(response.choices[0].message.content);
};

/**
 * Mülakat yanıtlarını değerlendir ve rapor verisi üret
 * @returns {{ overallScore, cvMatchScore, questionScores, strengths, weaknesses, aiEvaluation }}
 */
const analyzeInterviewAnswers = async (jobPosting, cv, questions, answers) => {
  const interviewText = questions
    .map((q, i) => `Soru ${i + 1}: ${q}\nYanıt: ${answers[i] || 'Yanıt verilmedi'}`)
    .join('\n\n');

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: 'system',
        content:
          'Sen bir İK değerlendirme uzmanısın. Her yanıtı alaka, ciddiyet ve kalite açısından 0-100 puan ver. YALNIZCA JSON döndür:\n' +
          '{"overallScore": <int>, "cvMatchScore": <int>, "questionScores": [{"question":"...","score":<int>,"feedback":"..."},...(10 öğe)], "strengths": ["...","...","..."], "weaknesses": ["...","..."], "aiEvaluation": "<2-3 cümle Türkçe genel değerlendirme>"}'
      },
      {
        role: 'user',
        content:
          `İLAN — Pozisyon: ${jobPosting.title} | Beceriler: ${jobPosting.requiredSkills}\n` +
          `ADAY CV — Eğitim: ${cv.educationLevel}/${cv.schoolDepartment} | Deneyim: ${cv.experienceLevel} | Beceriler: ${cv.skills}\n` +
          `MÜLAKAT:\n${interviewText}`
      }
    ]
  });

  return parseJSON(response.choices[0].message.content);
};

module.exports = { matchCandidateToJob, generateInterviewQuestions, analyzeInterviewAnswers };
