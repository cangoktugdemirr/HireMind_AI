import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import Modal from '../../components/ui/Modal';
import api from '../../api/axios';

export default function CreateJobPostingPage() {
  const [form, setForm] = useState({ title: '', description: '', requiredSkills: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultModal, setResultModal] = useState(false);
  const [resultJobId, setResultJobId] = useState(null);
  const navigate = useNavigate();

  const inputClass = 'w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

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

  return (
    <DashboardLayout title="Yeni İlan Oluştur">
      <div className="max-w-2xl">
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
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
              <label className={labelClass}>İş Tanımı <span className="text-red-500">*</span></label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={5}
                className={inputClass}
                placeholder="Pozisyonun görev ve sorumlulukları..."
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
                placeholder="React, TypeScript, Node.js, ..."
              />
              <p className="text-xs text-gray-400 mt-1">Virgülle ayırarak yazınız</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" type="button" onClick={() => navigate('/hr/dashboard')} className="flex-1">
              İptal
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              İlanı Yayınla
            </Button>
          </div>
        </form>
      </div>

      {/* İlan Oluşturma Sonucu Modalı */}
      <Modal isOpen={resultModal} onClose={() => {}} title="">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-9 h-9 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">İlan Oluşturuldu!</h2>
          <p className="text-sm text-gray-500 mb-2">
            İlanınız başarıyla yayınlandı.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary-600 mb-6">
            <Loader className="w-4 h-4 animate-spin" />
            Yapay zeka uygun adayları eşleştiriyor...
          </div>
          <div className="flex gap-3 w-full">
            <Button variant="secondary" onClick={() => navigate('/hr/dashboard')} className="flex-1">
              Panele Dön
            </Button>
            {resultJobId && (
              <Button onClick={() => navigate(`/hr/job/${resultJobId}`)} className="flex-1">
                İlanı Görüntüle
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
