import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Spinner from '../../components/ui/Spinner';
import Alert from '../../components/ui/Alert';
import api from '../../api/axios';
import { getScoreColor } from '../../utils/scoreColor';

const CircularScore = ({ score, label }) => {
  const color = getScoreColor(score);
  const r = 42;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E5E7EB" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="text-xl font-bold" fill={color} style={{ fontSize: 20, fontWeight: 700 }}>
          {score}
        </text>
      </svg>
      <span className="text-xs font-medium text-gray-600 dark:text-slate-400 text-center">{label}</span>
    </div>
  );
};

export default function CandidateReportPage() {
  const { interviewId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState('');
  const pollRef = useRef(null);
  const navigate = useNavigate();

  const fetchReport = async (isPolling = false) => {
    try {
      const { data } = await api.get(`/reports/interview/${interviewId}`);
      if (data.report) {
        setReport(data.report);
        if (pollRef.current) clearInterval(pollRef.current);
        setPolling(false);
        setLoading(false);
      } else if (!isPolling) {
        setLoading(false);
        setPolling(true);
        pollRef.current = setInterval(() => fetchReport(true), 3000);
      }
    } catch (err) {
      setError('Rapor yüklenemedi');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [interviewId]);

  if (loading) {
    return (
      <DashboardLayout title="Aday Raporu">
        <div className="flex items-center justify-center h-64"><Spinner size="lg" /></div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Aday Raporu">
        <Alert variant="error">{error}</Alert>
      </DashboardLayout>
    );
  }

  if (polling && !report) {
    return (
      <DashboardLayout title="Aday Raporu">
        <div className="max-w-xl mx-auto mt-16 flex flex-col items-center text-center gap-4">
          <Spinner size="lg" />
          <p className="text-base font-medium text-gray-900 dark:text-white">Rapor hazırlanıyor...</p>
          <p className="text-sm text-gray-500 dark:text-slate-400">Yapay zeka mülakat yanıtlarını analiz ediyor. Bu birkaç dakika sürebilir.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Aday Raporu">
      <div className="max-w-3xl space-y-4">
        {/* Geri butonu */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" /> Geri
        </button>

        {/* Aday bilgi kartı */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-32 h-auto rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-lg font-bold shadow">
              {report.candidateName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{report.candidateName}</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400">{report.jobTitle}</p>
            </div>
          </div>

          {/* 3 Puan göstergesi */}
          <div className="flex justify-around py-4">
            <CircularScore score={report.overallScore} label="Genel Uyum" />
            <CircularScore score={report.cvMatchScore} label="CV Eşleşme" />
            <CircularScore
              score={Math.round(report.questionScores.reduce((s, q) => s + q.score, 0) / report.questionScores.length)}
              label="Mülakat Skoru"
            />
          </div>
        </div>

        {/* AI Değerlendirme */}
        <div className="glass-panel p-5 border-blue-500/20 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10">
          <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">Yapay Zeka Değerlendirmesi</h3>
          <p className="text-sm text-blue-800 dark:text-blue-200/80 leading-relaxed">{report.aiEvaluation}</p>
        </div>

        {/* Soru puanları */}
        <div className="glass-panel p-6">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Soru Bazlı Değerlendirme</h3>
          <div className="space-y-4">
            {report.questionScores.map((qs, idx) => (
              <div key={idx} className="border-b border-gray-50 dark:border-slate-700/30 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <p className="text-sm text-gray-700 dark:text-slate-300 flex-1 leading-relaxed">
                    <span className="font-bold text-gray-900 dark:text-white">S{idx + 1}:</span> {qs.question}
                  </p>
                  <span className="text-sm font-bold flex-shrink-0" style={{ color: getScoreColor(qs.score) }}>
                    {qs.score}/100
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-slate-700/50 rounded-full h-1.5 mb-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${qs.score}%`, backgroundColor: getScoreColor(qs.score) }}
                  />
                </div>
                {qs.feedback && (
                  <p className="text-xs text-gray-500 dark:text-slate-400 italic">{qs.feedback}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Güçlü yönler & Gelişim alanları */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Güçlü Yönler</h3>
            <ul className="space-y-2">
              {report.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Gelişim Alanları</h3>
            <ul className="space-y-2">
              {report.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
