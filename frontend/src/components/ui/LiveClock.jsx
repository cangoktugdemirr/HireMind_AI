import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-slate-900/60 dark:backdrop-blur-md border border-gray-200 dark:border-blue-500/30 pl-3 pr-4 py-1.5 rounded-xl shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
      <div className="w-32 h-auto flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
          <Clock className="w-4 h-4" />
        </motion.div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-0.5 tracking-wider font-mono">
          {formatTime(time)}
        </span>
        <span className="text-[10px] uppercase font-semibold text-gray-500 dark:text-blue-400/80 leading-none">
          {formatDate(time)}
        </span>
      </div>
    </div>
  );
}
