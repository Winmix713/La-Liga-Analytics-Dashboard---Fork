import React, { useState, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Upload, X, FileUp, CheckCircle2, AlertTriangle } from 'lucide-react';
interface ImportMatchesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (data: any[]) => Promise<void>;
}
export function ImportMatchesModal({
  open,
  onOpenChange,
  onImport
}: ImportMatchesModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    const validExtensions = ['.csv', '.json'];
    const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      setError('Érvénytelen fájlformátum. Csak CSV és JSON fájlok támogatottak.');
      return;
    }
    
    const maxSize = 10 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError('A fájl mérete túl nagy. Maximum 10MB engedélyezett.');
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    setSuccess(false);
    
    const mockData = [{
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      date: '2024-01-15',
      score: '2-1'
    }, {
      homeTeam: 'Sevilla',
      awayTeam: 'Valencia',
      date: '2024-01-15',
      score: '1-1'
    }, {
      homeTeam: 'Atletico',
      awayTeam: 'Villarreal',
      date: '2024-01-16',
      score: '3-0'
    }];
    setPreview(mockData);
  };
  const handleImport = async () => {
    if (!preview.length) return;
    setImporting(true);
    setError(null);
    try {
      await onImport(preview);
      setSuccess(true);
      setTimeout(() => {
        onOpenChange(false);
        resetState();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
    }
  };
  const resetState = () => {
    setFile(null);
    setPreview([]);
    setError(null);
    setSuccess(false);
  };
  const handleClose = () => {
    onOpenChange(false);
    resetState();
  };
  return <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/95 via-black to-slate-900/95 backdrop-blur-3xl shadow-[0_0_30px_rgba(30,41,59,0.9)] animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                <Upload className="w-4 h-4 text-white" strokeWidth={1.75} />
              </div>
              <div>
                <Dialog.Title className="text-sm font-semibold text-slate-50">
                  Meccsek importálása
                </Dialog.Title>
                <p className="text-[10px] text-slate-400">
                  CSV vagy JSON fájl feltöltése
                </p>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 hover:bg-white/5 transition-colors">
                <X className="w-4 h-4 text-slate-300" strokeWidth={1.75} />
              </button>
            </Dialog.Close>
          </div>

          <div className="p-6 space-y-6">
            {/* File Upload Area */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Fájl kiválasztása
              </label>
              <div onClick={() => fileInputRef.current?.click()} className="relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <FileUp className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-200">
                    {file ? file.name : 'Kattints a fájl kiválasztásához'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    CSV vagy JSON formátum támogatott
                  </p>
                </div>
                <input ref={fileInputRef} type="file" accept=".csv,.json" onChange={handleFileSelect} className="hidden" />
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <AlertTriangle className="w-4 h-4 text-rose-400" strokeWidth={1.75} />
                <p className="text-sm text-rose-400">{error}</p>
              </div>}

            {/* Success Message */}
            {success && <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
                <p className="text-sm text-emerald-400">Sikeres importálás!</p>
              </div>}

            {/* Preview */}
            {preview.length > 0 && !success && <div>
                <h3 className="text-xs font-medium text-slate-300 mb-2">
                  Előnézet ({preview.length} meccs)
                </h3>
                <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                  <div className="max-h-[200px] overflow-y-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-white/5 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left text-slate-400 font-medium">
                            Hazai
                          </th>
                          <th className="px-3 py-2 text-left text-slate-400 font-medium">
                            Vendég
                          </th>
                          <th className="px-3 py-2 text-left text-slate-400 font-medium">
                            Dátum
                          </th>
                          <th className="px-3 py-2 text-left text-slate-400 font-medium">
                            Eredmény
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {preview.map((match, idx) => <tr key={idx} className="hover:bg-white/5">
                            <td className="px-3 py-2 text-slate-200">
                              {match.homeTeam}
                            </td>
                            <td className="px-3 py-2 text-slate-200">
                              {match.awayTeam}
                            </td>
                            <td className="px-3 py-2 text-slate-400">
                              {match.date}
                            </td>
                            <td className="px-3 py-2 text-slate-200 font-medium">
                              {match.score}
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-white/10 bg-black/40">
            <button onClick={handleClose} className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/60 px-4 py-2 text-xs text-slate-200 hover:bg-white/5 transition-colors">
              Mégse
            </button>
            <button onClick={handleImport} disabled={!preview.length || importing || success} className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.7)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed">
              <Upload className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>{importing ? 'Importálás...' : 'Importálás'}</span>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>;
}