import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X, BarChart3, ShoppingBag, Users, Activity, Megaphone, Sparkles } from 'lucide-react';
interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function MobileNav({
  open,
  onOpenChange
}: MobileNavProps) {
  const location = useLocation();
  const navigationItems = [{
    name: 'Dashboard',
    icon: BarChart3,
    href: '/',
    gradient: 'from-indigo-500 to-blue-500'
  }, {
    name: 'Bolt',
    icon: ShoppingBag,
    href: '#'
  }, {
    name: 'Kliensek',
    icon: Users,
    href: '#'
  }, {
    name: 'Bevételek',
    icon: Activity,
    href: '#'
  }, {
    name: 'Promóció',
    icon: Megaphone,
    href: '#'
  }];
  return <>
      <button onClick={() => onOpenChange(true)} className="lg:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60">
        <Menu className="w-4 h-4 text-slate-300" strokeWidth={1.75} />
      </button>

      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in z-50 lg:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 w-72 bg-black/95 backdrop-blur-2xl border-r border-white/10 animate-in slide-in-from-left duration-300 z-50 lg:hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                  <span className="text-sm font-semibold tracking-tight">
                    LL
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-300/80">
                  Analytics Console
                </span>
              </div>
              <Dialog.Close asChild>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 hover:bg-white/5 transition-colors">
                  <X className="w-4 h-4 text-slate-300" strokeWidth={1.75} />
                </button>
              </Dialog.Close>
            </div>

            <div className="px-4 py-5">
              <div className="text-xs font-medium tracking-tight text-slate-400/90 mb-4">
                Navigáció
              </div>
              <nav className="space-y-1.5 text-xs font-medium">
                {navigationItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return <Link key={item.name} to={item.href} onClick={() => onOpenChange(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all ${isActive ? `bg-gradient-to-r from-white/10 via-white/5 to-transparent border border-white/10 text-slate-50 shadow-[0_0_15px_rgba(30,41,59,0.5)]` : 'text-slate-300 hover:text-slate-50 hover:bg-white/5 border border-transparent hover:border-white/5'}`}>
                      <div className={`h-7 w-7 rounded-xl flex items-center justify-center ${isActive ? `bg-gradient-to-tr ${item.gradient}` : 'bg-slate-900/80'}`}>
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-50' : 'text-slate-400'}`} strokeWidth={1.6} />
                      </div>
                      <span>{item.name}</span>
                    </Link>;
              })}
              </nav>
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 border-t border-white/10">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 p-3.5 shadow-[0_0_10px_rgba(30,41,59,0.5)]">
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-tr from-blue-500/40 via-cyan-400/40 to-transparent blur-2xl"></div>
                <div className="relative">
                  <p className="text-[11px] font-medium tracking-tight text-slate-100">
                    Profi csapat elemzés
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Részletes mutatók, formagörbe és meccs előrejelzések
                    egyetlen felületen.
                  </p>
                  <button className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-white text-[10px] font-medium tracking-tight text-slate-900 px-2.5 py-1 shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-shadow">
                    <Sparkles className="w-3 h-3" strokeWidth={1.75} />
                    <span>Prémium aktiválása</span>
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>;
}