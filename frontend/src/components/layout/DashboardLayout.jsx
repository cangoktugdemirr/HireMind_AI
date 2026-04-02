import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header title={title} />
      <main className="ml-64 mt-16 p-6">
        {children}
      </main>
    </div>
  );
}
