import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900 p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-slate-50 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-slate-200 mb-3">
            Oldal nem található
          </h2>
          <p className="text-sm text-slate-400">
            A keresett oldal nem létezik vagy áthelyezték.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.7)] transition-shadow"
          >
            <Home className="w-4 h-4" strokeWidth={1.75} />
            <span>Vissza a főoldalra</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/60 px-6 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 transition-colors"
          >
            <Search className="w-4 h-4" strokeWidth={1.75} />
            <span>Vissza</span>
          </button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-2xl font-bold text-emerald-400 mb-1">20</p>
            <p className="text-xs text-slate-400">Csapatok</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-2xl font-bold text-blue-400 mb-1">380</p>
            <p className="text-xs text-slate-400">Meccsek</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-2xl font-bold text-violet-400 mb-1">15+</p>
            <p className="text-xs text-slate-400">Minták</p>
          </div>
        </div>
      </div>
    </div>
  );
}
