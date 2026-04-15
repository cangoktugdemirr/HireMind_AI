import { Moon, Sun, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import LiveClock from '../ui/LiveClock';

export default function Header({ title }) {
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
        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:text-slate-500 dark:hover:text-blue-400 dark:hover:bg-slate-800/40 transition-all relative">
          <Bell className="w-[18px] h-[18px]" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></div>
        </button>
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
