import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, CheckCircle, AlertCircle, Briefcase, ArrowRight, Star, Sparkles, Shield, TrendingUp, User, GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import PortalLayout from '../../components/layout/PortalLayout';
import Alert from '../../components/ui/Alert';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Spinner from '../../components/ui/Spinner';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] } })
};

export default function CandidateDashboard() {
  const [cv, setCv] = useState(null);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startModal, setStartModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cvRes, interviewRes] = await Promise.all([
          api.get('/cv/me'),
          api.get('/interviews/my')
        ]);
        setCv(cvRes.data.cv);
        setInterview(interviewRes.data.interview);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStep = () => {
    if (!cv) return 1;
    if (!interview) return 2;
    if (interview.status === 'pending' || interview.status === 'in_progress') return 3;
    return 4;
  };
  const currentStep = getStep();

  const renderTimeline = () => {
    const steps = [
      { id: 1, label: 'Özgeçmiş', icon: FileText },
      { id: 2, label: 'Eşleşme', icon: Clock },
      { id: 3, label: 'Mülakat', icon: Briefcase },
      { id: 4, label: 'Sonuç', icon: CheckCircle }
    ];
    return (
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider">Başvuru Süreciniz</h3>
              <p className="text-xs opacity-50">Adım {currentStep} / 4</p>
            </div>
          </div>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-[10%] right-[10%] top-6 h-1 bg-slate-100 dark:bg-slate-800 rounded-full z-0">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 rounded-full"
              />
            </div>
            {steps.map((step, idx) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              return (
                <motion.div key={step.id} custom={idx} initial="hidden" animate="visible" variants={fadeUp}
                  className="flex flex-col items-center relative z-10 flex-1"
                >
                  <div className={`w-16 h-auto rounded-xl flex items-center justify-center transition-all duration-500 shadow-md ${
                    isActive
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ring-4 ring-blue-500/20 scale-110'
                      : isCompleted
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800/50 text-slate-300 dark:text-slate-600 border border-slate-200 dark:border-slate-700/40 shadow-none'
                  }`}>
                    <step.icon className={`w-16 h-auto ${isActive && 'animate-pulse'}`} />
                  </div>
                  <span className={`text-xs font-bold mt-3 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' :
                    isCompleted ? 'text-emerald-600 dark:text-emerald-400' :
                    'text-gray-300 dark:text-slate-600'
                  }`}>{step.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <PortalLayout title="Aday Portalı">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" />
            <p className="text-gray-400 dark:text-slate-500 text-sm animate-pulse">Verileriniz yükleniyor...</p>
          </div>
        </div>
      </PortalLayout>
    );
  }

  // STATE 1 — CV yok
  if (!cv) {
    return (
      <PortalLayout title="Aday Portalı">
        <div className="max-w-4xl mx-auto mt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-7 shadow-xl shadow-blue-500/10"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1.5">Hoş geldin, {user?.name || 'Aday'} 👋</h2>
              <p className="text-blue-100/70 text-sm">HireMind platformuna hoş geldiniz. Kariyer yolculuğunuz burada başlıyor.</p>
            </div>
          </motion.div>

          {renderTimeline()}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Alert variant="warning" title="CV'niz henüz doldurulmamış" className="mb-6 !border-amber-200 dark:!border-amber-500/30 !bg-amber-50 dark:!bg-amber-500/10 !text-amber-700 dark:!text-amber-200">
              İş ilanlarıyla eşleşebilmek için önce özgeçmişinizi doldurmanız gerekiyor.
            </Alert>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                <FileText className="w-16 h-auto text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-extrabold mb-2">Özgeçmişinizi Oluşturun</h2>
                <p className="text-sm opacity-60 mb-6 leading-relaxed">
                  Bilgilerinizi girerek yapay zeka destekli iş eşleştirme sistemine dahil olun. CV'niz analiz edilerek en uygun pozisyonlarla eşleştirilecek.
                </p>
                <Button onClick={() => navigate('/candidate/cv')} className="!bg-blue-600 hover:!bg-blue-500 shadow-lg shadow-blue-500/20">
                  CV Oluştur <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: Sparkles, label: 'AI Eşleştirme', desc: 'Yapay zeka ile uygun ilanlarla eşleşin', gradient: 'from-violet-500 to-purple-600' },
              { icon: Shield, label: 'Güvenli Süreç', desc: 'Verileriniz %100 güvende', gradient: 'from-emerald-500 to-green-600' },
              { icon: Star, label: 'Profesyonel Analiz', desc: 'Detaylı performans raporu', gradient: 'from-amber-500 to-orange-600' },
            ].map((f, idx) => (
              <motion.div key={f.label} custom={idx + 3} initial="hidden" animate="visible" variants={fadeUp} className="stat-card">
                <div className={`w-16 h-auto rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-3 shadow-md`}>
                  <f.icon className="w-16 h-auto text-white" />
                </div>
                <p className="text-sm font-bold text-gray-800 dark:text-white">{f.label}</p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </PortalLayout>
    );
  }

  // STATE 2 — CV var, mülakat yok
  if (!interview) {
    return (
      <PortalLayout title="Aday Portalı">
        <div className="max-w-4xl mx-auto mt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 p-7 shadow-xl shadow-emerald-500/10"
          >
            <div className="absolute inset-0 opacity-20"><div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" /></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1.5">CV'niz Kaydedildi ✅</h2>
              <p className="text-emerald-100/70 text-sm">Uygun pozisyon bulunduğunda otomatik eşleştirileceksiniz.</p>
            </div>
          </motion.div>

          {renderTimeline()}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider">CV Özetiniz</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Ad Soyad', value: cv.fullName, icon: User, gradient: 'from-blue-500 to-blue-600' },
                { label: 'Eğitim', value: cv.educationLevel, icon: GraduationCap, gradient: 'from-violet-500 to-purple-600' },
                { label: 'Deneyim', value: cv.experienceLevel, icon: Award, gradient: 'from-emerald-500 to-green-600' },
                { label: 'Bölüm', value: cv.schoolDepartment, icon: Star, gradient: 'from-amber-500 to-orange-600' },
              ].map((item, idx) => (
                <motion.div key={item.label} custom={idx} initial="hidden" animate="visible" variants={fadeUp}
                  className="p-4 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-700/30"
                >
                  <div className={`w-16 h-auto rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-2 shadow-sm`}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                <Clock className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">Eşleşme Bekleniyor</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                  İK uzmanları iş ilanı oluşturduğunda AI sistemi sizi uygun pozisyonlarla otomatik eşleştirecek.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </PortalLayout>
    );
  }

  // STATE 3 — Mülakat hazır
  if (interview.status === 'pending' || interview.status === 'in_progress') {
    return (
      <PortalLayout title="Aday Portalı">
        <div className="max-w-4xl mx-auto mt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-700 p-7 shadow-xl shadow-blue-500/10"
          >
            <div className="absolute inset-0 opacity-20"><div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" /></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1.5">Mülakatınız Hazır! 🎯</h2>
                <p className="text-blue-100/70 text-sm">Sistem sizi yeni bir pozisyonla eşleştirdi.</p>
              </div>
              <Button onClick={() => setStartModal(true)} className="hidden md:flex !bg-white !text-blue-700 hover:!bg-blue-50 font-bold shadow-lg border-none">
                Mülakata Başla <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>

          {renderTimeline()}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20 animate-pulse">
                <Briefcase className="w-16 h-auto text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">{interview.jobPostingId?.title || 'Pozisyon'}</h2>
                  <Badge status={interview.status} />
                </div>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 leading-relaxed">
                  10 soruluk interaktif mülakat sizi bekliyor. Yanıtlarınız yapay zeka tarafından analiz edilecek.
                </p>
                <div className="flex items-center gap-4 mb-6 p-4 bg-blue-50 dark:bg-blue-500/5 rounded-xl border border-blue-100 dark:border-blue-500/20">
                  <span className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium"><Clock className="w-4 h-4" /> ~15 dk</span>
                  <div className="w-px h-5 bg-blue-200 dark:bg-slate-700" />
                  <span className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 font-medium"><Star className="w-4 h-4" /> 10 soru</span>
                  <div className="w-px h-5 bg-blue-200 dark:bg-slate-700" />
                  <span className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium"><Shield className="w-4 h-4" /> AI Analiz</span>
                </div>
                <Button onClick={() => setStartModal(true)} className="!bg-blue-600 hover:!bg-blue-500 shadow-lg shadow-blue-500/20">
                  Mülakata Başla <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <Modal isOpen={startModal} onClose={() => setStartModal(false)} title="Mülakata Başla">
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">Mülakatı başlatmak üzeresiniz. Lütfen aşağıdaki bilgileri dikkate alın:</p>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              {['Mülakat **10 sorudan** oluşmaktadır.', 'Mülakatı **tek seferde** tamamlamanız önerilir.', 'Yanıtlarınız **yapay zeka** tarafından değerlendirilecektir.'].map((t, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                  <AlertCircle className="w-16 h-auto text-amber-500 mt-0.5 flex-shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: t.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>') }} />
                </li>
              ))}
            </ul>
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={() => setStartModal(false)} className="flex-1">Vazgeç</Button>
              <Button onClick={() => navigate('/candidate/interview')} className="flex-1 !bg-blue-600 hover:!bg-blue-500">Başla</Button>
            </div>
          </div>
        </Modal>
      </PortalLayout>
    );
  }

  // STATE 4 — Tamamlandı
  return (
    <PortalLayout title="Aday Portalı">
      <div className="max-w-4xl mx-auto mt-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-700 to-teal-700 p-7 shadow-xl shadow-emerald-500/10"
        >
          <div className="absolute inset-0 opacity-20"><div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" /></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1.5">Tebrikler! Mülakatınız Tamamlandı 🎉</h2>
            <p className="text-emerald-100/70 text-sm">Yanıtlarınız başarıyla kaydedildi ve değerlendirme sürecine alındı.</p>
          </div>
        </motion.div>

        {renderTimeline()}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
              <CheckCircle className="w-16 h-auto text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Mülakat Tamamlandı</h2>
                <Badge status="completed" />
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">{interview.jobPostingId?.title || 'Pozisyon'}</strong> için mülakatınız başarıyla tamamlandı. İK uzmanı incelemesinden sonra size dönüş yapılacaktır.
              </p>
              <div className="flex items-center gap-4 mt-6 p-4 bg-emerald-50 dark:bg-emerald-500/5 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
                <span className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium"><CheckCircle className="w-4 h-4" /> Mülakat tamamlandı</span>
                <div className="w-px h-5 bg-emerald-200 dark:bg-slate-700" />
                <span className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-medium"><Clock className="w-4 h-4" /> Değerlendirme süreci</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PortalLayout>
  );
}
