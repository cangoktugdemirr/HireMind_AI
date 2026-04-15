import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] font-sans relative overflow-hidden text-[var(--text-primary)] transition-colors duration-300">
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/[0.04] dark:bg-blue-500/[0.03] blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] dark:bg-violet-500/[0.02] blur-[150px]"></div>
      </div>

      <Sidebar />
      <Header title={title} />
      <main className="ml-64 mt-16 p-6 lg:p-8 relative z-10 w-[calc(100%-16rem)]">
        {children}
      </main>
    </div>
  );
}
