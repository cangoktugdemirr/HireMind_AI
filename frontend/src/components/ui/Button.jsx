import React from 'react';
import Spinner from './Spinner';

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-500 text-white border-transparent shadow-sm',
  secondary: 'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 border-gray-300 dark:border-slate-600',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm h-9',
  md: 'px-4 py-2 text-sm h-10',
  lg: 'px-6 py-2.5 text-base h-11'
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = ''
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-xl border
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {loading && <Spinner size="sm" color={variant === 'secondary' ? 'gray' : 'white'} />}
      {children}
    </button>
  );
}
