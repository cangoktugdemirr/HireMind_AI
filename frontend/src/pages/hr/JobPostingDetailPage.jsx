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

  const handleChangeCandidateStatus = async (candidateId, status) => {
    try {
      await api.patch(`/jobpostings/${id}/candidate`, { candidateId, status });
      const res = await api.get(`/jobpostings/${id}`);
      setData(res.data.jobPosting);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteJob = async () => {
    if(!window.confirm("Bu ilanı tamamen kalıcı olarak silmek istediğinize emin misiniz?")) return;
    try {
      await api.delete(`/jobpostings/${id}`);
      navigate('/hr/dashboard');
    } catch (err) {
      console.error(err);
    }
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
      <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400 mb-6">
        <Link to="/hr/dashboard" className="hover:text-gray-700 dark:hover:text-slate-200">Panelim</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">{data.title}</span>
      </nav>

      <div className="space-y-4">
        {/* İlan özet kartı */}
        <div className="glass-panel p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{data.title}</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                {new Date(data.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="!bg-red-500/10 !text-red-500 hover:!bg-red-500 hover:!text-white border-0 py-1" onClick={handleDeleteJob}>
                İlanı Sil
              </Button>
              <span className="text-sm font-medium text-gray-600 dark:text-slate-300 bg-gray-100 dark:bg-slate-700/50 px-3 py-1.5 rounded-full flex items-center">
                {data.candidates.length} aday
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">İş Tanımı</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{data.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Aranan Beceriler</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-500/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Aday listesi */}
        <div className="glass-panel overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700/50">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Eşleşen Adaylar</h2>
          </div>

          {data.candidates.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center px-4">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Henüz eşleşen aday yok</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">Yapay zeka uygun adayları otomatik olarak eşleştirecek.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-slate-700/50">
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Ad Soyad</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Eğitim</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Deneyim</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Eşleşme</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Durum</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-700/30">
                  {data.candidates.map((c) => (
                    <tr key={c.candidateId} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shadow">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-600 dark:text-slate-400">{c.educationLevel}</td>
                      <td className="px-4 py-4 text-gray-600 dark:text-slate-400">{c.experienceLevel}</td>
                      <td className="px-4 py-4">
                        <span className="font-bold text-gray-900 dark:text-white">%{c.matchScore}</span>
                      </td>
                      <td className="px-4 py-4">
                        <Badge status={c.status} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {c.status === 'pending' && (
                            <>
                              <button onClick={() => handleChangeCandidateStatus(c.candidateId, 'completed')} className="text-xs bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white px-2 py-1.5 rounded transition-colors font-medium">Kabul</button>
                              <button onClick={() => handleChangeCandidateStatus(c.candidateId, 'rejected')} className="text-xs bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white px-2 py-1.5 rounded transition-colors font-medium">Red</button>
                            </>
                          )}
                          {c.interviewId && c.status === 'completed' && (
                            <Button size="sm" variant="secondary" onClick={() => handleViewReport(c.interviewId)}>
                              <FileText className="w-3.5 h-3.5" /> Raporu Gör
                            </Button>
                          )}
                        </div>
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
          <p className="text-sm text-gray-600 dark:text-slate-300">
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
