import React from 'react';

const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-16 h-auto' };
const colors = { white: 'border-white/30 border-t-white', gray: 'border-gray-300 border-t-gray-600', blue: 'border-primary-100 border-t-primary-600' };

export default function Spinner({ size = 'md', color = 'blue' }) {
  return (
    <div
      className={`${sizes[size]} ${colors[color]} rounded-full border-2 animate-spin`}
      role="status"
      aria-label="Yükleniyor"
    />
  );
}
