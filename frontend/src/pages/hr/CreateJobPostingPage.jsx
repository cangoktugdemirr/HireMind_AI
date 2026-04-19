import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader, Briefcase, MapPin, Clock, Sparkles, Building2, ChevronRight } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import Modal from '../../components/ui/Modal';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function CreateJobPostingPage() {
  const [form, setForm] = useState({ title: '', description: '', requiredSkills: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultModal, setResultModal] = useState(false);
  const [resultJobId, setResultJobId] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const inputClass = 'w-full px-4 py-3.5 text-sm bg-white dark:bg-slate-900/60 text-gray-900 dark:text-slate-100 border border-gray-200 dark:border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 shadow-sm';
  const labelClass = 'block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/jobpostings', form);
      setResultJobId(data.jobPostingId);
      setResultModal(true);
    } catch (err) {
      setError(err.response?.data?.message || 'İlan oluşturulamadı');
    } finally {
      setLoading(false);
    }
  };

  const skillArray = form.requiredSkills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <DashboardLayout title="Yeni İlan Oluştur">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Sol Taraf: Form */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">İlan Detayları</h2>
          </div>

          {error && <Alert variant="error" className="mb-4">{error}</Alert>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-panel p-6 sm:p-8 space-y-6 bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-slate-700/50 shadow-sm rounded-2xl relative overflow-hidden">
              {/* Dekoratif Arkaplan */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>

              <div>
                <label className={labelClass}>Pozisyon Başlığı <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className={inputClass}
                  placeholder="Örn: Senior Frontend Developer"
                />
              </div>

              <div>
                <label className={labelClass}>
                  İş Tanımı <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={6}
                  className={`${inputClass} resize-none`}
                  placeholder="Pozisyonun görev ve sorumlulukları, ekibiniz hakkında bilgiler..."
                />
              </div>

              <div>
                <label className={labelClass}>Aranan Beceriler <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.requiredSkills}
                  onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })}
                  required
                  className={inputClass}
                  placeholder="Örn: React, TypeScript, Node.js"
                />
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                  Becerileri virgül (,) ile ayırarak yazınız. Aday eşleştirme yapay zekası bu becerileri baz alacaktır.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <Button variant="secondary" type="button" onClick={() => navigate('/hr/dashboard')} className="flex-1 py-3.5 text-base rounded-xl font-semibold">
                İptal Et
              </Button>
              <Button type="submit" loading={loading} className="flex-[2] py-3.5 text-base rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" /> İlanı Yayınla ve Eşleştirmeyi Başlat
              </Button>
            </div>
          </form>
        </div>

        {/* Sağ Taraf: Canlı Önizleme */}
        <div className="hidden xl:block xl:col-span-1">
          <div className="sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Canlı Önizleme</h2>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 font-medium">Adaylar bu ilanı nasıl görecek?</p>
            
            {/* Önizleme Kartı */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm group hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-20">
                <Briefcase className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center shadow-inner border border-white/20 dark:border-slate-500/20">
                      <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                        {form.title || 'Pozisyon Başlığı'}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mt-0.5">
                        Şirketiniz ({user?.name || 'İK Gözünden'})
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-5 text-xs text-gray-600 dark:text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-slate-900/50 px-2.5 py-1 rounded-md border border-gray-100 dark:border-slate-700/50">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> Tam Zamanlı
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-slate-900/50 px-2.5 py-1 rounded-md border border-gray-100 dark:border-slate-700/50">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> Yeni Yayınlandı
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">Aranan Beceriler</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillArray.length > 0 ? (
                      skillArray.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 rounded-lg text-xs font-semibold shadow-sm">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <>
                        <div className="h-6 w-16 bg-gray-100 dark:bg-slate-700/50 rounded animate-pulse"></div>
                        <div className="h-6 w-24 bg-gray-100 dark:bg-slate-700/50 rounded animate-pulse"></div>
                        <div className="h-6 w-20 bg-gray-100 dark:bg-slate-700/50 rounded animate-pulse"></div>
                      </>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-slate-700/50 pt-4">
                  <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {form.description || 'Adaylar ilanınıza tıkladığında göreceği iş tanımı ve detayları burada 3 satırlık bir özet halinde yer alacak. Devamını görmek için "İncele" butonuna tıklayacaklar...'}
                  </p>
                </div>
                
                <div className="mt-5 pt-4 border-t border-gray-50 dark:border-slate-700/30 flex justify-between items-center">
                    <div className="text-xs text-gray-400 font-medium">Büyük potansiyelli adaylara ulaşın</div>
                    <div className="flex items-center gap-1 text-blue-500 text-sm font-bold opacity-50">
                        Başvur <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
              </div>
            </div>
            
            {/* AI Bilgi Kutusu */}
            <div className="mt-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-2 -mr-2 text-indigo-500/20">
                    <Sparkles className="w-16 h-16" />
                </div>
                <div className="flex gap-3 relative z-10">
                    <div className="mt-0.5">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 mb-1">Yapay Zeka Destekli</h4>
                        <p className="text-xs text-indigo-800/80 dark:text-indigo-200/70 leading-relaxed">
                            İlanı yayınladığınız an, HireMind yapay zekası mevcut CV havuzunu tarayarak aradığınız becerilere en uygun adayları saniyeler içinde sizin için eşleştirecektir.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>

      </div>

      {/* İlan Oluşturma Sonucu Modalı */}
      <Modal isOpen={resultModal} onClose={() => {}} title="">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-3xl flex items-center justify-center mb-5 border border-green-200 dark:border-green-500/30 shadow-inner">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">Başarıyla Yayınlandı!</h2>
          <p className="text-base text-gray-500 dark:text-slate-400 mb-2">
            İlanınız anında aday portalına eklendi.
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-8 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-full">
            <Loader className="w-4 h-4 animate-spin" />
            Yapay zeka ideal adayları eşleştiriyor...
          </div>
          <div className="flex gap-3 w-full">
            <Button variant="secondary" onClick={() => navigate('/hr/dashboard')} className="flex-1 py-3 text-base">
              Panele Dön
            </Button>
            {resultJobId && (
              <Button onClick={() => navigate(`/hr/job/${resultJobId}`)} className="flex-1 py-3 text-base shadow-lg shadow-blue-500/25">
                İlanı Görüntüle
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
