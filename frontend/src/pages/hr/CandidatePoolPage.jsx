import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Mail, Phone, Calendar, ChevronRight, Download, GraduationCap, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Spinner from '../../components/ui/Spinner';
import Alert from '../../components/ui/Alert';
import api from '../../api/axios';

export default function CandidatePoolPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data } = await api.get('/cv');
        setCandidates(data.cvs || []);
      } catch (err) {
        setError('Aday havuzu yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter(c => 
    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Aday Havuzu">
      <div className="space-y-6">
        {/* Search & Stats */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-16 h-auto absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="İsim veya yetenek ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/20 outline-none dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-bold text-blue-700 dark:text-blue-300">{candidates.length} Toplam Aday</span>
          </div>
        </div>

        {error && <Alert variant="error">{error}</Alert>}

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="glass-panel py-20 text-center">
            <Users className="w-16 h-16 text-gray-200 dark:text-slate-800 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200">Aday bulunamadı</h3>
            <p className="text-sm text-gray-500 mt-1">Arama kriterlerinizi değiştirmeyi deneyin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCandidates.map((c, idx) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-panel p-6 group hover:border-blue-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-32 h-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-blue-500/20">
                    {c.fullName.charAt(0)}
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    c.isMatched 
                      ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    {c.isMatched ? 'Eşleşti' : 'Bekliyor'}
                  </div>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                  {c.fullName}
                </h3>
                
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400 font-medium">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span>{c.educationLevel} - {c.schoolDepartment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400 font-medium">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span>{c.experienceLevel} {c.lastPosition && `(${c.lastPosition})`}</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.skills.split(',').slice(0, 3).map((skill, sIdx) => (
                    <span key={sIdx} className="px-2 py-1 bg-slate-50 dark:bg-slate-800/50 rounded-md text-[10px] font-semibold text-gray-500 dark:text-slate-400 border border-gray-100 dark:border-slate-700/50">
                      {skill.trim()}
                    </span>
                  ))}
                  {c.skills.split(',').length > 3 && (
                    <span className="px-2 py-1 bg-slate-50 dark:bg-slate-800/50 rounded-md text-[10px] font-semibold text-gray-400">
                      +{c.skills.split(',').length - 3} daha
                    </span>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-800/60 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all">
                    Detayı Gör <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
