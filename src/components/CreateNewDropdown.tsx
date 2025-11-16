import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Plus, BarChart3, Bell, Upload } from 'lucide-react';
interface CreateNewDropdownProps {
  onCreatePattern: () => void;
  onCreateAlert: () => void;
  onImportMatches: () => void;
}
export function CreateNewDropdown({
  onCreatePattern,
  onCreateAlert,
  onImportMatches
}: CreateNewDropdownProps) {
  return <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-50 to-slate-200 text-slate-900 text-xs font-medium tracking-tight px-3.5 py-1.5 shadow-[0_0_15px_rgba(148,163,184,0.4)] hover:shadow-[0_0_20px_rgba(148,163,184,0.6)] transition-shadow">
          <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
          <span>Új létrehozása</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[220px] rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl p-2 shadow-[0_0_20px_rgba(30,41,59,0.7)] animate-in fade-in slide-in-from-top-2 z-50" sideOffset={5} align="end">
          <DropdownMenu.Item onClick={onCreatePattern} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors focus:bg-white/10 outline-none cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-violet-400" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <p className="text-slate-200 font-medium">Új Pattern</p>
              <p className="text-xs text-slate-400">
                Elemzési minta létrehozása
              </p>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item onClick={onCreateAlert} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors focus:bg-white/10 outline-none cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center">
              <Bell className="w-4 h-4 text-rose-400" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <p className="text-slate-200 font-medium">Új Alert</p>
              <p className="text-xs text-slate-400">Értesítés beállítása</p>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-white/10" />

          <DropdownMenu.Item onClick={onImportMatches} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors focus:bg-white/10 outline-none cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center">
              <Upload className="w-4 h-4 text-indigo-400" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <p className="text-slate-200 font-medium">Meccsek importálása</p>
              <p className="text-xs text-slate-400">CSV/JSON feltöltés</p>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>;
}