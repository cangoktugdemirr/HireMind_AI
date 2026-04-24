import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Briefcase, Sparkles, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 overflow-x-hidden relative font-sans">
      {/* Refined Background decoration - No more blocky UI */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] bg-[#14213d]/20 blur-[150px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[5%] w-[400px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-cyan-600/5 blur-[180px] rounded-full"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/5 bg-[#02040a]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/official_hiremind_logo.png" alt="HireMind Logo" className="w-28 h-auto object-contain" />
            <span className="text-2xl font-black text-white tracking-tight">HireMind</span>
          </div>
          <div className="hidden md:flex items-center gap-8 mr-8">
            <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Özellikler</a>
            <a href="#how" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Nasıl Çalışır</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-4">
              Giriş Yap
            </Link>
            <Link to="/register" className="bg-[#1a263e] hover:bg-[#2a3b5e] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-black/20 flex items-center gap-2 border border-white/5">
              Kayıt Ol <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-blue-400 mb-8 border-blue-500/20 bg-blue-500/5">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold tracking-widest uppercase">Yapay Zeka Destekli İşe Alım</span>
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-white">
                Geleceğin İşe Alım <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                  Deneyimini Keşfedin.
                </span>
              </motion.h1>

              <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                İK süreçlerinizi otonom yapay zeka ile profesyonel seviyeye taşıyın. Aday mülakatlarını AI ile gerçekleştirin, objektif raporlar alın.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link to="/register" className="w-full sm:w-auto bg-[#1a263e] hover:bg-[#2a3b5e] text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-black/40 flex items-center justify-center gap-3 border border-white/5">
                  Ücretsiz Başlayın <Zap className="w-16 h-auto fill-current" />
                </Link>
                <Link to="/hr-login" className="w-full sm:w-auto bg-slate-800/50 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all border border-slate-700/50 flex items-center justify-center gap-3 backdrop-blur-sm">
                  Kurumsal Giriş
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <FeatureCard 
              icon={<Bot className="text-cyan-400 w-16 h-auto" />}
              title="Otonom Mülakatlar"
              description="Adaylarla dinamik sesli veya yazılı mülakatlar gerçekleştiren size özel AI asistanı."
              index={0}
            />
            <FeatureCard 
              icon={<Briefcase className="text-blue-400 w-16 h-auto" />}
              title="Akıllı CV Analizi"
              description="Binlerce CV'yi saniyeler içinde tarayın, role en uygun adayları yüzdeler eşliğinde listeyin."
              index={1}
            />
            <FeatureCard 
              icon={<CheckCircle2 className="text-purple-400 w-16 h-auto" />}
              title="Detaylı Raporlar"
              description="Mülakat sonrası yetkinlik bazlı, objektif ve veri odaklı değerlendirme raporları alın."
              index={2}
            />
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section id="how" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Nasıl Çalışır?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">İK profesyonelleri için tasarlanmış 4 basit adımda tam otomasyon.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent hidden md:block z-0" />
            
            {[
              { id: 1, title: 'İlan Oluşturun', desc: 'Açık pozisyonunuzu saniyeler içinde yayınlayın.' },
              { id: 2, title: 'AI Eşleştirsin', desc: 'Yapay zeka aday havuzunu tarayarak en iyileri seçer.' },
              { id: 3, title: 'Mülakat Başlasın', desc: 'Aday otonom AI ile mülakatını gerçekleştirir.' },
              { id: 4, title: 'Raporu İnceleyin', desc: 'Veri odaklı objektif raporları anında analiz edin.' },
            ].map((step) => (
              <div key={step.id} className="relative z-10 text-center">
                <div className="w-20 h-20 bg-[#1a263e] rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-8 shadow-xl shadow-black/10 transform hover:scale-110 transition-transform border border-white/5">
                  {step.id}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="relative z-10 border-t border-white/5 bg-[#060910]/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex items-center gap-3">
                    <div className="w-16 h-auto rounded-lg flex items-center justify-center">
                      <img src="/official_hiremind_logo.png" alt="HireMind" className="w-12 h-auto object-contain" />
                    </div>
                    <span className="text-xl font-black text-white tracking-tight">HireMind</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">© 2026 HireMind AI. Excellence in Recruitment.</p>
                <div className="flex gap-8">
                    <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Gizlilik</Link>
                    <Link to="/terms" className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Şartlar</Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="glass-panel-dark p-10 hover:border-blue-500/40 hover:bg-slate-900/40 transition-all duration-500 group relative overflow-hidden"
  >
    <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
    <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500 shadow-inner shadow-blue-500/10">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-400 leading-relaxed font-medium text-sm lg:text-base">{description}</p>
  </motion.div>
);

export default LandingPage;
