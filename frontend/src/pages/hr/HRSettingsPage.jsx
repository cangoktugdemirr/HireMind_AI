import React, { useState } from 'react';
import { Lock, Save, ShieldCheck, Mail, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function HRSettingsPage() {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'Yeni şifreler eşleşmiyor.' });
      return;
    }
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await api.post('/auth/change-password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      setMessage({ type: 'success', text: 'Şifreniz başarıyla güncellendi.' });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Şifre güncellenemedi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Ayarlar">
      <div className="max-w-4xl mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-slate-800/60 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900/20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              Hesap ve Güvenlik
            </h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Hesap bilgilerinizi yönetin ve güvenliğinizi sağlayın.</p>
          </div>

          <div className="p-8 space-y-10">
            {/* Profile Info (Read Only) */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider">Profil Bilgileri</h3>
                <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">Temel hesap bilgileriniz.</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-slate-800/50">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Ad Soyad</p>
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">{user?.name}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-slate-800/50">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">E-posta</p>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-100 dark:border-slate-800/60" />

            {/* Password Change */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider">Şifre Değiştir</h3>
                <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">Güvenliğiniz için düzenli şifre değişikliği öneririz.</p>
              </div>
              <div className="md:col-span-2">
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  {message.text && (
                    <Alert variant={message.type === 'error' ? 'error' : 'success'}>
                      {message.text}
                    </Alert>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-2">Mevcut Şifre</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          required
                          value={passwords.currentPassword}
                          onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 outline-none transition-all dark:text-white"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-2">Yeni Şifre</label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="password"
                            required
                            minLength={6}
                            value={passwords.newPassword}
                            onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 outline-none transition-all dark:text-white"
                            placeholder="Yeni şifre"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-2">Yeni Şifre (Yeniden)</label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="password"
                            required
                            minLength={6}
                            value={passwords.confirmPassword}
                            onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 outline-none transition-all dark:text-white"
                            placeholder="Yeni şifre onay"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      loading={loading}
                      className="w-full sm:w-auto px-8"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Geri Dön
                    </Button>
                    <Button 
                      type="submit" 
                      loading={loading}
                      className="w-full sm:w-auto px-8 ml-2"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Değişiklikleri Kaydet
                    </Button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
