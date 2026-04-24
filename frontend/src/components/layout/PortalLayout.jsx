import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, Menu, X, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function PortalLayout({ title, children }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = user?.role === 'candidate'
    ? [
        { to: '/candidate/dashboard', icon: LayoutDashboard, label: 'Portalım' },
        { to: '/candidate/cv', icon: FileText, label: 'Özgeçmişim' },
      ]
    : [
        { to: '/hr/dashboard', icon: LayoutDashboard, label: 'Panelim' },
      ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] font-sans text-[var(--text-primary)] transition-colors duration-300">
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/[0.04] dark:bg-blue-500/[0.03] blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] dark:bg-violet-500/[0.02] blur-[150px]"></div>
      </div>

      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-[var(--bg-header)] backdrop-blur-xl border-b border-[var(--card-border)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <img src="/logo_final.svg" alt="HireMind" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-lg font-extrabold tracking-tight hidden sm:block">HireMind</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/40 hover:text-gray-800 dark:hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:text-slate-500 dark:hover:text-amber-400 dark:hover:bg-slate-800/40 transition-all"
            >
              {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700/50 hidden sm:block"></div>

            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-700 dark:text-slate-200">{user?.name}</p>
                <p className="text-[10px] text-gray-400 dark:text-slate-500">{user?.role === 'hr' ? 'İK Uzmanı' : 'Aday'}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/20 flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" /> Çıkış
            </button>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--card-border)] bg-[var(--bg-sidebar)] px-4 py-3 space-y-1">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/40'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-3 px-4 py-3 border-t border-[var(--card-border)] mt-2 pt-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-gray-400 dark:text-slate-500">{user?.role === 'hr' ? 'İK Uzmanı' : 'Aday'}</p>
              </div>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-400"><LogOut className="w-5 h-5" /></button>
            </div>
          </div>
        )}
      </header>

      {/* Page Title */}
      {title && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 relative z-10">
          <h1 className="text-lg font-extrabold">{title}</h1>
        </div>
      )}

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {children}
      </main>
    </div>
  );
}
