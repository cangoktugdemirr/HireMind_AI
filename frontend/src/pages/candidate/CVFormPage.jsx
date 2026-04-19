import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Briefcase, Sparkles, Phone, Mail, FileText, CheckCircle2, ChevronRight, Award, CircleDashed } from 'lucide-react';
import PortalLayout from '../../components/layout/PortalLayout';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import Spinner from '../../components/ui/Spinner';
import api from '../../api/axios';

const EDUCATION_OPTIONS = ['Lise', 'Ön Lisans', 'Lisans', 'Yüksek Lisans', 'Doktora'];
const EXPERIENCE_OPTIONS = ['Deneyimsiz', '0-1 yıl', '1-3 yıl', '3-5 yıl', '5-10 yıl', '10+ yıl'];

export default function CVFormPage() {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    educationLevel: '', schoolDepartment: '', experienceLevel: '',
    lastPosition: '', skills: '', about: ''
  });
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
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.post('/cv', form);
      setSuccess('CV başarıyla kaydedildi!');
      setTimeout(() => navigate('/candidate/dashboard'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'CV kaydedilemedi');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 text-sm bg-white dark:bg-slate-800/50 text-gray-900 dark:text-slate-100 border border-gray-200 dark:border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-slate-600';
  const labelClass = 'block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2';

  if (fetchLoading) {
    return (
      <PortalLayout title="Özgeçmişim">
        <div className="flex items-center justify-center h-64"><Spinner size="lg" /></div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout title="Özgeçmiş Merkezi">
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Sol Taraf: Form */}
        <div className="flex-1 w-full xl:max-w-[800px] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Özgeçmişinizi Oluşturun</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 font-medium">Bu bilgiler, yapay zeka tarafından analiz edilerek sizi en uygun ilanlarla eşleştirecektir.</p>
            </div>
          </div>

          {error && <Alert variant="error">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Kişisel Bilgiler */}
            <div className="glass-panel p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px] -z-10 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 dark:text-white">Kişisel Bilgiler</h2>
                  <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">İletişim Detayları</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelClass}>Ad Soyad <span className="text-red-500">*</span></label>
                  <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required className={inputClass} placeholder="Adınız Soyadınız" />
                </div>
                <div>
                  <label className={labelClass}>E-posta <span className="text-red-500">*</span></label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className={inputClass} placeholder="ornek@email.com" />
                </div>
                <div>
                  <label className={labelClass}>Telefon <span className="text-red-500">*</span></label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required className={inputClass} placeholder="05XX XXX XX XX" />
                </div>
              </div>
            </div>

            {/* Eğitim */}
            <div className="glass-panel p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-[100px] -z-10 group-hover:bg-purple-500/10 transition-colors duration-500"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 dark:text-white">Akademik Geçmiş</h2>
                  <p className="text-xs font-semibold text-purple-500 uppercase tracking-wider">Eğitim Detayları</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Eğitim Seviyesi <span className="text-red-500">*</span></label>
                  <select value={form.educationLevel} onChange={(e) => setForm({ ...form, educationLevel: e.target.value })} required className={inputClass}>
                    <option value="">Seçiniz...</option>
                    {EDUCATION_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Okul / Bölüm <span className="text-red-500">*</span></label>
                  <input type="text" value={form.schoolDepartment} onChange={(e) => setForm({ ...form, schoolDepartment: e.target.value })} required className={inputClass} placeholder="Üniversite Adı / Bölüm" />
                </div>
              </div>
            </div>

            {/* Deneyim */}
            <div className="glass-panel p-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[100px] -z-10 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 dark:text-white">İş Deneyimi</h2>
                  <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Profesyonel Kariyer</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Toplam Deneyim <span className="text-red-500">*</span></label>
                  <select value={form.experienceLevel} onChange={(e) => setForm({ ...form, experienceLevel: e.target.value })} required className={inputClass}>
                    <option value="">Seçiniz...</option>
                    {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Son Pozisyon</label>
                  <input type="text" value={form.lastPosition} onChange={(e) => setForm({ ...form, lastPosition: e.target.value })} className={inputClass} placeholder="Örn: Frontend Developer" />
                </div>
              </div>
            </div>

            {/* Beceriler ve Hakkımda */}
            <div className="glass-panel p-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-[100px] -z-10 group-hover:bg-amber-500/10 transition-colors duration-500"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 dark:text-white">Yetkinlikler</h2>
                  <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Teknik ve Kişisel</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className={labelClass}>Yetkinlikler ve Teknoloji Yığını <span className="text-red-500">*</span></label>
                  <input type="text" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} required className={inputClass} placeholder="React, Node.js, Mülakat Yönetimi, Agile, ..." />
                  <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1.5"><Sparkles className="w-3 h-3"/> Virgülle ayırarak giriniz. Yapay zeka eşleştirmelerinde ana anahtar kelimeler bunlar olacaktır.</p>
                </div>
                <div>
                  <label className={labelClass}>Kariyer Hedefiniz ve Kendiniz Hakkında</label>
                  <textarea
                    value={form.about}
                    onChange={(e) => setForm({ ...form, about: e.target.value.slice(0, 500) })}
                    rows={4}
                    className={inputClass}
                    placeholder="Sizi diğer adaylardan ayıran özellikleriniz nelerdir? Kariyerinizde nereye ulaşmak istiyorsunuz?"
                  />
                  <div className="flex justify-end mt-2">
                     <p className={`text-xs font-bold ${form.about.length >= 500 ? 'text-red-500' : 'text-gray-400 dark:text-slate-500'}`}>{form.about.length}/500</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-slate-800/60 sticky bottom-0 bg-[var(--bg-main)]/90 backdrop-blur-xl p-4 -mx-4 z-20">
              <Button variant="secondary" type="button" onClick={() => navigate('/candidate/dashboard')} className="flex-1 py-4 font-bold text-lg rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800 shadow-sm border-gray-200 dark:border-slate-700">
                Vazgeç
              </Button>
              <Button type="submit" loading={loading} className="flex-[2] py-4 font-black text-lg rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-xl shadow-blue-500/30 border-none transition-all hover:scale-[1.02]">
                Profili Şifrele ve Yükle
              </Button>
            </div>
          </form>
        </div>

        {/* Sağ Taraf: Canlı Önizleme */}
        <div className="w-full xl:w-[450px] sticky top-[100px] space-y-6">
          <div className="glass-panel p-6 bg-gradient-to-b from-blue-500/5 to-transparent">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm tracking-widest text-blue-600 dark:text-blue-400 uppercase">Yapay Zeka Hazırlığı</h3>
                <span className="text-2xl font-black text-gray-900 dark:text-white">{completeness}%</span>
             </div>
             <div className="w-full h-2.5 bg-gray-200 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
                <div 
                   className={`h-full rounded-full transition-all duration-1000 ${completeness === 100 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'}`}
                   style={{ width: `${completeness}%` }}
                ></div>
             </div>
             <p className="text-xs text-center font-medium text-gray-500 dark:text-slate-400 mt-4 leading-relaxed">
               {completeness === 100 
                  ? 'Harika! Profiliniz kusursuz. AI eşleştirmelerinde maksimum görünürlük elde edeceksiniz.' 
                  : `Daha iyi AI eşleşmeleri için profilinizi tamamlayın. Eşleşme oranınız artacak.`}
             </p>
          </div>

          <div className="glass-panel-dark relative overflow-hidden group">
            {/* Önizleme Header */}
            <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="px-6 pb-8 pt-0 relative">
               <div className="flex justify-between items-end -mt-10 mb-4">
                  <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border-4 border-white dark:border-[var(--bg-main)] flex items-center justify-center text-3xl font-black text-blue-600">
                     {form.fullName ? form.fullName.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 mb-2">
                     <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                     <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Live</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <div>
                     <h3 className="text-xl font-black text-white leading-tight">
                        {form.fullName || 'İsim Soyisim'}
                     </h3>
                     <p className="text-sm font-semibold text-blue-400 mt-1">
                        {form.lastPosition || 'Pozisyon belirtilmedi'}
                     </p>
                  </div>

                  <div className="space-y-2 py-4 border-y border-slate-700/50">
                     <div className="flex items-center gap-3 text-sm text-slate-300">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span className="truncate">{form.email || 'E-posta eklenmedi'}</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-300">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span>{form.phone || 'Telefon eklenmedi'}</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-300">
                        <Award className="w-4 h-4 text-slate-500" />
                        <span className="truncate">{form.educationLevel || 'Eğitim'}, {form.experienceLevel || 'Deneyim'}</span>
                     </div>
                  </div>

                  <div>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Uzmanlık Alanları</p>
                     <div className="flex flex-wrap gap-2">
                        {form.skills ? (
                           form.skills.split(',').map((skill, i) => skill.trim() && (
                              <span key={i} className="px-2.5 py-1 text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700 rounded-lg">
                                 {skill.trim()}
                              </span>
                           ))
                        ) : (
                           <div className="flex items-center gap-2 text-xs text-slate-600 italic">
                             <CircleDashed className="w-3.5 h-3.5 animate-spin-slow" /> Yetkinlikler bekleniyor...
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
