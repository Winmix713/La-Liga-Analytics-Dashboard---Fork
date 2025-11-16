import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loading({ message = 'Betöltés...', fullScreen = false }: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-white/10"></div>
        <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
      </div>
      {message && (
        <p className="text-sm text-slate-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900">
        {content}
      </div>
    );
  }

  return content;
}
