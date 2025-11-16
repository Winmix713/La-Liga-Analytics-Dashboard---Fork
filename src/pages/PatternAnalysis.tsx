import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, BarChart3, Activity, Plus, Trash2, Edit } from 'lucide-react';
import { usePatterns } from '../hooks/usePatterns';
import { Loading } from '../components/Loading';
export function PatternAnalysis() {
  const navigate = useNavigate();
  const {
    patterns,
    loading,
    error,
    loadPatterns,
    deletePattern,
    analyzePattern,
    clearError
  } = usePatterns();
  useEffect(() => {
    loadPatterns('la-liga-2023-24');
  }, [loadPatterns]);
  const handleDeletePattern = async (patternId: string) => {
    if (window.confirm('Are you sure you want to delete this pattern?')) {
      try {
        await deletePattern(patternId);
      } catch (error) {
        console.error('Failed to delete pattern:', error);
      }
    }
  };
  const handleAnalyzePattern = async (patternId: string) => {
    try {
      await analyzePattern(patternId, 'la-liga-2023-24');
      // TODO: Show analysis results in a modal or navigate to results page
    } catch (error) {
      console.error('Failed to analyze pattern:', error);
    }
  };
  if (loading && patterns.length === 0) {
    return <Loading fullScreen message="Minták betöltése..." />;
  }
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-slate-300 hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Vissza a dashboardhoz</span>
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-rose-400">{error}</p>
            <button onClick={clearError} className="text-rose-400 hover:text-rose-300 transition-colors">
              ✕
            </button>
          </div>}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-[26px] sm:text-[28px] font-semibold tracking-tight text-slate-50">
              Pattern Analysis
            </h1>
            <p className="mt-1 text-[11px] text-slate-400">
              Define, analyze, and discover patterns in your soccer match data.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-xs font-medium text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-shadow">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Discover Patterns (ML)</span>
          </button>
        </div>

        {/* Filters */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-950/90 to-black/95 backdrop-blur-3xl shadow-[0_0_20px_rgba(30,41,59,0.7)] overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-medium text-slate-400 mb-1.5">
                  Filter by Teams
                </label>
                <select className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                  <option>Select team</option>
                  <option>Bilbao</option>
                  <option>Villarreal</option>
                  <option>Madrid Fehér</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-400 mb-1.5">
                  Filter by Seasons
                </label>
                <select className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                  <option>Select season</option>
                  <option>2023-2024</option>
                  <option>2022-2023</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-400 mb-1.5">
                  Filter by Date Range
                </label>
                <input type="text" placeholder="Pick a date range" className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Patterns Grid */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-950/90 to-black/95 backdrop-blur-3xl shadow-[0_0_20px_rgba(30,41,59,0.7)] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" strokeWidth={1.75} />
              </div>
              <h2 className="text-sm font-semibold text-slate-50">
                Your Patterns
              </h2>
              <span className="text-xs text-slate-400">
                ({patterns.length})
              </span>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5 transition-colors">
              <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Add Pattern</span>
            </button>
          </div>

          <div className="p-6">
            {patterns.length === 0 ? <div className="flex flex-col items-center gap-4 text-center py-12">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">
                    No Patterns Yet
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Create your first pattern to start analyzing match data
                  </p>
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/60 px-4 py-2 text-xs text-slate-200 hover:bg-white/5 transition-colors">
                  <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Create Your First Pattern</span>
                </button>
              </div> : <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {patterns.map(pattern => <div key={pattern.id} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-950/50 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-50 mb-1">
                          {pattern.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {pattern.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/60 hover:bg-white/5 transition-colors">
                          <Edit className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.75} />
                        </button>
                        <button onClick={() => handleDeletePattern(pattern.id)} disabled={loading} className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/60 hover:bg-rose-500/20 hover:border-rose-500/30 transition-colors disabled:opacity-50">
                          <Trash2 className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-[10px] font-medium text-slate-400 mb-2">
                        Conditions:
                      </p>
                      <div className="space-y-1">
                        {pattern.conditions.map((condition, idx) => <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                            <span className="inline-flex h-1 w-1 rounded-full bg-emerald-400"></span>
                            <span>
                              {condition.field} {condition.operator}{' '}
                              {condition.value}
                            </span>
                          </div>)}
                      </div>
                    </div>
                    <button onClick={() => handleAnalyzePattern(pattern.id)} disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-[0_0_10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_15px_rgba(79,70,229,0.7)] transition-shadow disabled:opacity-50">
                      <Activity className="w-3.5 h-3.5" strokeWidth={1.75} />
                      <span>{loading ? 'Analyzing...' : 'Run Analysis'}</span>
                    </button>
                  </div>)}
              </div>}
          </div>
        </div>
      </div>
    </div>;
}