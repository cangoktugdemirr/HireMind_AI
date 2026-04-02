# HireMind AI — Master Build Prompt

Bu prompt, HireMind AI uygulamasını uçtan uca kodlayacak yapay zekaya yönelik eksiksiz bir uygulama talimatıdır. Herhangi bir konuda tereddüt etme; eksik bırakılan, stub veya TODO işaretli kısım olmasın.

---

## Referans Dosyalar

Kodlamaya başlamadan önce aşağıdaki dosyaları oku. Her kararını bu dosyalara dayandır:

| Dosya | İçerik |
|-------|--------|
| `docs/PRD.md` | Kullanıcı rolleri, iş kuralları, kullanıcı akışları, CV form formatı, özellik listesi |
| `docs/design.md` | Renk paleti, tipografi, boşluk sistemi, tüm UI bileşen kuralları, sayfa düzeni şablonları |
| `docs/screen-prompts.md` | Her sayfanın ve modalın tam tasarım promptu (18 ekran) |
| `Ekran_Tasarımları/*/screen.png` | Her sayfanın görsel referansı |
| `Ekran_Tasarımları/*/code.html` | Her sayfanın HTML örneği |

> Tasarım kararı verirken önce `screen.png` görselini, ardından `design.md` kurallarını uygula. İkisi çelişirse `design.md` önceliklidir.

---

## Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Frontend | React 18 (Vite), React Router v6, Axios, Tailwind CSS |
| İkonlar | `lucide-react` — yalnızca outline stili |
| Backend | Node.js + Express.js (CommonJS) |
| Veritabanı | MongoDB + Mongoose (yerel) |
| Auth | JWT (7 gün) + bcryptjs (salt=10) |
| AI | `openai` npm paketi, baseURL override ile |

**AI API:**
```
Base URL : https://coding-intl.dashscope.aliyuncs.com/v1
Model    : glm-5
Kütüphane: openai  →  new OpenAI({ apiKey, baseURL })
```
AI değişkenleri `.env`'den okunur; ileride başka bir sağlayıcıya geçmek için yalnızca `.env` güncellenir, kod değişmez.

---

## Klasör Yapısı

```
hiremind-ai/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── middleware/auth.js
│   │   ├── models/          # User, CV, JobPosting, Interview, Report
│   │   ├── routes/          # auth, cv, jobposting, interview, report
│   │   ├── services/ai.service.js
│   │   └── index.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── context/AuthContext.jsx
    │   ├── components/
    │   │   ├── layout/      # DashboardLayout, Sidebar, Header
    │   │   └── ui/          # Button, Modal, Badge, Alert, Spinner
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── candidate/   # CandidateDashboard, CVFormPage, InterviewPage
    │   │   └── hr/          # HRDashboard, CreateJobPostingPage,
    │   │                    # JobPostingDetailPage, CandidateReportPage
    │   ├── utils/scoreColor.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── tailwind.config.js
    └── package.json
```

---

## Veritabanı Şemaları

### User
```js
{ name, email (unique, lowercase), password (hash), role: ['candidate','hr'], createdAt }
```

### CV
```js
{
  userId (ref:User, unique),
  fullName, email, phone,
  educationLevel: ['Lise','Ön Lisans','Lisans','Yüksek Lisans','Doktora'],
  schoolDepartment,
  experienceLevel: ['Deneyimsiz','0-1 yıl','1-3 yıl','3-5 yıl','5-10 yıl','10+ yıl'],
  lastPosition (opsiyonel), skills, about (max:500, opsiyonel),
  isMatched: false, matchedJobId: null,
  createdAt, updatedAt
}
```

### JobPosting
```js
{
  hrUserId (ref:User), title, description, requiredSkills,
  matchedCandidates: [{ candidateId, cvId, matchScore, status:['pending','completed'] }],
  createdAt
}
```

### Interview
```js
{
  candidateId (ref:User), jobPostingId (ref:JobPosting),
  questions: [String],  // 10 adet
  answers:   [String],  // başta boş
  status: ['pending','in_progress','completed'],
  startedAt: null, completedAt: null, createdAt
}
```

### Report
```js
{
  candidateId, jobPostingId, interviewId (unique),
  overallScore, cvMatchScore,
  questionScores: [{ question, score, feedback }],
  strengths: [String], weaknesses: [String],
  aiEvaluation, createdAt
}
```

---

## API Endpoint'leri

### Auth — `/api/auth`
| Method | Path | Gövde | Yanıt |
|--------|------|-------|-------|
| POST | `/register` | name, email, password, role | token, user |
| POST | `/login` | email, password | token, user |

### CV — `/api/cv` [auth]
| Method | Path | Açıklama |
|--------|------|----------|
| POST | `/` | Aday CV'sini kaydet/güncelle (upsert) |
| GET | `/me` | Adayın CV'sini getir (null olabilir) |

### JobPosting — `/api/jobpostings` [auth, hr]
| Method | Path | Açıklama |
|--------|------|----------|
| POST | `/` | İlan oluştur → eşleştirmeyi **async** başlat → hemen `{ jobPostingId }` dön |
| GET | `/` | HR'ın ilanlarını listele (totalCandidates, completedCount ile) |
| GET | `/:id` | İlan detayı + aday listesi `[{ name, matchScore, status, interviewId }]` |

**Async eşleştirme mantığı** (`matchCandidatesForJob`):
```
1. CV.find({ isMatched: false }) → müsait adaylar
2. for...of döngüsü (sıralı, rate limit için):
   a. matchCandidateToJob(cv, jobPosting) → score
   b. score >= 50 ise:
      - CV.isMatched=true, CV.matchedJobId=jobPosting._id
      - JobPosting.matchedCandidates'e ekle
      - generateInterviewQuestions(jobPosting, cv) → Interview oluştur
   c. hata → console.error, döngü devam eder
3. jobPosting.save()
```

### Interview — `/api/interviews` [auth]
| Method | Path | Açıklama |
|--------|------|----------|
| GET | `/my` | Adayın mülakatını getir (jobPostingId.title populate ile) |
| POST | `/:id/start` | status→in_progress, startedAt=now |
| POST | `/:id/submit` | Body: `{ answers[10] }` → status→completed → `generateReport()` async başlat |
| DELETE | `/:id/abandon` | status→pending, answers=[], startedAt=null |

### Report — `/api/reports` [auth]
| Method | Path | Açıklama |
|--------|------|----------|
| GET | `/interview/:interviewId` | Raporu getir (hr veya ilgili aday erişebilir; null olabilir) |

---

## AI Servis Fonksiyonları

Her fonksiyon JSON döndürür. Yanıt doğrudan `JSON.parse()` ile işlenir.

### 1. matchCandidateToJob(cv, jobPosting) → `{ score, reason }`

```
SYSTEM:
Sen bir İK uzmanı asistanısın. Adayın CV'sini iş ilanıyla karşılaştır.
0-100 arasında uygunluk puanı ver. 50+ uyumlu demektir.
YALNIZCA JSON döndür: {"score": <int>, "reason": "<max 2 cümle Türkçe>"}

USER:
İŞ İLANI — Pozisyon: {title} | Açıklama: {description} | Beceriler: {requiredSkills}
ADAY CV — Eğitim: {educationLevel} / {schoolDepartment} | Deneyim: {experienceLevel}
          Son Pozisyon: {lastPosition||'Belirtilmemiş'} | Beceriler: {skills}
          Hakkında: {about||'Belirtilmemiş'}
```

### 2. generateInterviewQuestions(jobPosting, cv) → `{ questions: [10 string] }`

```
SYSTEM:
Sen bir İK mülakatı uzmanısın. Pozisyona özel 10 Türkçe mülakat sorusu üret.
7-8 teknik (pozisyona özgü) + 2-3 davranışsal (STAR metodolojisi).
YALNIZCA JSON döndür: {"questions": ["soru1", ..., "soru10"]}

USER:
İLAN — Pozisyon: {title} | Beceriler: {requiredSkills}
ADAY — Eğitim: {educationLevel}/{schoolDepartment} | Deneyim: {experienceLevel} | Beceriler: {skills}
```

### 3. analyzeInterviewAnswers(jobPosting, cv, questions, answers) → ReportData

```
SYSTEM:
Sen bir İK değerlendirme uzmanısın. Her yanıtı alaka, ciddiyet ve kalite açısından 0-100 puan ver.
YALNIZCA JSON döndür:
{
  "overallScore": <int>, "cvMatchScore": <int>,
  "questionScores": [{"question":"...","score":<int>,"feedback":"..."},...(10 öğe)],
  "strengths": ["...","...","..."], "weaknesses": ["...","..."],
  "aiEvaluation": "<2-3 cümle Türkçe genel değerlendirme>"
}

USER:
İLAN — Pozisyon: {title} | Beceriler: {requiredSkills}
ADAY CV — Eğitim: {educationLevel}/{schoolDepartment} | Deneyim: {experienceLevel} | Beceriler: {skills}
MÜLAKAT:
{questions.map((q,i) => `Soru ${i+1}: ${q}\nYanıt: ${answers[i]||'Yanıt verilmedi'}`).join('\n\n')}
```

---

## Frontend — Temel Kurulum

### axios.js
```js
// baseURL: 'http://localhost:5000/api'
// request interceptor: localStorage'dan 'hiremind_token' oku → Bearer header
// response interceptor: 401 → localStorage temizle → window.location='/login'
```

### AuthContext.jsx
```js
// State: { user, token, loading }
// Mount: localStorage'dan 'hiremind_token' ve 'hiremind_user' oku
// login(token, userData): localStorage'a yaz + state güncelle
// logout(): localStorage temizle + state sıfırla
// isAuthenticated: !!token
```

### App.jsx Routing
```
/                        → auth yoksa /login, varsa role'e göre dashboard
/login                   → LoginPage
/register                → RegisterPage
/candidate/dashboard     → ProtectedRoute(candidate) → CandidateDashboard
/candidate/cv            → ProtectedRoute(candidate) → CVFormPage
/candidate/interview     → ProtectedRoute(candidate) → InterviewPage
/hr/dashboard            → ProtectedRoute(hr) → HRDashboard
/hr/create-job           → ProtectedRoute(hr) → CreateJobPostingPage
/hr/job/:id              → ProtectedRoute(hr) → JobPostingDetailPage
/hr/report/:interviewId  → ProtectedRoute(hr) → CandidateReportPage
```

### tailwind.config.js
```js
// Extend colors: primary: { 50:'#EFF6FF', 100:'#DBEAFE', 500:'#3B82F6',
//                            600:'#2563EB', 700:'#1D4ED8', 900:'#1E3A5F' }
// fontFamily.sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
```

### scoreColor.js (utils)
```js
export const getScoreColor = (s) => s >= 70 ? '#059669' : s >= 40 ? '#D97706' : '#DC2626';
```

---

## Sayfa Referansları

Her sayfa için **önce ilgili görseli ve HTML'i** oku, ardından uygula:

| Sayfa / Bileşen | Görsel + HTML | Screen Prompt |
|-----------------|---------------|---------------|
| Giriş Yap | `Ekran_Tasarımları/giris_yap/` | PROMPT 1 |
| Kayıt Ol | `Ekran_Tasarımları/kayıt_ol/` | PROMPT 2 |
| Aday Paneli — CV yok | `Ekran_Tasarımları/panelim_cv_doldurulmamış/` | PROMPT 3 |
| Aday Paneli — Mülakat yok | `Ekran_Tasarımları/panelim_m_lakat_yok/` | PROMPT 4 |
| Aday Paneli — Bekleyen mülakat | `Ekran_Tasarımları/panelim_bekleyen_mülakat_var/` | PROMPT 5 |
| Aday Paneli — Tamamlandı | `Ekran_Tasarımları/panelim_mülakat_tamamlandı/` | PROMPT 6 |
| Özgeçmiş Formu | `Ekran_Tasarımları/özgeçmiş_formu/` | PROMPT 7 |
| Mülakat Sayfası | `Ekran_Tasarımları/mülakat_sayfası/` | PROMPT 8 |
| İK Paneli — Boş | `Ekran_Tasarımları/ik_paneli_bos_durum/` | PROMPT 9 |
| İK Paneli — İlanlar var | `Ekran_Tasarımları/ik_paneli_ilanlar_mevcut/` | PROMPT 10 |
| Yeni İlan Oluştur | `Ekran_Tasarımları/yeni_ilan_oluştur/` | PROMPT 11 |
| İlan Detay | `Ekran_Tasarımları/ilan_detay/` | PROMPT 12 |
| Aday Raporu | `Ekran_Tasarımları/aday_raporu_sayfası/` | PROMPT 13 |
| Modal — Mülakat Başlat | `Ekran_Tasarımları/mülakat_baslatma_onay/` | PROMPT 14 |
| Modal — Mülakat Gönder | `Ekran_Tasarımları/mülakat_gönderme_onay/` | PROMPT 15 |
| Modal — Terk Uyarısı | `Ekran_Tasarımları/mülakat_terk_uyarı_sayfası/` | PROMPT 16 |
| Modal — İlan Sonucu | `Ekran_Tasarımları/ilan_olusturma_sonucu/` | PROMPT 17 |
| İK Onay Modalı | `Ekran_Tasarımları/ik_onay/` | PROMPT 18 |

### Sayfa → React Component Eşleşmesi
- PROMPT 1-2 → `LoginPage.jsx`, `RegisterPage.jsx`
- PROMPT 3-6 → `CandidateDashboard.jsx` (4 farklı state)
- PROMPT 7 → `CVFormPage.jsx`
- PROMPT 8 → `InterviewPage.jsx`
- PROMPT 9-10 → `HRDashboard.jsx` (2 farklı state)
- PROMPT 11 → `CreateJobPostingPage.jsx`
- PROMPT 12 → `JobPostingDetailPage.jsx`
- PROMPT 13 → `CandidateReportPage.jsx`
- PROMPT 14-18 → Sayfaların içindeki `<Modal>` bileşeni olarak

---

## Kritik Uygulama Kararları

Aşağıdaki kararlar PRD'de belirsiz bırakılan noktalara dair kesin seçimlerdir:

| Konu | Karar |
|------|-------|
| Eşleştirme eşiği | AI uyum skoru **>= 50** olan adaylar eşleştirilir |
| Eşleştirme zamanlaması | İlan kaydedilir → HTTP yanıtı hemen döner → eşleştirme arka planda async çalışır |
| AI istek sırası | `for...of` (sıralı) — paralel değil, rate limit koruması için |
| Rapor üretimi | `submit` endpoint'i → HTTP yanıtı döner → rapor arka planda async üretilir |
| Mülakat sayfası layout | Sidebar/Header yok, kendi tam ekran layout'u |
| Mülakat soruları | Soru soru gösterilir (birer birer), hepsi aynı anda değil |
| LocalStorage anahtarları | `hiremind_token`, `hiremind_user` |
| CORS origin | `http://localhost:5173` |

---

## .env (Backend)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hiremind
JWT_SECRET=hiremind_super_secret_key_2024
JWT_EXPIRES_IN=7d
AI_API_KEY=your_api_key_here
AI_BASE_URL=https://coding-intl.dashscope.aliyuncs.com/v1
AI_MODEL=glm-5
```

---

## Başlatma

```bash
# Backend
cd backend && npm install && npm run dev   # :5000

# Frontend (yeni terminal)
cd frontend && npm install && npm run dev  # :5173
```

---

## Önerilen Geliştirme Sırası

```
1. backend: package.json, .env, db.js, index.js
2. backend: 5 model
3. backend: auth middleware + auth routes
4. backend: ai.service.js (3 fonksiyon)
5. backend: cv, jobposting, interview, report routes
6. frontend: Vite + Tailwind + lucide-react kurulum
7. frontend: axios.js + AuthContext + App.jsx routing
8. frontend: UI bileşenleri (Button, Badge, Alert, Modal, Spinner)
9. frontend: Layout bileşenleri (Sidebar, Header, DashboardLayout)
10. frontend: LoginPage + RegisterPage
11. frontend: CandidateDashboard + CVFormPage + InterviewPage
12. frontend: HRDashboard + CreateJobPosting + JobPostingDetail + CandidateReport
```
