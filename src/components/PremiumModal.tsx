import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Sparkles, CheckCircle2, TrendingUp, BarChart3, Bell, Zap } from 'lucide-react';
interface PremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function PremiumModal({
  open,
  onOpenChange
}: PremiumModalProps) {
  const features = [{
    icon: TrendingUp,
    title: 'Fejlett elemzések',
    description: 'Részletes statisztikák és előrejelzések'
  }, {
    icon: BarChart3,
    title: 'Korlátlan pattern-ek',
    description: 'Hozz létre és elemezz korlátlan számú pattern-t'
  }, {
    icon: Bell,
    title: 'Valós idejű értesítések',
    description: 'Azonnali értesítések minden fontos eseményről'
  }, {
    icon: Zap,
    title: 'AI-alapú előrejelzések',
    description: 'Gépi tanulás alapú meccs előrejelzések'
  }];
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/95 via-black to-slate-900/95 backdrop-blur-3xl shadow-[0_0_30px_rgba(30,41,59,0.9)] animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" strokeWidth={1.75} />
              </div>
              <Dialog.Title className="text-sm font-semibold text-slate-50">
                Prémium aktiválása
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 hover:bg-white/5 transition-colors">
                <X className="w-4 h-4 text-slate-300" strokeWidth={1.75} />
              </button>
            </Dialog.Close>
          </div>

          <div className="p-6 space-y-6">
            {/* Hero Section */}
            <div className="text-center space-y-3">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                <Sparkles className="w-8 h-8 text-amber-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-50">
                Profi csapat elemzés
              </h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Részletes mutatók, formagörbe és meccs előrejelzések egyetlen
                felületen. Emeld a következő szintre az elemzéseidet!
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => {
              const Icon = feature.icon;
              return <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-indigo-400" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>;
            })}
            </div>

            {/* Pricing */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-950/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-50">
                    Prémium csomag
                  </h3>
                  <p className="text-xs text-slate-400">
                    Korlátlan hozzáférés minden funkcióhoz
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-slate-50">9.990 Ft</p>
                  <p className="text-xs text-slate-400">/ hónap</p>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
                  <span>Korlátlan pattern elemzés</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
                  <span>Valós idejű értesítések</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
                  <span>AI-alapú előrejelzések</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
                  <span>Prioritás támogatás</span>
                </li>
              </ul>
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-medium text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:shadow-[0_0_20px_rgba(245,158,11,0.7)] transition-shadow">
                <Sparkles className="w-4 h-4" strokeWidth={1.75} />
                <span>Aktiválás most</span>
              </button>
            </div>

            {/* Trust Badge */}
            <div className="text-center">
              <p className="text-xs text-slate-500">
                14 napos pénzvisszafizetési garancia • Bármikor lemondható
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>;
}