import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Briefcase, Sparkles } from 'lucide-react';
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
    <PortalLayout title="Özgeçmişim">
      <div className="max-w-2xl">
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}
        {success && <Alert variant="success" className="mb-4">{success}</Alert>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kişisel Bilgiler */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                <User className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              </div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Kişisel Bilgiler</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
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
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center border border-purple-500/20">
                <GraduationCap className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              </div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Eğitim</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
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
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center border border-green-500/20">
                <Briefcase className="w-5 h-5 text-green-500 dark:text-green-400" />
              </div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Deneyim</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
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
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center border border-cyan-500/20">
                <Sparkles className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
              </div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Beceriler ve Hakkımda</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={labelClass}>Beceriler <span className="text-red-500">*</span></label>
                <input type="text" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} required className={inputClass} placeholder="React, Node.js, TypeScript, ..." />
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1.5">Virgülle ayırarak yazınız</p>
              </div>
              <div>
                <label className={labelClass}>Hakkımda</label>
                <textarea
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value.slice(0, 500) })}
                  rows={4}
                  className={inputClass}
                  placeholder="Kendinizi kısaca tanıtın..."
                />
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1.5 text-right">{form.about.length}/500</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" type="button" onClick={() => navigate('/candidate/dashboard')} className="flex-1">
              İptal
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              Kaydet
            </Button>
          </div>
        </form>
      </div>
    </PortalLayout>
  );
}
