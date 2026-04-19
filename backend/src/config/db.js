const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log('MongoDB: Using cached connection');
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      family: 4 // Use IPv4, skip trying IPv6 (fixes Vercel DNS issues with MongoDB Atlas)
    });
    console.log(`MongoDB bağlandı: ${conn.connection.host}`);
    cachedConnection = conn;
    return conn;
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error.message);
    if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
