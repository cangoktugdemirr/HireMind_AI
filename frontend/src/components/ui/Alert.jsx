import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

const variants = {
  warning: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', icon: AlertTriangle, iconColor: 'text-amber-500' },
  success: { bg: 'bg-green-50 border-green-200', text: 'text-green-800', icon: CheckCircle, iconColor: 'text-green-500' },
  error:   { bg: 'bg-red-50 border-red-200',   text: 'text-red-800',   icon: XCircle,       iconColor: 'text-red-500' },
  info:    { bg: 'bg-blue-50 border-blue-200',  text: 'text-blue-800',  icon: Info,          iconColor: 'text-blue-500' }
};

export default function Alert({ variant = 'info', title, children, className = '' }) {
  const { bg, text, icon: Icon, iconColor } = variants[variant];
  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${bg} ${className}`}>
      <Icon className={`w-16 h-auto mt-0.5 flex-shrink-0 ${iconColor}`} />
      <div className={text}>
        {title && <p className="font-semibold text-sm">{title}</p>}
        {children && <p className="text-sm mt-0.5">{children}</p>}
      </div>
    </div>
  );
}
