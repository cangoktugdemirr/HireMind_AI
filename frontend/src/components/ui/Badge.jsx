import React from 'react';

const variants = {
  pending: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  default: 'bg-gray-100 text-gray-600'
};

const labels = {
  pending: 'Bekliyor',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı'
};

export default function Badge({ status, children, className = '' }) {
  const variant = variants[status] || variants.default;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variant} ${className}`}>
      {children || labels[status] || status}
    </span>
  );
}
