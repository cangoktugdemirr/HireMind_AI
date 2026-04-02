# HireMind AI 🧠

**Yapay Zeka Destekli İşe Alım Platformu**

HireMind AI, geleneksel işe alım süreçlerindeki subjektifliği ve verimsizliği ortadan kaldırmak için geliştirilmiş bir web uygulamasıdır. İK uzmanları iş ilanı oluşturduğunda yapay zeka otomatik olarak uygun adayları tespit eder, pozisyona özel mülakat soruları üretir ve aday yanıtlarını analiz ederek kapsamlı bir rapor hazırlar.

> Okul projesi olarak geliştirilmiştir.

---

## Özellikler

### İK Uzmanı
- İş ilanı oluşturma (pozisyon, açıklama, aranan beceriler)
- Yapay zeka ile otomatik aday eşleştirme (CV–ilan uyum skoru ≥ 50)
- Eşleşen adayların listesi ve mülakat durumu takibi
- Aday mülakat raporlarını görüntüleme (skor, güçlü/zayıf yönler, AI değerlendirmesi)

### Aday
- CV formu doldurma (kişisel bilgiler, eğitim, deneyim, beceriler)
- Atanan mülakatı görme
- 10 soruluk yapay zeka destekli mülakat tamamlama
- Mülakatı terk edip yeniden başlayabilme

### Yapay Zeka
- **Eşleştirme:** CV ile iş ilanını karşılaştırıp 0–100 uyum puanı verir
- **Soru Üretimi:** 7–8 teknik + 2–3 davranışsal (STAR) Türkçe soru üretir
- **Rapor:** Her soruyu skor + geri bildirimle değerlendirir, güçlü/gelişim alanlarını listeler

---

## Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| **Frontend** | React 18 + Vite, React Router v6, Tailwind CSS, Axios, Lucide React |
| **Backend** | Node.js + Express.js (CommonJS) |
| **Veritabanı** | MongoDB + Mongoose |
| **Kimlik Doğrulama** | JWT (7 gün), bcryptjs |
| **Yapay Zeka** | OpenAI SDK → Alibaba DashScope (`glm-5` modeli) |

---

## Kurulum

### Gereksinimler
- [Node.js](https://nodejs.org) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) (yerel kurulum)

### 1. Repoyu klonla

```bash
git clone https://github.com/cangoktugdemirr/HireMind_AI.git
cd HireMind_AI
```

### 2. Backend kurulumu

```bash
cd backend
npm install
```

`.env.example` dosyasını kopyalayarak `.env` oluştur ve bilgilerini doldur:

```bash
cp .env.example .env
```

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hiremind
JWT_SECRET=gizli_bir_anahtar_yaz
JWT_EXPIRES_IN=7d
AI_API_KEY=api_anahtariniz
AI_BASE_URL=https://coding-intl.dashscope.aliyuncs.com/v1
AI_MODEL=glm-5
```

Backend'i başlat:

```bash
npm run dev
# → http://localhost:5000
```

### 3. Frontend kurulumu

Yeni bir terminal aç:

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## Proje Yapısı

```
HireMind_AI/
├── backend/
│   └── src/
│       ├── config/         # MongoDB bağlantısı
│       ├── middleware/      # JWT auth middleware
│       ├── models/          # User, CV, JobPosting, Interview, Report
│       ├── routes/          # auth, cv, jobposting, interview, report
│       ├── services/        # ai.service.js (3 AI fonksiyonu)
│       └── index.js         # Express sunucu
├── frontend/
│   └── src/
│       ├── api/             # Axios instance
│       ├── components/      # UI bileşenleri + Layout
│       ├── context/         # AuthContext
│       ├── pages/
│       │   ├── candidate/   # Dashboard, CV Formu, Mülakat
│       │   └── hr/          # Dashboard, İlan Oluştur, İlan Detay, Rapor
│       └── utils/           # scoreColor yardımcısı
└── docs/                    # PRD, Tasarım Sistemi, Ekran Promptları
```

---

## API Uç Noktaları

| Metot | Uç Nokta | Açıklama |
|-------|----------|----------|
| POST | `/api/auth/register` | Kayıt ol |
| POST | `/api/auth/login` | Giriş yap |
| POST | `/api/cv` | CV oluştur / güncelle |
| GET | `/api/cv/me` | Kendi CV'ni getir |
| POST | `/api/jobpostings` | İlan oluştur (async eşleştirme başlar) |
| GET | `/api/jobpostings` | İlanları listele |
| GET | `/api/jobpostings/:id` | İlan detayı + aday listesi |
| GET | `/api/interviews/my` | Atanan mülakatı getir |
| POST | `/api/interviews/:id/start` | Mülakatı başlat |
| POST | `/api/interviews/:id/submit` | Mülakatı gönder (async rapor başlar) |
| DELETE | `/api/interviews/:id/abandon` | Mülakatı sıfırla |
| GET | `/api/reports/interview/:id` | Raporu getir (hazır değilse null döner) |

---

## Uygulama Akışı

```
İK Uzmanı                          Aday
─────────────────────────────────────────────────────
1. İlan oluştur
        │
        ▼
2. AI arka planda CV'leri tarar
   (skor ≥ 50 → eşleştir + soru üret)
                                3. CV doldur
                                        │
                                        ▼
                                4. "Mülakat hazır" bildirimi
                                        │
                                        ▼
                                5. 10 soruluk mülakatı tamamla
                                        │
                                        ▼
                                6. AI yanıtları değerlendirir
7. Raporu incele ◄──────────────────────┘
```

---

## Ekran Görüntüleri

> Ekran tasarım dosyaları repo dışında tutulmaktadır.

| Sayfa | Açıklama |
|-------|----------|
| Giriş / Kayıt | İki rol: Aday & İK Uzmanı |
| Aday Paneli | 4 farklı durum kartı (CV yok → eşleşme bekleniyor → mülakat hazır → tamamlandı) |
| CV Formu | 9 alan: kişisel, eğitim, deneyim, beceriler |
| Mülakat Sayfası | Tam ekran, 10 soru, soru navigatörü |
| İK Paneli | İstatistik kartları + ilan tablosu |
| Aday Raporu | Dairesel skor göstergesi, soru bazlı puanlar, güçlü/gelişim alanları |

---

## Geliştirici Notları

- Eşleştirme ve rapor oluşturma **asenkron** çalışır — HTTP yanıtını bekletmez
- Aday yalnızca **bir** iş ilanıyla eşleşebilir (ömür boyu bir kez)
- Mülakat terk edilirse tüm yanıtlar sıfırlanır, yeniden başlanabilir
- Rapor sayfası hazır olana dek **3 saniyede bir** polling yapar
- Tüm arayüz **Türkçe**

---

## Lisans

Bu proje okul ödevi kapsamında geliştirilmiştir.
