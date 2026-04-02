import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Briefcase, Users, CheckCircle, ChevronRight } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import api from '../../api/axios';

export default function HRDashboard() {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/jobpostings');
        setJobPostings(data.jobPostings || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const totalCandidates = jobPostings.reduce((s, p) => s + p.totalCandidates, 0);
  const totalCompleted = jobPostings.reduce((s, p) => s + p.completedCount, 0);
  const totalPending = totalCandidates - totalCompleted;

  if (loading) {
    return (
      <DashboardLayout title="Panelim">
        <div className="flex items-center justify-center h-64"><Spinner size="lg" /></div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Panelim">
      {/* Stat kartları */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Toplam İlan', value: jobPostings.length, icon: Briefcase, color: 'text-primary-600', bg: 'bg-primary-50' },
          { label: 'Bekleyen Mülakat', value: totalPending, icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Tamamlanan Mülakat', value: totalCompleted, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' }
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{label}</span>
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* İlanlar */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">İlanlarım</h2>
          <Button size="sm" onClick={() => navigate('/hr/create-job')}>
            <PlusCircle className="w-4 h-4" /> Yeni İlan
          </Button>
        </div>

        {jobPostings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Henüz ilan oluşturmadınız</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              İlk ilanınızı oluşturun ve yapay zeka otomatik olarak uygun adayları eşleştirsin.
            </p>
            <Button onClick={() => navigate('/hr/create-job')}>
              <PlusCircle className="w-4 h-4" /> İlk İlanı Oluştur
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {jobPostings.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/hr/job/${p._id}`)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(p.createdAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{p.totalCandidates}</p>
                    <p className="text-xs text-gray-500">aday</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">{p.completedCount}</p>
                    <p className="text-xs text-gray-500">tamamlandı</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
