import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
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

  const inputClass = 'w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

  if (fetchLoading) {
    return (
      <DashboardLayout title="Özgeçmişim">
        <div className="flex items-center justify-center h-64"><Spinner size="lg" /></div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Özgeçmişim">
      <div className="max-w-2xl">
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}
        {success && <Alert variant="success" className="mb-4">{success}</Alert>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kişisel Bilgiler */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Kişisel Bilgiler</h2>
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
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Eğitim</h2>
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
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Deneyim</h2>
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
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Beceriler ve Hakkımda</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={labelClass}>Beceriler <span className="text-red-500">*</span></label>
                <input type="text" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} required className={inputClass} placeholder="React, Node.js, TypeScript, ..." />
                <p className="text-xs text-gray-400 mt-1">Virgülle ayırarak yazınız</p>
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
                <p className="text-xs text-gray-400 mt-1 text-right">{form.about.length}/500</p>
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
    </DashboardLayout>
  );
}
