import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, LogOut, Users, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 shadow-sm'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-slate-400 dark:hover:bg-slate-800/40 dark:hover:text-white border border-transparent'
      }`
    }
  >
    <Icon className="w-16 h-auto" />
    {label}
  </NavLink>
);

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col bg-[var(--bg-sidebar)] border-r border-[var(--card-border)] z-30 transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-[var(--card-border)]">
          <img src="/official_hiremind_logo.png" alt="HireMind" className="w-32 h-auto object-contain" />
        <div>
          <span className="text-lg font-extrabold text-[var(--text-primary)] tracking-tight block leading-tight">HireMind</span>
          <span className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-[0.2em]">{user?.role === 'hr' ? 'İK Paneli' : 'Aday Portalı'}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1.5">
        <p className="px-4 mb-3 text-[10px] text-gray-400 dark:text-slate-600 font-bold uppercase tracking-[0.2em]">Menü</p>
        {user?.role === 'candidate' ? (
          <>
            <NavItem to="/candidate/dashboard" icon={LayoutDashboard} label="Panelim" />
            <NavItem to="/candidate/cv" icon={FileText} label="Özgeçmişim" />
          </>
        ) : (
          <>
            <NavItem to="/hr/dashboard" icon={LayoutDashboard} label="Panelim" />
            <NavItem to="/hr/create-job" icon={PlusCircle} label="Yeni İlan Oluştur" />
            <NavItem to="/hr/candidates" icon={Users} label="Aday Havuzu" />
            <div className="pt-2 mt-2 border-t border-gray-100 dark:border-slate-800/40">
              <NavItem to="/hr/settings" icon={Settings} label="Ayarlar" />
            </div>
          </>
        )}
      </nav>

      {/* Logout Action */}
      <div className="px-3 pb-6 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 border border-transparent transition-all"
        >
          <LogOut className="w-16 h-auto" />
          Güvenli Çıkış
        </button>
      </div>
    </aside>
  );
}
