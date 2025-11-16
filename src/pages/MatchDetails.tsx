import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, Clock, MapPin } from 'lucide-react';
import { getRepository } from '../repositories/factory';
import { Loading } from '../components/Loading';
import type { Match } from '../types';
export function MatchDetails() {
  const {
    matchId
  } = useParams<{
    matchId: string;
  }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadMatch = async () => {
      if (!matchId) return;
      try {
        const repo = getRepository();
        const matchData = await repo.matches.getMatch(matchId);
        setMatch(matchData);
      } catch (error) {
        console.error('Failed to load match:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMatch();
  }, [matchId]);
  if (loading) {
    return <Loading fullScreen message="Meccs adatok betöltése..." />;
  }
  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900">
        <div className="text-center">
          <p className="text-lg text-slate-400 mb-4">Mérkőzés nem található</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.7)] transition-shadow"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            Vissza
          </button>
        </div>
      </div>
    );
  }
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-slate-300 hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Vissza</span>
          </button>
        </div>

        {/* Match Details Card */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/95 via-black to-slate-900/95 backdrop-blur-3xl shadow-[0_0_30px_rgba(30,41,59,0.9)] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-slate-950" strokeWidth={1.75} />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-slate-50">
                  Meccs részletek
                </h1>
                <p className="text-[10px] text-slate-400">{match.date}</p>
              </div>
              <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/30">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Befejezett
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Score Display */}
            <div className="flex items-center justify-between gap-8 p-6 rounded-2xl bg-gradient-to-r from-white/5 via-slate-900/50 to-white/5 border border-white/10">
              <div className="flex-1 text-center">
                <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-lg font-bold">
                  {match.homeTeam.charAt(0)}
                </div>
                <p className="text-sm font-semibold text-slate-50">
                  {match.homeTeam}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-50 mb-1">
                  {match.score}
                </div>
                <p className="text-[10px] text-slate-400">HT: 0 - 1</p>
              </div>
              <div className="flex-1 text-center">
                <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-lg font-bold">
                  {match.awayTeam.charAt(0)}
                </div>
                <p className="text-sm font-semibold text-slate-50">
                  {match.awayTeam}
                </p>
              </div>
            </div>

            {/* Match Info */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                <Calendar className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                <div>
                  <p className="text-[10px] text-slate-400">Dátum</p>
                  <p className="text-xs font-medium text-slate-200">
                    {match.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                <div>
                  <p className="text-[10px] text-slate-400">Időpont</p>
                  <p className="text-xs font-medium text-slate-200">11:53 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                <div>
                  <p className="text-[10px] text-slate-400">Helyszín</p>
                  <p className="text-xs font-medium text-slate-200">Stadion</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-300 px-2">
                Időrendi események
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/20 border border-rose-500/30">
                    <span className="text-[10px] font-semibold text-rose-400">
                      ⚽
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-200">
                      William Williams
                    </p>
                    <p className="text-[10px] text-slate-400">Gól</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-300">
                    2'
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 border border-amber-500/30">
                    <span className="text-[10px] font-semibold text-amber-400">
                      ⚠️
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-200">
                      Michael Rodriguez
                    </p>
                    <p className="text-[10px] text-slate-400">Sárga lap</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-300">
                    6'
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/20 border border-rose-500/30">
                    <span className="text-[10px] font-semibold text-rose-400">
                      ⚽
                    </span>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs font-medium text-slate-200">
                      John Davis
                    </p>
                    <p className="text-[10px] text-slate-400">Gól</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-300">
                    8'
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 border border-amber-500/30">
                    <span className="text-[10px] font-semibold text-amber-400">
                      ⚠️
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-200">
                      William Wilson
                    </p>
                    <p className="text-[10px] text-slate-400">Sárga lap</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-300">
                    13'
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}