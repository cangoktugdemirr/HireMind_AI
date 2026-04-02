import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ChevronLeft, ChevronRight, AlertCircle, Send, LogOut } from 'lucide-react';
import Spinner from '../../components/ui/Spinner';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import api from '../../api/axios';

export default function InterviewPage() {
  const [interview, setInterview] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitModal, setSubmitModal] = useState(false);
  const [abandonModal, setAbandonModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const { data } = await api.get('/interviews/my');
        if (!data.interview) {
          navigate('/candidate/dashboard');
          return;
        }
        setInterview(data.interview);
        setAnswers(data.interview.answers?.length > 0 ? data.interview.answers : new Array(data.interview.questions.length).fill(''));

        if (data.interview.status === 'pending') {
          await api.post(`/interviews/${data.interview._id}/start`);
        }
        if (data.interview.status === 'completed') {
          navigate('/candidate/dashboard');
        }
      } catch (err) {
        setError('Mülakat yüklenemedi');
      } finally {
        setLoading(false);
      }
    };
    fetchInterview();
  }, []);

  const handleAnswerChange = (value) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIdx] = value;
      return updated;
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await api.post(`/interviews/${interview._id}/submit`, { answers });
      navigate('/candidate/dashboard');
    } catch (err) {
      setError('Mülakat gönderilemedi');
      setSubmitting(false);
    }
  };

  const handleAbandon = async () => {
    try {
      await api.delete(`/interviews/${interview._id}/abandon`);
      navigate('/candidate/dashboard');
    } catch (err) {
      setError('İşlem gerçekleştirilemedi');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error && !interview) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert variant="error">{error}</Alert>
      </div>
    );
  }

  const questions = interview?.questions || [];
  const answeredCount = answers.filter((a) => a.trim().length > 0).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">HireMind AI Mülakat</h1>
            <p className="text-xs text-gray-500">{interview?.jobPostingId?.title || 'Mülakat'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{answeredCount}/{questions.length} yanıtlandı</span>
          <button
            onClick={() => setAbandonModal(true)}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Çıkış
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div className="h-full bg-primary-600 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {error && (
        <div className="px-6 pt-4">
          <Alert variant="error">{error}</Alert>
        </div>
      )}

      <div className="flex flex-1 max-w-6xl mx-auto w-full px-6 py-6 gap-6">
        {/* Ana içerik */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex-1 flex flex-col">
            {/* Soru numarası ve kategori */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
                {currentIdx + 1}
              </span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {currentIdx < 7 ? 'Teknik Soru' : 'Davranışsal Soru'}
              </span>
            </div>

            {/* Soru metni */}
            <p className="text-base font-medium text-gray-900 mb-6 leading-relaxed">
              {questions[currentIdx]}
            </p>

            {/* Yanıt alanı */}
            <div className="flex-1 flex flex-col">
              <textarea
                value={answers[currentIdx] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                rows={8}
                className="flex-1 w-full px-4 py-3 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Yanıtınızı buraya yazın..."
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{(answers[currentIdx] || '').length} karakter</p>
            </div>

            {/* Navigasyon */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <Button
                variant="secondary"
                onClick={() => setCurrentIdx((i) => i - 1)}
                disabled={currentIdx === 0}
              >
                <ChevronLeft className="w-4 h-4" /> Önceki
              </Button>

              {currentIdx === questions.length - 1 ? (
                <Button onClick={() => setSubmitModal(true)}>
                  <Send className="w-4 h-4" /> Mülakatı Tamamla
                </Button>
              ) : (
                <Button onClick={() => setCurrentIdx((i) => i + 1)}>
                  Sonraki <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Soru navigatörü (sağ panel) */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Sorular</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, idx) => {
                const isAnswered = answers[idx]?.trim().length > 0;
                const isActive = idx === currentIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-9 h-9 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : isAnswered
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary-600" />
                <span className="text-gray-500">Aktif</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-100" />
                <span className="text-gray-500">Yanıtlandı</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gray-100" />
                <span className="text-gray-500">Bekliyor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mülakatı Gönder Modalı */}
      <Modal isOpen={submitModal} onClose={() => setSubmitModal(false)} title="Mülakatı Tamamla">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Mülakatı tamamlamak üzeresiniz. Gönderildikten sonra yanıtlarınız değiştirilemez.
          </p>
          {answeredCount < questions.length && (
            <Alert variant="warning" title={`${questions.length - answeredCount} soru yanıtsız`}>
              Tüm soruları yanıtlamanız önerilir.
            </Alert>
          )}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setSubmitModal(false)} className="flex-1">
              Geri Dön
            </Button>
            <Button loading={submitting} onClick={handleSubmit} className="flex-1">
              Gönder
            </Button>
          </div>
        </div>
      </Modal>

      {/* Terk Uyarı Modalı */}
      <Modal isOpen={abandonModal} onClose={() => setAbandonModal(false)} title="Mülakatı Terk Et">
        <div className="space-y-4">
          <Alert variant="warning" title="Dikkat!">
            Mülakatı terk ederseniz verdiğiniz tüm yanıtlar silinecek ve baştan başlamak zorunda kalacaksınız.
          </Alert>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setAbandonModal(false)} className="flex-1">
              Devam Et
            </Button>
            <Button variant="danger" onClick={handleAbandon} className="flex-1">
              Terk Et
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
