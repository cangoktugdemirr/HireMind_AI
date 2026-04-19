import { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Bell, Check, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import LiveClock from '../ui/LiveClock';

export default function Header({ title }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[var(--bg-header)] backdrop-blur-xl border-b border-[var(--card-border)] flex items-center justify-between px-6 z-20 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-extrabold text-[var(--text-primary)]">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <LiveClock />
        <div className="h-6 w-px bg-gray-200 dark:bg-slate-700/50"></div>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:text-slate-500 dark:hover:text-amber-400 dark:hover:bg-slate-800/40 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifs(!showNotifs)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all relative ${showNotifs ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:text-slate-500 dark:hover:text-blue-400 dark:hover:bg-slate-800/40'}`}
          >
            <Bell className="w-[18px] h-[18px]" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900"></div>
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 dark:border-slate-700 z-50 overflow-hidden transform origin-top-right transition-all">
              <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Bildirimler</h3>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">Tümünü Okundu İşaretle</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <div className="p-4 border-b border-gray-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer flex gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">Sisteme Hoş Geldiniz!</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">HireMind paneliniz hazır. Menüden ilk işleminizi yapabilirsiniz.</p>
                    <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1.5">Şimdi</p>
                  </div>
                </div>
                <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer flex gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">Veritabanı Senkronizasyonu</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Tüm ilanlar ve veriler başarıyla eşitlendi.</p>
                    <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1.5">10 dk önce</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-gray-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <p className="text-xs font-bold">Tüm Bildirimleri Gör</p>
              </div>
            </div>
          )}
        </div>
        <div className="h-6 w-px bg-gray-200 dark:bg-slate-700/50"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-gray-700 dark:text-slate-200">{user?.name}</p>
            <p className="text-[10px] text-gray-400 dark:text-slate-500">{user?.role === 'hr' ? 'İK Uzmanı' : 'Aday'}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/20 flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
