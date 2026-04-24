import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#060910] text-slate-100 font-sans">
      <nav className="border-b border-white/5 bg-[#060910]/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <img src="/logo.png" alt="HireMind" className="w-5 h-5 object-contain" />
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
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Kullanım Şartları</h1>
            <p className="text-slate-500 text-sm mt-1">Son güncelleme: 12 Nisan 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Hizmet Tanımı</h2>
            <p>HireMind AI, yapay zeka destekli işe alım ve mülakat yönetim platformudur. Platform; aday özgeçmiş yönetimi, yapay zeka ile otomatik aday-ilan eşleştirme, otonom mülakat gerçekleştirme ve performans raporlama hizmetlerini sunmaktadır.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Hesap Sorumlulukları</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Kullanıcılar, kayıt sırasında doğru ve güncel bilgi sağlamakla yükümlüdür.</li>
              <li>Hesap güvenliğinden (şifre gizliliği vb.) kullanıcı sorumludur.</li>
              <li>Yetkisiz erişim tespit edildiğinde derhal bildirimde bulunulmalıdır.</li>
              <li>Her kullanıcı yalnızca bir hesaba sahip olmalıdır.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Kullanım Kuralları</h2>
            <p className="mb-3">Platform kullanılırken aşağıdaki kurallar geçerlidir:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Platform yalnızca yasal ve amacına uygun şekilde kullanılmalıdır.</li>
              <li>Yanlış veya yanıltıcı bilgi paylaşımı yasaktır.</li>
              <li>Sisteme zarar verecek girişimlerde bulunmak (DDoS, SQL Injection vb.) yasaktır.</li>
              <li>Diğer kullanıcıların kişisel verilerine yetkisiz erişim girişimleri yasaktır.</li>
              <li>Platformdan elde edilen verilerin üçüncü taraflarla izinsiz paylaşımı yasaktır.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Yapay Zeka Hizmetleri</h2>
            <p>HireMind'ın yapay zeka modülleri, aday değerlendirme sürecinde karar destek aracı olarak kullanılmaktadır. AI tarafından üretilen eşleşme skorları ve mülakat raporları, tavsiye niteliğinde olup nihai işe alım kararı tamamen İK uzmanına aittir. HireMind, yapay zeka çıktılarının kesin doğruluğunu garanti etmemektedir.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Fikri Mülkiyet</h2>
            <p>HireMind platformu, tasarımı, logosu, yazılım altyapısı ve tüm içeriği HireMind AI'ın fikri mülkiyetidir. İzinsiz kopyalama, dağıtma veya ticari kullanım yasaktır. Kullanıcılar tarafından platforma yüklenen içerikler (CV, mülakat yanıtları) kullanıcının mülkiyetinde kalır.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Hizmet Değişiklikleri</h2>
            <p>HireMind, hizmet kapsamını, fiyatlandırmasını veya özelliklerini önceden bildirim yaparak değiştirme hakkını saklı tutar. Kritik değişiklikler, kullanıcılara e-posta yoluyla bildirilecektir.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Sorumluluk Sınırlaması</h2>
            <p>HireMind, platform kesintileri, veri kaybı veya yapay zeka hizmetlerindeki aksaklıklardan doğan dolaylı zararlardan sorumlu tutulamaz. Platform "olduğu gibi" sunulmakta olup, kesintisiz veya hatasız çalışma garantisi verilmemektedir.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Hesap Sonlandırma</h2>
            <p>HireMind, kullanım kurallarını ihlal eden hesapları önceden bildirim yaparak veya yapmaksızın askıya alma veya sonlandırma hakkına sahiptir. Kullanıcılar, hesaplarını istedikleri zaman silme talebinde bulunabilir.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Uygulanacak Hukuk</h2>
            <p>Bu kullanım şartları Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlık halinde İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. İletişim</h2>
            <p>Kullanım şartlarına ilişkin sorularınız için <span className="text-blue-400 font-medium">destek@hiremind.com.tr</span> adresinden bizimle iletişime geçebilirsiniz.</p>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-slate-500 text-sm">© 2026 HireMind AI</p>
          <Link to="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">Gizlilik Politikası</Link>
        </div>
      </footer>
    </div>
  );
}
