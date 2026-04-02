import React from 'react';
import Spinner from './Spinner';

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white border-transparent',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300',
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
        inline-flex items-center justify-center gap-2 font-medium rounded-lg border
        transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {loading && <Spinner size="sm" color={variant === 'secondary' ? 'gray' : 'white'} />}
      {children}
    </button>
  );
}
