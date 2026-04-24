import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Alert from '../components/ui/Alert';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const successMsg = location.state?.successMsg || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      if (data.user.role !== 'candidate') {
        setError('Lütfen kurum personeli için ayrılmış giriş panelini kullanın.');
        setLoading(false);
        return;
      }
      login(data.token, data.user);
      navigate('/candidate/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş yapılamadı');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-slate-900/50 text-slate-100 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600";

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="blob bg-blue-500/20 w-96 h-96 -top-10 -left-10 md:w-[600px] md:h-[600px]"></div>
      <div className="blob bg-purple-500/20 w-96 h-96 bottom-0 right-0 md:w-[600px] md:h-[600px]" style={{ animationDelay: '2s' }}></div>

      <div className="glass-panel-dark w-full max-w-md p-10 relative z-10 border border-white/5 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center mb-4">
            <img src="/logo.png" alt="HireMind Logo" className="w-24 h-24 object-contain drop-shadow-2xl" />
          </div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">HireMind</h1>
          <p className="text-slate-400 text-sm mt-3 font-medium px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center gap-2">
            <LogIn className="w-4 h-4 text-blue-400" /> Aday Giriş Portalı
          </p>
        </div>

        {successMsg && <Alert variant="success" className="mb-4">{successMsg}</Alert>}
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">E-posta</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className={inputClass}
              placeholder="ornek@email.com"
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

          <button type="submit" disabled={loading} className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25">
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-8 mb-4">
          Hesabınız yok mu?{' '}
          <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
            Hemen Aday Kaydı Oluştur
          </Link>
        </p>
        
        <div className="border-t border-slate-800 pt-5">
            <p className="text-center text-xs text-slate-500">
                İK Personeli misiniz?{' '}
                <Link to="/hr-login" className="text-amber-400 font-medium hover:text-amber-300 hover:underline transition-all">
                    Kurumsal Giriş Yapın
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
