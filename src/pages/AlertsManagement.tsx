import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BellRing, Plus, Play, Trash2, Edit, Pause } from 'lucide-react';
import { useAlerts } from '../hooks/useAlerts';
export function AlertsManagement() {
  const navigate = useNavigate();
  const {
    alerts,
    activeAlerts,
    loading,
    error,
    loadAlerts,
    deleteAlert,
    toggleAlert,
    clearError
  } = useAlerts();
  useEffect(() => {
    loadAlerts('la-liga-2023-24');
  }, [loadAlerts]);
  const handleDeleteAlert = async (alertId: string) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      try {
        await deleteAlert(alertId);
      } catch (error) {
        console.error('Failed to delete alert:', error);
      }
    }
  };
  const handleToggleAlert = async (alertId: string) => {
    try {
      await toggleAlert(alertId);
    } catch (error) {
      console.error('Failed to toggle alert:', error);
    }
  };
  if (loading && alerts.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900">
        <div className="text-slate-400">Loading alerts...</div>
      </div>;
  }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/30">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            Active
          </span>;
      case 'paused':
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-400 border border-amber-500/30">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400"></span>
            Paused
          </span>;
      default:
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/20 px-2 py-0.5 text-[10px] font-medium text-slate-400 border border-slate-500/30">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-slate-400"></span>
            Disabled
          </span>;
    }
  };
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
              Alerts Management
            </h1>
            <p className="mt-1 text-[11px] text-slate-400">
              Configure alerts for pattern detection and get notified instantly.
            </p>
            {activeAlerts.length > 0 && <p className="mt-1 text-[11px] text-emerald-400">
                {activeAlerts.length} active alert
                {activeAlerts.length !== 1 ? 's' : ''} monitoring
              </p>}
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-400/70 bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.7)] transition-shadow">
            <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Create Alert</span>
          </button>
        </div>

        {/* Alerts List */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-950/90 to-black/95 backdrop-blur-3xl shadow-[0_0_20px_rgba(30,41,59,0.7)] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                <BellRing className="w-4 h-4 text-white" strokeWidth={1.75} />
              </div>
              <h2 className="text-sm font-semibold text-slate-50">
                Active Alerts
              </h2>
              <span className="text-xs text-slate-400">({alerts.length})</span>
            </div>
          </div>

          <div className="p-6">
            {alerts.length === 0 ? <div className="flex flex-col items-center gap-4 text-center py-12">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(244,63,94,0.3)]">
                  <BellRing className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">
                    No Alerts Configured
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Create alerts to get notified when patterns are detected
                  </p>
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/60 px-4 py-2 text-xs text-slate-200 hover:bg-white/5 transition-colors">
                  <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Create Your First Alert</span>
                </button>
              </div> : <div className="space-y-3">
                {alerts.map(alert => <div key={alert.id} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-950/50 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-slate-50">
                            {alert.name}
                          </h4>
                          {getStatusBadge(alert.status)}
                        </div>
                        <p className="text-[11px] text-slate-400 mb-2">
                          {alert.pattern}
                        </p>
                        <div className="flex items-center gap-4 text-[10px] text-slate-500">
                          <span>Condition: {alert.condition}</span>
                          <span>•</span>
                          <span>Action: {alert.action}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/60 hover:bg-white/5 transition-colors">
                          <Edit className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.75} />
                        </button>
                        <button onClick={() => handleToggleAlert(alert.id)} disabled={loading} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/60 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-colors disabled:opacity-50" title={alert.status === 'active' ? 'Pause alert' : 'Activate alert'}>
                          {alert.status === 'active' ? <Pause className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.75} /> : <Play className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.75} />}
                        </button>
                        <button onClick={() => handleDeleteAlert(alert.id)} disabled={loading} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/60 hover:bg-rose-500/20 hover:border-rose-500/30 transition-colors disabled:opacity-50">
                          <Trash2 className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="text-[10px] text-slate-400">
                        Triggered:{' '}
                        <span className="text-slate-300 font-medium">
                          {alert.triggeredCount} times
                        </span>
                      </div>
                      {alert.lastTriggered && <div className="text-[10px] text-slate-400">
                          Last:{' '}
                          <span className="text-slate-300">
                            {alert.lastTriggered}
                          </span>
                        </div>}
                    </div>
                  </div>)}
              </div>}
          </div>
        </div>
      </div>
    </div>;
}