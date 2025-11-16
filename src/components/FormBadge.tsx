import React, { memo } from 'react';
import type { FormResult } from '../types';

interface FormBadgeProps {
  result: FormResult;
  size?: 'sm' | 'md' | 'lg';
}

export const FormBadge = memo(function FormBadge({ result, size = 'md' }: FormBadgeProps) {
  const sizeClasses = {
    sm: 'h-3.5 w-3.5 text-[8px]',
    md: 'h-6 w-6 text-[10px]',
    lg: 'h-8 w-8 text-xs'
  };

  const colorClasses = {
    W: 'bg-emerald-500 text-white',
    D: 'bg-amber-500 text-white',
    L: 'bg-rose-500 text-white'
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded font-semibold ${sizeClasses[size]} ${colorClasses[result]}`}
      aria-label={`Result: ${result === 'W' ? 'Win' : result === 'D' ? 'Draw' : 'Loss'}`}
    >
      {result}
    </span>
  );
});
