import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, AlertCircle, Send, LogOut } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center transition-colors">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error && !interview) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors">
        <Alert variant="error">{error}</Alert>
      </div>
    );
  }

  const questions = interview?.questions || [];
  const answeredCount = answers.filter((a) => a.trim().length > 0).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900/80 dark:backdrop-blur-md border-b border-gray-200 dark:border-slate-700/50 px-6 py-4 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
            <img src="/official_hiremind_logo.png" alt="HireMind" className="w-16 h-auto object-contain" />
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white">HireMind Mülakat</h1>
            <p className="text-xs text-gray-500 dark:text-slate-400">{interview?.jobPostingId?.title || 'Mülakat'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-slate-400 font-medium">{answeredCount}/{questions.length} yanıtlandı</span>
          <button
            onClick={() => setAbandonModal(true)}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Çıkış
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200 dark:bg-slate-800">
        <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 rounded-r-full" style={{ width: `${progress}%` }} />
      </div>

      {error && (
        <div className="px-6 pt-4">
          <Alert variant="error">{error}</Alert>
        </div>
      )}

      <div className="flex flex-1 max-w-6xl mx-auto w-full px-6 py-6 gap-6">
        {/* Ana içerik */}
        <div className="flex-1 flex flex-col">
          <div className="glass-panel p-6 flex-1 flex flex-col">
            {/* Soru numarası ve kategori */}
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center justify-center w-16 h-auto rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-500/20">
                {currentIdx + 1}
              </span>
              <span className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                {currentIdx < 7 ? 'Teknik Soru' : 'Davranışsal Soru'}
              </span>
            </div>

            {/* Soru metni */}
            <p className="text-base font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
              {questions[currentIdx]}
            </p>

            {/* Yanıt alanı */}
            <div className="flex-1 flex flex-col">
              <textarea
                value={answers[currentIdx] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                rows={8}
                className="flex-1 w-full px-4 py-3 text-sm bg-white dark:bg-slate-800/50 text-gray-900 dark:text-slate-100 border border-gray-200 dark:border-slate-700/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-slate-600"
                placeholder="Yanıtınızı buraya yazın..."
              />
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1.5 text-right">{(answers[currentIdx] || '').length} karakter</p>
            </div>

            {/* Navigasyon */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-slate-700/50">
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
          <div className="glass-panel p-4 sticky top-6">
            <h3 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3">Sorular</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, idx) => {
                const isAnswered = answers[idx]?.trim().length > 0;
                const isActive = idx === currentIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : isAnswered
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-500 hover:bg-gray-200 dark:hover:bg-slate-700 border border-transparent'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700/50 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-600" />
                <span className="text-gray-500 dark:text-slate-400">Aktif</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-100 dark:bg-green-500/20 border border-green-200 dark:border-green-500/30" />
                <span className="text-gray-500 dark:text-slate-400">Yanıtlandı</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gray-100 dark:bg-slate-800" />
                <span className="text-gray-500 dark:text-slate-400">Bekliyor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mülakatı Gönder Modalı */}
      <Modal isOpen={submitModal} onClose={() => setSubmitModal(false)} title="Mülakatı Tamamla">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-slate-300">
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
