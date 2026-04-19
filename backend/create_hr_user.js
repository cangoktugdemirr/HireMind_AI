require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const run = async () => {
    try {
        const uri = 'mongodb://cangoktugdemir_db_user:ie6qOwqVFtZi901H@ac-qokfsva-shard-00-00.kb5mcu0.mongodb.net:27017,ac-qokfsva-shard-00-01.kb5mcu0.mongodb.net:27017,ac-qokfsva-shard-00-02.kb5mcu0.mongodb.net:27017/hiremind_db?ssl=true&replicaSet=atlas-j5yjk9-shard-0&authSource=admin&appName=Cluster0';
        
        console.log('Veritabanına bağlanılıyor...');
        await mongoose.connect(uri);
        console.log('Bağlantı başarılı!');

        const email = 'efe@ik.com';
        const plainPassword = '1234';
        
        // Önce kullanıcının olup olmadığını kontrol edelim
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Bu kullanıcı zaten mevcut. Şifresi güncelleniyor (Eğer farklıysa)...');
            existingUser.password = await bcrypt.hash(plainPassword, 10);
            existingUser.role = 'hr'; 
            await existingUser.save();
            console.log('Kullanıcı güncellendi!');
        } else {
            console.log('Yeni İK kullanıcısı oluşturuluyor...');
            const hashedPassword = await bcrypt.hash(plainPassword, 10);
            await User.create({
                name: 'Efe (IK)',
                email: email,
                password: hashedPassword,
                role: 'hr'
            });
            console.log('İK kullanıcısı (efe@ik.com) başarıyla oluşturuldu!');
        }

        process.exit(0);
    } catch (err) {
        console.error('Hata oluştu:', err);
        process.exit(1);
    }
};

run();
