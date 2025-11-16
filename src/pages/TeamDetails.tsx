import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, TrendingUp, Activity, Calendar } from 'lucide-react';
import { getRepository } from '../repositories/factory';
import { Loading } from '../components/Loading';
import type { Team, Match } from '../types';
export function TeamDetails() {
  const {
    teamId
  } = useParams<{
    teamId: string;
  }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadTeamData = async () => {
      if (!teamId) return;
      try {
        const repo = getRepository();
        const teamData = await repo.teams.getTeam(teamId);
        const matchesData = await repo.matches.getMatches('la-liga-2023-24', {
          teams: [teamId]
        });
        setTeam(teamData);
        setMatches(matchesData);
      } catch (error) {
        console.error('Failed to load team data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTeamData();
  }, [teamId]);
  if (loading) {
    return <Loading fullScreen message="Csapat adatok betöltése..." />;
  }
  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900">
        <div className="text-center">
          <p className="text-lg text-slate-400 mb-4">Csapat nem található</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.7)] transition-shadow"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            Vissza a főoldalra
          </button>
        </div>
      </div>
    );
  }
  const getFormBadgeColor = (result: string) => {
    switch (result) {
      case 'W':
        return 'bg-emerald-500';
      case 'D':
        return 'bg-amber-500';
      case 'L':
        return 'bg-rose-500';
      default:
        return 'bg-slate-500';
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-slate-300 hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Vissza a táblázathoz</span>
          </button>
        </div>

        {/* Team Header */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-950/90 to-black/95 backdrop-blur-3xl shadow-[0_0_20px_rgba(30,41,59,0.7)] overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="h-20 w-20 rounded-2xl bg-cover bg-center border-2 border-white/20 shadow-[0_0_20px_rgba(30,41,59,0.5)]" style={{
              backgroundImage: `url(${team.logo})`
            }}></div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
                    {team.name}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/30">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    #{team.position} pozíció
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  La Liga 2023-2024 szezon
                </p>
                <div className="flex items-center gap-2">
                  {team.form.map((result, idx) => <span key={idx} className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${getFormBadgeColor(result)} text-white`}>
                      {result}
                    </span>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-950/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-indigo-400" strokeWidth={1.75} />
              <p className="text-xs text-slate-400">Pontok</p>
            </div>
            <p className="text-2xl font-bold text-slate-50">{team.points}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-950/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
              <p className="text-xs text-slate-400">Győzelmek</p>
            </div>
            <p className="text-2xl font-bold text-emerald-400">{team.won}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-950/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-400" strokeWidth={1.75} />
              <p className="text-xs text-slate-400">Gólkülönbség</p>
            </div>
            <p className={`text-2xl font-bold ${team.goalDifference > 0 ? 'text-emerald-400' : 'text-slate-50'}`}>
              {team.goalDifference > 0 ? '+' : ''}
              {team.goalDifference}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-950/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-violet-400" strokeWidth={1.75} />
              <p className="text-xs text-slate-400">Mérkőzések</p>
            </div>
            <p className="text-2xl font-bold text-slate-50">{team.played}</p>
          </div>
        </div>

        {/* Recent Matches */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-950/90 to-black/95 backdrop-blur-3xl shadow-[0_0_20px_rgba(30,41,59,0.7)] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-slate-50">
              Legutóbbi mérkőzések
            </h2>
          </div>
          <div className="p-6">
            {matches.length === 0 ? <p className="text-sm text-slate-400 text-center py-8">
                Nincsenek elérhető mérkőzések
              </p> : <div className="space-y-3">
                {matches.slice(0, 10).map(match => <Link key={match.id} to={`/matches/${match.id}`} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-xs text-slate-400 w-20">
                        {match.date}
                      </span>
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-sm text-slate-200 font-medium">
                          {match.homeTeam}
                        </span>
                        <span className="text-sm text-slate-400">vs</span>
                        <span className="text-sm text-slate-200 font-medium">
                          {match.awayTeam}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-50">
                        {match.score}
                      </span>
                      <span className={`inline-flex h-6 w-6 items-center justify-center rounded text-[10px] font-semibold ${getFormBadgeColor(match.result)} text-white`}>
                        {match.result}
                      </span>
                    </div>
                  </Link>)}
              </div>}
          </div>
        </div>
      </div>
    </div>;
}