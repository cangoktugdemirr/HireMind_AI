import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, GraduationCap, Briefcase, Sparkles, Phone, Mail, FileText, 
  CheckCircle2, ChevronRight, Award, CircleDashed, ArrowLeft,
  Layout, Target, Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PortalLayout from '../../components/layout/PortalLayout';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import Spinner from '../../components/ui/Spinner';
import api from '../../api/axios';

const EDUCATION_OPTIONS = ['Lise', 'Ön Lisans', 'Lisans', 'Yüksek Lisans', 'Doktora'];
const EXPERIENCE_OPTIONS = ['Deneyimsiz', '0-1 yıl', '1-3 yıl', '3-5 yıl', '5-10 yıl', '10+ yıl'];

const steps = [
  { id: 'personal', title: 'Kişisel', icon: User, color: 'blue' },
  { id: 'education', title: 'Eğitim', icon: GraduationCap, color: 'purple' },
  { id: 'experience', title: 'Kariyer', icon: Briefcase, color: 'emerald' },
  { id: 'skills', title: 'Yetenekler', icon: Sparkles, color: 'amber' }
];

export default function CVFormPage() {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    educationLevel: '', schoolDepartment: '', experienceLevel: '',
    lastPosition: '', skills: '', about: ''
  });
  const [activeStep, setActiveStep] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const calculateCompleteness = () => {
    let score = 0;
    if (form.fullName) score += 15;
    if (form.email) score += 15;
    if (form.phone) score += 10;
    if (form.educationLevel && form.schoolDepartment) score += 20;
    if (form.experienceLevel) score += 15;
    if (form.skills) score += 15;
    if (form.about) score += 10;
    return score;
  };

  const completeness = calculateCompleteness();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const { data } = await api.get('/cv/me');
        if (data.cv) {
          setForm({
            fullName: data.cv.fullName || '',
            email: data.cv.email || '',
            phone: data.cv.phone || '',
            educationLevel: data.cv.educationLevel || '',
            schoolDepartment: data.cv.schoolDepartment || '',
            experienceLevel: data.cv.experienceLevel || '',
            lastPosition: data.cv.lastPosition || '',
            skills: data.cv.skills || '',
            about: data.cv.about || ''
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchCV();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (completeness < 70) {
      setError('Lütfen işe alım şansınızı artırmak için profilinizi en az %70 oranında tamamlayın.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.post('/cv', form);
      setSuccess('Özgeçmişiniz yapay zeka ile şifrelendi ve kaydedildi!');
      setTimeout(() => navigate('/candidate/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'CV kaydedilemedi');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-5 py-3.5 text-sm bg-white dark:bg-slate-900/60 text-gray-900 dark:text-slate-100 border border-gray-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-slate-600 shadow-sm';
  const labelClass = 'block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-2.5 ml-1';

  if (fetchLoading) {
    return (
      <PortalLayout title="Özgeçmiş">
        <div className="flex items-center justify-center h-[60vh]"><Spinner size="lg" /></div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout title="AI Özgeçmiş Tasarlayıcı">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> AI Destekli Profiler
                </span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Kariyer Profilini Tamamla</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">AI Hazırlık Skoru</p>
                <div className="flex items-center gap-3">
                   <div className="w-32 h-2 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${completeness}%` }} className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                   </div>
                   <span className="text-xl font-black text-gray-900 dark:text-white">%{completeness}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="xl:col-span-3 space-y-2 sticky top-24 z-10">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group border text-left ${
                  activeStep === step.id 
                    ? `bg-white dark:bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10` 
                    : `bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-slate-800`
                }`}
              >
                <div className={`w-32 h-auto rounded-xl flex items-center justify-center transition-all duration-300 ${
                  activeStep === step.id 
                    ? `bg-blue-500 text-white shadow-lg` 
                    : `bg-gray-100 dark:bg-slate-800 text-gray-400 group-hover:scale-110`
                }`}>
                  <step.icon className="w-16 h-auto" />
                </div>
                <div className="flex-1">
                   <p className={`text-xs font-black uppercase tracking-widest ${activeStep === step.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-slate-500'}`}>
                      {step.title}
                   </p>
                </div>
                {activeStep === step.id && <ChevronRight className="w-4 h-4 text-blue-500" />}
              </button>
            ))}
            
            <div className="p-6 mt-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white overflow-hidden relative shadow-2xl">
               <Sparkles className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
               <p className="text-xs font-black opacity-60 uppercase tracking-widest mb-2">AI İpucu</p>
               <p className="text-sm font-bold leading-relaxed">Güçlü bir profil, mülakat eşleşme şansınızı %400 artırır!</p>
            </div>
          </div>

          {/* Main Form Content */}
          <div className="xl:col-span-6">
            <AnimatePresence mode="wait">
              {activeStep === 'personal' && (
                <motion.div key="personal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-8 space-y-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-32 h-auto rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <User className="w-16 h-auto" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">Kişisel Bilgileriniz</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className={labelClass}>Tam Adınız</label>
                      <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className={inputClass} placeholder="Örn: Efe Uzun" />
                    </div>
                    <div>
                      <label className={labelClass}>E-posta Adresi</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="efe@gmail.com" />
                    </div>
                    <div>
                      <label className={labelClass}>Telefon Numarası</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="05XX XXX XX XX" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button onClick={() => setActiveStep('education')} className="!px-8 !py-3.5 shadow-xl shadow-blue-500/20">
                      Devam Et <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {activeStep === 'education' && (
                <motion.div key="education" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-8 space-y-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-32 h-auto rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <GraduationCap className="w-16 h-auto" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">Eğitim Hayatınız</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Eğitim Seviyesi</label>
                      <select value={form.educationLevel} onChange={(e) => setForm({ ...form, educationLevel: e.target.value })} className={inputClass}>
                        <option value="">Seçiniz...</option>
                        {EDUCATION_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Okul / Bölüm</label>
                      <input type="text" value={form.schoolDepartment} onChange={(e) => setForm({ ...form, schoolDepartment: e.target.value })} className={inputClass} placeholder="Üniversite Adı" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-between">
                    <Button variant="secondary" onClick={() => setActiveStep('personal')}>Geri Dön</Button>
                    <Button onClick={() => setActiveStep('experience')} className="!px-8 !py-3.5 shadow-xl shadow-blue-500/20">
                      Devam Et <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {activeStep === 'experience' && (
                <motion.div key="experience" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-8 space-y-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-32 h-auto rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <Briefcase className="w-16 h-auto" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">İş Deneyimi</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Deneyim Süresi</label>
                      <select value={form.experienceLevel} onChange={(e) => setForm({ ...form, experienceLevel: e.target.value })} className={inputClass}>
                        <option value="">Seçiniz...</option>
                        {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Son Pozisyonunuz</label>
                      <input type="text" value={form.lastPosition} onChange={(e) => setForm({ ...form, lastPosition: e.target.value })} className={inputClass} placeholder="Örn: Frontend Developer" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-between">
                    <Button variant="secondary" onClick={() => setActiveStep('education')}>Geri Dön</Button>
                    <Button onClick={() => setActiveStep('skills')} className="!px-8 !py-3.5 shadow-xl shadow-blue-500/20">
                      Devam Et <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {activeStep === 'skills' && (
                <motion.div key="skills" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-8 space-y-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-32 h-auto rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <Sparkles className="w-16 h-auto" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">Yetenek ve Vizyon</h2>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>Teknik Beceriler</label>
                      <input type="text" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className={inputClass} placeholder="React, Node.js, Python..." />
                      <p className="text-[10px] font-bold text-amber-600 mt-2 tracking-widest uppercase">Virgülle ayırarak girin</p>
                    </div>
                    <div>
                      <label className={labelClass}>Kariyer Hedefi / Hakkımda</label>
                      <textarea 
                        value={form.about} 
                        onChange={(e) => setForm({ ...form, about: e.target.value.slice(0, 500) })} 
                        className={`${inputClass} min-h-[140px] resize-none`} 
                        placeholder="Kısaca kendinizden ve hedeflerinizden bahsedin..." 
                      />
                      <div className="flex justify-end mt-2"><span className="text-[10px] font-bold text-gray-400">{form.about.length}/500</span></div>
                    </div>
                  </div>
                  <div className="pt-4 flex flex-col gap-3">
                    <div className="flex justify-between">
                      <Button variant="secondary" onClick={() => setActiveStep('experience')}>Geri Dön</Button>
                      <Button onClick={handleSubmit} loading={loading} className="!px-10 !py-3.5 !bg-blue-600 hover:!bg-blue-500 font-black text-lg shadow-2xl shadow-blue-500/40 border-none transition-all hover:scale-[1.03]">
                        Profilimi Şifrele ve Yükle
                      </Button>
                    </div>
                    {error && <Alert variant="error" className="mt-4">{error}</Alert>}
                    {success && <Alert variant="success" className="mt-4">{success}</Alert>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar: AI Analytics Preview */}
          <div className="xl:col-span-3 space-y-6">
            <div className="glass-panel-dark p-6 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full translate-x-12 -translate-y-12" />
              
              <div className="flex justify-center mb-6 pt-4">
                 <div className="relative w-24 h-24">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                      <motion.circle 
                        cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * completeness) / 100}
                        className={`transition-all duration-1000 ${completeness < 70 ? 'text-amber-500' : 'text-emerald-500'}`}
                      />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-black">{completeness}%</span>
                   </div>
                 </div>
              </div>

              <div className="space-y-4 text-center">
                 <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Profil Kalitesi</h4>
                 <div className="space-y-2">
                    {[
                      { l: 'İletişim', v: form.phone && form.email },
                      { l: 'Eğitim', v: form.schoolDepartment },
                      { l: 'Uzmanlık', v: form.skills },
                      { l: 'Analiz', v: form.about.length > 20 },
                    ].map(item => (
                      <div key={item.l} className="flex items-center justify-between px-3 py-2 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{item.l}</span>
                        {item.v ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3 h-3 rounded-full border-2 border-slate-700" />}
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            <div className="glass-panel p-6 bg-blue-50/50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/20">
               <div className="flex items-center gap-3 mb-4">
                  <Rocket className="w-16 h-auto text-blue-500" />
                  <h4 className="text-sm font-bold text-gray-800 dark:text-blue-200">Sırada Ne Var?</h4>
               </div>
               <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-medium"> Profilini tamamladığında HireMind AI seni otomatik olarak dev şirketlerle eşleştirecek ve mülakata alacak.</p>
            </div>
          </div>

        </div>
      </div>
    </PortalLayout>
  );
}
