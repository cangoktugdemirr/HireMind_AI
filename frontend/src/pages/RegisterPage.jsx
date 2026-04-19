import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Alert from '../components/ui/Alert';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', passwordConfirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.passwordConfirm) {
      setError('Şifreler eşleşmiyor');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'candidate'
      });
      // Artık otomatik giriş yapmıyoruz! Direkt login sayfasına atıyoruz
      navigate('/login', { state: { successMsg: 'Kayıt başarılı! Lütfen giriş yapınız.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Kayıt olunamadı');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-slate-900/50 text-slate-100 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600";

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="blob bg-purple-500/20 w-96 h-96 -top-10 -left-10"></div>
      <div className="blob bg-blue-500/20 w-96 h-96 bottom-0 right-0" style={{ animationDelay: '2s' }}></div>

      <div className="glass-panel-dark w-full max-w-md p-10 relative z-10 border border-white/5 shadow-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center mb-4">
            <img src="/logo.svg" alt="HireMind Logo" className="w-16 h-16 object-contain drop-shadow-xl" />
          </div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 tracking-tight">HireMind</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Aday Kayıt Sistemi</p>
        </div>

        {/* Bilgilendirme */}
        <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 mb-6">
          <UserPlus className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <p className="text-xs text-blue-300 leading-relaxed">
            Bu sayfa <strong>adaylar</strong> içindir. İK uzmanı olarak giriş yapmak için{' '}
            <Link to="/login" className="underline font-semibold text-blue-400 hover:text-blue-300">Kurumsal Giriş</Link> kullanın.
          </p>
        </div>

        {error && <Alert variant="error" className="mb-4">{error}</Alert>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Ad Soyad</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className={inputClass}
              placeholder="Adınız Soyadınız"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Şifre Tekrar</label>
            <input
              type="password"
              value={form.passwordConfirm}
              onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
              required
              className={inputClass}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25">
            {loading ? 'Hesap Oluşturuluyor...' : 'Hemen Başla'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6 md:mt-8">
          Zaten hesabınız var mı?{' '}
          <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
