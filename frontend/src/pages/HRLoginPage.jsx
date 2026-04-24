import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Alert from '../components/ui/Alert';

export default function HRLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      if (data.user.role !== 'hr') {
        setError('Bu panel yalnızca İK personelleri içindir. Lütfen aday girişi yapın.');
        setLoading(false);
        return;
      }
      login(data.token, data.user);
      navigate('/hr/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş yapılamadı');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-slate-900/50 text-slate-100 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-slate-600";

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="blob bg-blue-500/20 w-96 h-96 -top-10 -left-10 md:w-[500px] md:h-[500px]"></div>
      <div className="blob bg-cyan-500/10 w-96 h-96 bottom-0 right-0 md:w-[600px] md:h-[600px]" style={{ animationDelay: '2s' }}></div>

      <div className="glass-panel-dark w-full max-w-md p-10 relative z-10 border border-white/5 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
            <img src="/official_hiremind_logo.png" alt="HireMind Logo" className="w-28 h-auto object-contain drop-shadow-2xl" />
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-500 tracking-tight">HireMind</h1>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500/50"></div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Kurumsal Giriş</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-500/50"></div>
        </div>

        <p className="text-center text-slate-400 text-xs mb-6 leading-relaxed">
          Bu alan <span className="text-blue-400 font-semibold">yalnızca yetkili İK personelleri</span> içindir.<br/>
          Tüm giriş denemeleri kayıt altına alınmaktadır.
        </p>

        {error && <Alert variant="error" className="mb-4">{error}</Alert>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Kullanıcı Adı veya E-posta</label>
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-slate-900/50 text-slate-100 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
              placeholder="Personel Adı / E-posta"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Şifre</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className={`${inputClass} pr-12`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            {loading ? 'Doğrulanıyor...' : 'Güvenli İK Girişi'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6 md:mt-8">
          Aday olarak başvurmak ister misiniz?{' '}
          <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
            Aday Girişi
          </Link>
        </p>

        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5" />
            <span>İzinsiz erişim denemeleri yasal işlemle sonuçlanabilir.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
