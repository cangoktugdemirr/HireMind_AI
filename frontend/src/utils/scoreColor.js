export const getScoreColor = (s) =>
  s >= 70 ? '#059669' : s >= 40 ? '#D97706' : '#DC2626';

export const getScoreBg = (s) =>
  s >= 70 ? 'bg-green-100 text-green-700' : s >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';
