require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const JobPosting = require('./src/models/JobPosting');

const URI = process.env.MONGODB_URI;

async function runSeed() {
  try {
    console.log('Canlı Atlas veritabanına bağlanılıyor...');
    await mongoose.connect(URI);
    console.log('Bağlantı başarılı. Masaüstündeki dosya okunuyor...');

    const filePath = path.join(require('os').homedir(), 'OneDrive', 'Desktop', 'hiremind.jobpostings.json');
    const raw = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(raw);

    // MongoDB Compass export formatını ($oid ve $date) temizle
    const cleanObj = (obj) => {
      if (Array.isArray(obj)) return obj.map(cleanObj);
      if (obj && typeof obj === 'object') {
        if (obj['$oid']) return obj['$oid'];
        if (obj['$date']) return new Date(obj['$date']);
        const newObj = {};
        for (let key in obj) { 
          newObj[key] = cleanObj(obj[key]); 
        }
        return newObj;
      }
      return obj;
    };

    data = cleanObj(data);

    // Eski verileri temizleyip yenilerini ekle (Çakışmayı önlemek için)
    await JobPosting.deleteMany({});
    await JobPosting.insertMany(data);

    console.log('✅ İşlem Tamam! Masaüstündeki iş ilanları Atlas veritabanına eklendi.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Bir hata oluştu:', error);
    process.exit(1);
  }
}

runSeed();
