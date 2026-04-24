import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] font-sans relative overflow-hidden text-[var(--text-primary)] transition-colors duration-300">
      <Sidebar />
      <Header title={title} />
      <main className="ml-64 mt-16 p-6 lg:p-8 relative z-10 w-[calc(100%-16rem)]">
        {children}
      </main>
    </div>
  );
}
