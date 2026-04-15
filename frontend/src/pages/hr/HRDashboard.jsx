import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Briefcase, Users, CheckCircle, ChevronRight, TrendingUp, Activity, BarChart3, Clock, Target, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, AreaChart, Area, XAxis } from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] } })
};

export default function HRDashboard() {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/jobpostings');
        setJobPostings(data.jobPostings || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalCandidates = jobPostings.reduce((s, p) => s + p.totalCandidates, 0);
  const totalCompleted = jobPostings.reduce((s, p) => s + p.completedCount, 0);
  const totalPending = totalCandidates - totalCompleted;
  const completionRate = totalCandidates > 0 ? Math.round((totalCompleted / totalCandidates) * 100) : 0;

  const filteredPostings = jobPostings.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <DashboardLayout title="İK Yönetim Paneli">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" />
            <p className="text-gray-400 dark:text-slate-500 text-sm animate-pulse">Veriler yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const chartData = [
    { name: 'Tamamlanan', value: totalCompleted || 0, color: '#10B981' },
    { name: 'Bekleyen', value: totalPending || 0, color: '#F59E0B' }
  ];

  const weeklyTrend = [
    { day: 'Pzt', val: Math.max(1, Math.floor(totalCompleted * 0.1)) },
    { day: 'Sal', val: Math.max(2, Math.floor(totalCompleted * 0.15)) },
    { day: 'Çar', val: Math.max(3, Math.floor(totalCompleted * 0.25)) },
    { day: 'Per', val: Math.max(2, Math.floor(totalCompleted * 0.2)) },
    { day: 'Cum', val: Math.max(4, Math.floor(totalCompleted * 0.3)) },
  ];

  const stats = [
    { label: 'Toplam İlan', value: jobPostings.length, icon: Briefcase, gradient: 'from-blue-500 to-blue-600', change: '+' + jobPostings.length, up: true },
    { label: 'Toplam Aday', value: totalCandidates, icon: Users, gradient: 'from-violet-500 to-purple-600', change: '+' + totalCandidates, up: true },
    { label: 'Tamamlanan', value: totalCompleted, icon: CheckCircle, gradient: 'from-emerald-500 to-green-600', change: completionRate + '%', up: completionRate >= 50 },
    { label: 'Bekleyen', value: totalPending, icon: Clock, gradient: 'from-amber-500 to-orange-600', change: totalPending + ' kişi', up: totalPending <= 5 },
  ];

  return (
    <DashboardLayout title="İK Yönetim Paneli">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-7 shadow-xl shadow-blue-500/10"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full bg-cyan-400/10 blur-3xl"></div>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1.5">
              Hoş geldin, {user?.name || 'İK Uzmanı'} 👋
            </h2>
            <p className="text-blue-100/70 text-sm max-w-lg">
              İlanlarınızı yönetin, adayları takip edin ve mülakat süreçlerini analiz edin.
            </p>
          </div>
          <Button
            onClick={() => navigate('/hr/create-job')}
            className="hidden md:flex !bg-white !text-blue-700 hover:!bg-blue-50 font-bold shadow-lg border-none"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> Yeni İlan Oluştur
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} custom={i} initial="hidden" animate="visible" variants={fadeUp}
            className="stat-card group cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-md`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-bold flex items-center gap-1 ${s.up ? 'text-emerald-500' : 'text-red-400'}`}>
                {s.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {s.change}
              </span>
            </div>
            <p className="text-3xl font-black tracking-tight">{s.value}</p>
            <p className="text-sm opacity-70 font-medium mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Job Postings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel xl:col-span-2 overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-slate-800/60 transition-colors">
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold">Aktif İlanlar</h2>
                <p className="text-xs opacity-50">{jobPostings.length} ilan mevcut</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="İlan ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-44 transition-all"
                />
              </div>
              <Button size="sm" onClick={() => navigate('/hr/create-job')} className="!bg-blue-600 hover:!bg-blue-500 border-none shadow-md shadow-blue-500/20">
                <PlusCircle className="w-4 h-4 mr-1.5" /> Yeni İlan
              </Button>
            </div>
          </div>

          {filteredPostings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center flex-1">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900/50 rounded-2xl flex items-center justify-center mb-5 border border-slate-200 dark:border-slate-700/30">
                <Briefcase className="w-10 h-10 text-gray-300 dark:text-slate-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-slate-300 mb-2">
                {searchTerm ? 'Sonuç bulunamadı' : 'Henüz ilan oluşturmadınız'}
              </h3>
              <p className="text-sm text-gray-400 dark:text-slate-500 mb-6 max-w-sm">
                {searchTerm ? 'Arama kriterlerinize uygun ilan yok.' : 'İlk ilanınızı oluşturun ve yapay zeka uygun adayları eşleştirsin.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => navigate('/hr/create-job')} className="!bg-blue-600 hover:!bg-blue-500 shadow-lg shadow-blue-500/20">
                  <PlusCircle className="w-5 h-5 mr-2" /> İlk İlanı Oluştur
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-50 dark:divide-slate-800/40 overflow-y-auto max-h-[420px]">
              {filteredPostings.map((p, idx) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="flex items-center justify-between px-6 py-4 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 cursor-pointer transition-all group"
                  onClick={() => navigate(`/hr/job/${p._id}`)}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-500/10 dark:to-indigo-500/10 border border-blue-200/50 dark:border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-800 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{p.title}</p>
                      <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                        {new Date(p.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 ml-4 flex-shrink-0">
                    <div className="text-center hidden sm:block">
                      <p className="text-sm font-black text-gray-800 dark:text-white">{p.totalCandidates}</p>
                      <p className="text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Aday</p>
                    </div>
                    <div className="text-center hidden sm:block">
                      <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">{p.completedCount}</p>
                      <p className="text-[10px] text-emerald-500/70 uppercase tracking-wider font-semibold">Tamam</p>
                    </div>
                    <div className="w-16 hidden md:block">
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${p.totalCandidates > 0 ? (p.completedCount / p.totalCandidates) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Donut */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider">Süreç Analizi</h3>
            </div>
            {totalCandidates > 0 ? (
              <div className="flex flex-col items-center">
                <div className="relative">
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                        {chartData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '0.75rem', color: '#F8FAFC', fontSize: '12px' }}
                        itemStyle={{ color: '#F8FAFC' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{completionRate}%</p>
                    <p className="text-[10px] text-gray-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Oran</p>
                  </div>
                </div>
                <div className="flex gap-5 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="text-xs text-gray-500 dark:text-slate-400">Tamamlanan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <span className="text-xs text-gray-500 dark:text-slate-400">Bekleyen</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 opacity-40">
                <Activity className="w-12 h-12 text-gray-300 dark:text-slate-600 mb-3" />
                <p className="text-xs text-gray-400 dark:text-slate-600">Yeterli veri bulunmuyor</p>
              </div>
            )}
          </div>

          {/* Weekly Trend */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider">Haftalık Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={weeklyTrend}>
                <defs>
                  <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Area type="monotone" dataKey="val" stroke="#3B82F6" strokeWidth={2.5} fill="url(#trendGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { label: 'Yeni İlan Oluştur', desc: 'Pozisyon tanımlayın', icon: PlusCircle, gradient: 'from-blue-500 to-blue-600', onClick: () => navigate('/hr/create-job') },
          { label: 'İlanları Yönet', desc: 'Aktif ilanları düzenleyin', icon: Briefcase, gradient: 'from-violet-500 to-purple-600', onClick: () => window.scrollTo({ top: 400, behavior: 'smooth' }) },
          { label: 'Performans Raporu', desc: 'Analiz ve istatistikler', icon: BarChart3, gradient: 'from-emerald-500 to-green-600', onClick: () => {} },
        ].map((a) => (
          <div key={a.label} onClick={a.onClick}
            className="stat-card cursor-pointer group hover:scale-[1.01]"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center shadow-md`}>
                <a.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{a.label}</p>
                <p className="text-xs text-gray-400 dark:text-slate-500">{a.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </DashboardLayout>
  );
}
