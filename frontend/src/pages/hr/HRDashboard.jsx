import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Briefcase, Users, CheckCircle, ChevronRight, TrendingUp, Activity, BarChart3, Clock, Target, ArrowUpRight, ArrowDownRight, Search, Calendar, MessageSquare, Star } from 'lucide-react';
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
  const [dashboardStats, setDashboardStats] = useState({ upcomingInterviews: [], recentActivities: [] });
  const [recentCVs, setRecentCVs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, statsRes, cvRes] = await Promise.all([
          api.get('/jobpostings'),
          api.get('/jobpostings/dashboard-stats'),
          api.get('/cv')
        ]);
        setJobPostings(jobsRes.data.jobPostings || []);
        setDashboardStats(statsRes.data || { upcomingInterviews: [], recentActivities: [] });
        setRecentCVs(cvRes.data.cvs?.slice(0, 5) || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statsData = dashboardStats.stats || { totalPostings: 0, totalCandidates: 0, completedCount: 0, pendingCount: 0, totalPoolCandidates: 0 };
  const completionRate = statsData.totalCandidates > 0 ? Math.round((statsData.completedCount / statsData.totalCandidates) * 100) : 0;

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
    { name: 'Tamamlanan', value: statsData.completedCount || 0, color: '#10B981' },
    { name: 'Bekleyen', value: statsData.pendingCount || 0, color: '#F59E0B' }
  ];

  const weeklyTrend = [
    { day: 'Pzt', val: Math.max(1, Math.floor(statsData.completedCount * 0.1)) },
    { day: 'Sal', val: Math.max(2, Math.floor(statsData.completedCount * 0.15)) },
    { day: 'Çar', val: Math.max(3, Math.floor(statsData.completedCount * 0.25)) },
    { day: 'Per', val: Math.max(2, Math.floor(statsData.completedCount * 0.2)) },
    { day: 'Cum', val: Math.max(4, Math.floor(statsData.completedCount * 0.3)) },
  ];

  const stats = [
    { label: 'Aktif İlan', value: statsData.totalPostings, icon: Briefcase, gradient: 'from-blue-500 to-blue-600', change: '+' + statsData.totalPostings, up: true },
    { label: 'Eşleşen Aday', value: statsData.totalCandidates, icon: Users, gradient: 'from-violet-500 to-purple-600', change: '+' + statsData.totalCandidates, up: true },
    { label: 'Tamamlanan', value: statsData.completedCount, icon: CheckCircle, gradient: 'from-emerald-500 to-green-600', change: completionRate + '%', up: completionRate >= 50 },
    { label: 'Bekleyen', value: statsData.pendingCount, icon: Clock, gradient: 'from-amber-500 to-orange-600', change: statsData.pendingCount + ' kişi', up: statsData.pendingCount <= 5 },
  ];

  return (
    <DashboardLayout title="İK Yönetim Paneli">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            Hoş geldin, {user?.name || 'İK Uzmanı'} 👋
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-500 font-medium mt-1">İş alım süreçlerinizi ve aday performanslarını buradan takip edin.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => navigate('/hr/create-job')} className="!bg-blue-600 hover:!bg-blue-500 shadow-lg shadow-blue-500/20 py-2.5 rounded-xl font-bold">
            <PlusCircle className="w-4 h-4 mr-2" /> Yeni İlan Yayınla
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Aktif İlan', value: statsData.totalPostings, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-500/10', trend: '+' + statsData.totalPostings },
          { label: 'Eşleşmiş Aday', value: statsData.totalCandidates, icon: Users, color: 'text-violet-600', bg: 'bg-violet-500/10', trend: statsData.totalPoolCandidates + ' havuz' },
          { label: 'Görüşülecek', value: statsData.pendingCount, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-500/10', trend: 'Mülakat bekleyen' },
          { label: 'Tamamlanan', value: statsData.completedCount, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-500/10', trend: completionRate + '% oran' },
        ].map((s, i) => (
          <motion.div key={s.label} custom={i} initial="hidden" animate="visible" variants={fadeUp}
            className="glass-panel p-6 group hover:border-blue-500/40 transition-all cursor-default"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-16 h-auto rounded-2xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest">{s.trend}</div>
            </div>
            <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{s.value}</p>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider mt-1">{s.label}</p>
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
            <div className="w-16 h-auto rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <Briefcase className="w-16 h-auto text-white" />
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
            </div>
          </div>

          {filteredPostings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center flex-1">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900/50 rounded-2xl flex items-center justify-center mb-5 border border-slate-200 dark:border-slate-700/30 shadow-inner">
                <Briefcase className="w-16 h-auto text-gray-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200 mb-2">
                {searchTerm ? 'Sonuç bulunamadı' : 'Henüz İlan Oluşturmadınız'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 max-w-sm">
                {searchTerm ? 'Arama kriterlerinize uygun ilan yok.' : 'Yeni ilanlarınızı soldaki menüden oluşturabilir ve aday arayışını başlatabilirsiniz.'}
              </p>
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
                    <div className="w-16 h-auto rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-500/10 dark:to-indigo-500/10 border border-blue-200/50 dark:border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Target className="w-16 h-auto text-blue-600 dark:text-blue-400" />
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
                    <ChevronRight className="w-16 h-auto text-gray-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
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
            {statsData.totalCandidates > 0 ? (
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
                <Activity className="w-16 h-auto text-gray-300 dark:text-slate-600 mb-3" />
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

      {/* İkincil Araçlar (Mülakatlar ve Aktivite) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Yaklaşan Mülakatlar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-panel p-0 overflow-hidden">
             <div className="p-6 border-b border-gray-100 dark:border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">
                     <Calendar className="w-16 h-auto text-orange-600 dark:text-orange-400" />
                   </div>
                   <h3 className="text-base font-bold text-gray-900 dark:text-white">Yaklaşan Mülakatlar</h3>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold cursor-pointer">Tümünü Gör</span>
             </div>
             <div className="divide-y divide-gray-50 dark:divide-slate-800/40 min-h-[300px]">
                {dashboardStats.upcomingInterviews.length === 0 ? (
                  <div className="p-10 text-center opacity-40">
                    <p className="text-sm">Henüz bekleyen mülakat yok</p>
                  </div>
                ) : (
                  dashboardStats.upcomingInterviews.map((i) => {
                    const dateObj = new Date(i.date);
                    const day = dateObj.toLocaleDateString('tr-TR', { weekday: 'short' });
                    const dayNum = dateObj.getDate();
                    return (
                      <div key={i._id} className="p-5 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors" onClick={() => navigate(`/hr/job/${i._id}`)}>
                          <div className="text-center w-12 flex-shrink-0">
                             <p className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase">{day}</p>
                             <p className="text-xl font-black text-gray-900 dark:text-white leading-none">{dayNum}</p>
                          </div>
                          <div className="w-px h-10 bg-gray-200 dark:bg-slate-700"></div>
                          <div className="flex-1 min-w-0">
                             <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{i.jobTitle}</p>
                             <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                                <span className="flex items-center gap-1 opacity-70"><Clock className="w-3 h-3" /> {i.status}</span>
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {i.candidateName}</span>
                             </p>
                          </div>
                      </div>
                    );
                  })
                )}
             </div>
        </motion.div>

        {/* Aktivite Akışı */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-panel p-6">
             <div className="flex items-center gap-3 mb-6">
                 <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                   <Activity className="w-16 h-auto text-purple-600 dark:text-purple-400" />
                 </div>
                 <h3 className="text-base font-bold text-gray-900 dark:text-white">Son Aktiviteler</h3>
             </div>
             <div className="space-y-6 relative ml-1 min-h-[250px]">
                {dashboardStats.recentActivities.length === 0 ? (
                  <div className="py-10 text-center opacity-40">
                    <p className="text-sm">Henüz aktivite bulunmuyor</p>
                  </div>
                ) : (
                  dashboardStats.recentActivities.map((act) => {
                    const icons = {
                      matched: { icon: Star, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/20' },
                      completed: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-500/20' }
                    };
                    const config = icons[act.type] || { icon: Activity, color: 'text-blue-500', bg: 'bg-blue-100' };
                    return (
                      <div key={act.id} className="relative flex items-center gap-4 group">
                          <div className={`flex items-center justify-center w-16 h-auto rounded-full border border-white dark:border-slate-800 ${config.bg} shadow shrink-0 z-10`}>
                              <config.icon className={`w-4 h-4 ${config.color}`} />
                          </div>
                          <div className="flex-1 bg-gray-50 dark:bg-slate-800/40 p-3 rounded-xl border border-gray-100 dark:border-slate-700/50 hover:border-gray-200 dark:hover:border-slate-600 transition-colors">
                              <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-sm text-gray-900 dark:text-white">{act.title}</span>
                                  <span className="text-[10px] text-gray-400 font-semibold">{new Date(act.time).toLocaleDateString('tr-TR')}</span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-medium">{act.desc}</div>
                          </div>
                      </div>
                    );
                  })
                ) }
             </div>
        </motion.div>
      </div>

      {/* Son Başvuranlar (YENİ EKLEDİĞİMİZ KISIM - OTOMATİK SENKRONİZE ÇALIŞIR) */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-panel overflow-hidden mb-10">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-800/60 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-16 h-auto rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Users className="w-16 h-auto text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Son Başvuran Adaylar</h3>
                <p className="text-xs text-gray-400 dark:text-slate-500">Sisteme yeni düşen tüm aday profilleri</p>
              </div>
           </div>
           <button onClick={() => navigate('/hr/candidates')} className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline">Aday Havuzuna Git</button>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-slate-800/40">
           {recentCVs.length === 0 ? (
             <div className="p-12 text-center opacity-40 italic text-sm">Henüz yeni bir aday başvurusu bulunmuyor.</div>
           ) : (
             recentCVs.map((cv) => (
               <div key={cv._id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-auto rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                       {cv.fullName?.charAt(0)}
                     </div>
                     <div>
                       <p className="text-sm font-bold text-gray-900 dark:text-white">{cv.fullName}</p>
                       <p className="text-xs text-gray-400 dark:text-slate-500">{cv.experienceLevel} - {cv.schoolDepartment}</p>
                     </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${cv.isMatched ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10' : 'bg-amber-100 text-amber-600 dark:bg-amber-500/10'}`}>
                    {cv.isMatched ? 'Eşleşti' : 'İnceleniyor'}
                  </div>
               </div>
             ))
           )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { label: 'İlanları Yönet', desc: 'Aktif ilanları düzenleyin', icon: Briefcase, gradient: 'from-blue-500 to-blue-600', onClick: () => window.scrollTo({ top: 400, behavior: 'smooth' }) },
          { label: 'Aday Havuzu', desc: 'Tüm adayları inceleyin', icon: Users, gradient: 'from-violet-500 to-purple-600', onClick: () => navigate('/hr/candidates') },
          { label: 'Performans Raporu', desc: 'Analiz ve istatistikler', icon: BarChart3, gradient: 'from-emerald-500 to-green-600', onClick: () => {} },
        ].map((a) => (
          <div key={a.label} onClick={a.onClick}
            className="stat-card cursor-pointer group hover:scale-[1.01]"
          >
            <div className="flex items-center gap-4">
              <div className={`w-16 h-auto rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center shadow-md`}>
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
