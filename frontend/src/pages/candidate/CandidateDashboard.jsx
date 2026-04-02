import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, CheckCircle, AlertCircle, Briefcase, ArrowRight } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Alert from '../../components/ui/Alert';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Spinner from '../../components/ui/Spinner';
import api from '../../api/axios';

export default function CandidateDashboard() {
  const [cv, setCv] = useState(null);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startModal, setStartModal] = useState(false);
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <DashboardLayout title="Panelim">
        <div className="flex items-center justify-center h-64">
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  // STATE 1 — CV yok
  if (!cv) {
    return (
      <DashboardLayout title="Panelim">
        <div className="max-w-2xl">
          <Alert variant="warning" title="CV'niz henüz doldurulmamış" className="mb-6">
            İş ilanlarıyla eşleşebilmek için önce özgeçmişinizi doldurmanız gerekiyor.
          </Alert>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-semibold text-gray-900 mb-1">Özgeçmişinizi Oluşturun</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Bilgilerinizi girerek yapay zeka destekli iş eşleştirme sistemine dahil olun.
                </p>
                <Button onClick={() => navigate('/candidate/cv')}>
                  CV Oluştur <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // STATE 2 — CV var, mülakat yok
  if (!interview) {
    return (
      <DashboardLayout title="Panelim">
        <div className="max-w-2xl space-y-4">
          <Alert variant="success" title="CV'niz kaydedildi">
            Özgeçmişiniz sisteme eklendi. Uygun bir iş ilanı oluşturulduğunda otomatik olarak eşleştirileceksiniz.
          </Alert>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-semibold text-gray-900">Eşleşme Bekleniyor</h2>
            </div>
            <p className="text-sm text-gray-500">
              İK uzmanları iş ilanı oluşturduğunda yapay zeka CV'nizi değerlendirerek uygun pozisyonlarla eşleştirecek.
              Bu işlem otomatik olarak gerçekleşir, herhangi bir işlem yapmanıza gerek yok.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">CV Özeti</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">Ad Soyad:</span> <span className="font-medium">{cv.fullName}</span></div>
              <div><span className="text-gray-500">Eğitim:</span> <span className="font-medium">{cv.educationLevel}</span></div>
              <div><span className="text-gray-500">Deneyim:</span> <span className="font-medium">{cv.experienceLevel}</span></div>
              <div><span className="text-gray-500">Bölüm:</span> <span className="font-medium">{cv.schoolDepartment}</span></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // STATE 3 — Bekleyen/devam eden mülakat
  if (interview.status === 'pending' || interview.status === 'in_progress') {
    return (
      <DashboardLayout title="Panelim">
        <div className="max-w-2xl space-y-4">
          <Alert variant="info" title="Mülakatınız hazır!">
            Yapay zeka sizi bir pozisyonla eşleştirdi. Mülakatınıza başlayabilirsiniz.
          </Alert>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-semibold text-gray-900">
                    {interview.jobPostingId?.title || 'Pozisyon'}
                  </h2>
                  <Badge status={interview.status} />
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  10 soruluk mülakat sizi bekliyor. Mülakatı tek seferde tamamlamanız gerekmektedir.
                </p>
                <Button onClick={() => setStartModal(true)}>
                  Mülakata Başla <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mülakat Başlatma Onay Modalı */}
        <Modal isOpen={startModal} onClose={() => setStartModal(false)} title="Mülakata Başla">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Mülakatı başlatmak üzeresiniz. Lütfen aşağıdaki bilgileri dikkate alın:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                Mülakat <strong>10 sorudan</strong> oluşmaktadır.
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                Mülakatı tek seferde tamamlamanız önerilir.
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                Yanıtlarınız yapay zeka tarafından değerlendirilecektir.
              </li>
            </ul>
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={() => setStartModal(false)} className="flex-1">
                Vazgeç
              </Button>
              <Button onClick={() => navigate('/candidate/interview')} className="flex-1">
                Başla
              </Button>
            </div>
          </div>
        </Modal>
      </DashboardLayout>
    );
  }

  // STATE 4 — Tamamlandı
  return (
    <DashboardLayout title="Panelim">
      <div className="max-w-2xl space-y-4">
        <Alert variant="success" title="Mülakatınız tamamlandı!">
          Yanıtlarınız değerlendiriliyor. Rapor hazır olduğunda İK uzmanı tarafından incelenecektir.
        </Alert>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h2 className="text-base font-semibold text-gray-900">Mülakat Tamamlandı</h2>
            <Badge status="completed" />
          </div>
          <p className="text-sm text-gray-500">
            <strong>{interview.jobPostingId?.title || 'Pozisyon'}</strong> için mülakatınız başarıyla tamamlandı.
            Yapay zeka yanıtlarınızı analiz ederek bir rapor hazırlayacak.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
