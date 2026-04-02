import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, FileText } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import Alert from '../../components/ui/Alert';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import api from '../../api/axios';

export default function JobPostingDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/jobpostings/${id}`);
        setData(res.data.jobPosting);
      } catch (err) {
        setError('İlan yüklenemedi');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleViewReport = (interviewId) => {
    setSelectedInterviewId(interviewId);
    setConfirmModal(true);
  };

  if (loading) {
    return (
      <DashboardLayout title="İlan Detayı">
        <div className="flex items-center justify-center h-64"><Spinner size="lg" /></div>
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout title="İlan Detayı">
        <Alert variant="error">{error || 'İlan bulunamadı'}</Alert>
      </DashboardLayout>
    );
  }

  const skills = data.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <DashboardLayout title={data.title}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link to="/hr/dashboard" className="hover:text-gray-700">Panelim</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{data.title}</span>
      </nav>

      <div className="space-y-4">
        {/* İlan özet kartı */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{data.title}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(data.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {data.candidates.length} aday
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">İş Tanımı</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{data.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Aranan Beceriler</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-2.5 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full border border-primary-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Aday listesi */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Eşleşen Adaylar</h2>
          </div>

          {data.candidates.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center px-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Henüz eşleşen aday yok</p>
              <p className="text-sm text-gray-500">Yapay zeka uygun adayları otomatik olarak eşleştirecek.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ad Soyad</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Eğitim</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Deneyim</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Eşleşme</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Durum</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.candidates.map((c) => (
                    <tr key={c.candidateId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-semibold">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-900">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-600">{c.educationLevel}</td>
                      <td className="px-4 py-4 text-gray-600">{c.experienceLevel}</td>
                      <td className="px-4 py-4">
                        <span className="font-semibold text-gray-900">%{c.matchScore}</span>
                      </td>
                      <td className="px-4 py-4">
                        <Badge status={c.status} />
                      </td>
                      <td className="px-4 py-4">
                        {c.interviewId && c.status === 'completed' && (
                          <Button size="sm" variant="secondary" onClick={() => handleViewReport(c.interviewId)}>
                            <FileText className="w-3.5 h-3.5" /> Raporu Gör
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* HR Onay Modalı */}
      <Modal isOpen={confirmModal} onClose={() => setConfirmModal(false)} title="Raporu Görüntüle">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Bu adayın mülakat raporunu görüntülemek istediğinizi onaylıyor musunuz?
          </p>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setConfirmModal(false)} className="flex-1">
              İptal
            </Button>
            <Button onClick={() => navigate(`/hr/report/${selectedInterviewId}`)} className="flex-1">
              Raporu Aç
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
