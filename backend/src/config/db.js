const mongoose = require('mongoose');
const dns = require('dns');

// Force DNS servers to bypass Vercel DNS resolution issues for SRV records
if (process.env.VERCEL) {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

// Official Serverless cache pattern
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';
    console.log('MongoDB: Yeni bağlantı başlatılıyor...');
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    }).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB bağlandı: ${cached.conn.connection.host}`);
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB bağlantı hatası:', e.message);
    throw e;
  }

  return cached.conn;
};

module.exports = connectDB;
