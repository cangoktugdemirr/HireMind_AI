import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#060910] text-slate-100 font-sans">
      <nav className="border-b border-white/5 bg-[#060910]/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <img src="/official_hiremind_logo.png" alt="HireMind" className="w-12 h-auto object-contain" />
            </div>
            <span className="text-lg font-black text-white tracking-tight">HireMind</span>
          </Link>
          <Link to="/" className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /> Ana Sayfa
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Gizlilik Politikası</h1>
            <p className="text-slate-500 text-sm mt-1">Son güncelleme: 12 Nisan 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Genel Bakış</h2>
            <p>HireMind AI ("Şirket", "biz"), kullanıcılarının gizliliğine büyük önem vermektedir. Bu gizlilik politikası, HireMind platformunu ("Hizmet") kullanırken toplanan, işlenen ve saklanan kişisel verilere ilişkin uygulamalarımızı açıklamaktadır.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Toplanan Veriler</h2>
            <p className="mb-3">HireMind, hizmetlerini sunmak için aşağıdaki verileri toplamaktadır:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><span className="text-slate-200 font-medium">Kimlik Bilgileri:</span> Ad, soyad, e-posta adresi</li>
              <li><span className="text-slate-200 font-medium">Özgeçmiş Bilgileri:</span> Eğitim geçmişi, iş deneyimi, yetenekler</li>
              <li><span className="text-slate-200 font-medium">Mülakat Verileri:</span> AI mülakatlarında verilen yazılı yanıtlar</li>
              <li><span className="text-slate-200 font-medium">Teknik Veriler:</span> IP adresi, tarayıcı bilgisi, oturum verileri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Verilerin Kullanım Amacı</h2>
            <p className="mb-3">Toplanan veriler yalnızca aşağıdaki amaçlarla kullanılmaktadır:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Aday-işveren eşleştirme süreçlerinin yürütülmesi</li>
              <li>Yapay zeka destekli mülakat ve değerlendirme hizmetlerinin sağlanması</li>
              <li>Kullanıcı hesabının oluşturulması ve yönetilmesi</li>
              <li>Hizmet kalitesinin iyileştirilmesi ve analiz raporlarının hazırlanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Veri Güvenliği</h2>
            <p>Tüm kişisel veriler, endüstri standardı 256-bit SSL/TLS şifreleme protokolleri ile korunmaktadır. Verileriniz MongoDB Atlas altyapısında, uluslararası güvenlik standartlarına uygun olarak saklanmaktadır. Yetkisiz erişime karşı çok katmanlı güvenlik önlemleri uygulanmaktadır.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Yapay Zeka ve Veri İşleme</h2>
            <p>HireMind'ın yapay zeka modülleri, adayları iş ilanlarıyla eşleştirmek ve mülakat performansını değerlendirmek amacıyla verilerinizi işlemektedir. Yapay zeka tarafından oluşturulan raporlar, yalnızca ilgili İK uzmanı tarafından görüntülenebilmektedir. Hiçbir kişisel veri üçüncü taraflarla paylaşılmamaktadır.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Üçüncü Taraf Hizmetler</h2>
            <p>Hizmetimiz, altyapı ve analitik amaçlı olarak güvenilir üçüncü taraf hizmet sağlayıcılarından faydalanmaktadır (Vercel, MongoDB Atlas). Bu sağlayıcılar, kendi gizlilik politikaları çerçevesinde verileri işlemektedir.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Kullanıcı Hakları</h2>
            <p className="mb-3">KVKK (6698 sayılı Kanun) ve GDPR kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Verilerinizin düzeltilmesini veya silinmesini talep etme</li>
              <li>Verilerinizin işlenmesine itiraz etme</li>
              <li>Verilerinizin taşınabilirliğini talep etme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. İletişim</h2>
            <p>Gizlilik politikamıza ilişkin sorularınız için <span className="text-blue-400 font-medium">destek@hiremind.com.tr</span> adresinden bizimle iletişime geçebilirsiniz.</p>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-slate-500 text-sm">© 2026 HireMind AI</p>
          <Link to="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">Kullanım Şartları</Link>
        </div>
      </footer>
    </div>
  );
}
