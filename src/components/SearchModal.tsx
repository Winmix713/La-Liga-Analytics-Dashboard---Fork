import React, { useCallback, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Search, X, Trophy, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getRepository } from '../repositories/factory';
interface SearchResult {
  id: string;
  type: 'team' | 'match' | 'league';
  title: string;
  subtitle: string;
  url: string;
}
interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function SearchModal({
  open,
  onOpenChange
}: SearchModalProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const repo = getRepository();
      const teams = await repo.teams.getTeams('la-liga-2023-24');
      const matches = await repo.matches.getMatches('la-liga-2023-24');
      const searchResults: SearchResult[] = [];
      // Search teams
      teams.filter(team => team.name.toLowerCase().includes(searchQuery.toLowerCase())).forEach(team => {
        searchResults.push({
          id: team.id,
          type: 'team',
          title: team.name,
          subtitle: `Position: ${team.position} • ${team.points} points`,
          url: `/teams/${team.id}`
        });
      });
      // Search matches
      matches.filter(match => match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) || match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5).forEach(match => {
        searchResults.push({
          id: match.id,
          type: 'match',
          title: `${match.homeTeam} vs ${match.awayTeam}`,
          subtitle: `${match.date} • ${match.score}`,
          url: `/matches/${match.id}`
        });
      });
      setResults(searchResults);
      setSelectedIndex(0);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const debounce = setTimeout(() => {
      performSearch(query);
    }, 300);
    return () => clearTimeout(debounce);
  }, [query, performSearch]);
  const handleSelect = (result: SearchResult) => {
    navigate(result.url);
    onOpenChange(false);
    setQuery('');
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };
  const getIcon = (type: string) => {
    switch (type) {
      case 'team':
        return <Users className="w-4 h-4" strokeWidth={1.75} />;
      case 'match':
        return <Calendar className="w-4 h-4" strokeWidth={1.75} />;
      case 'league':
        return <Trophy className="w-4 h-4" strokeWidth={1.75} />;
      default:
        return <Search className="w-4 h-4" strokeWidth={1.75} />;
    }
  };
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in z-50" />
        <Dialog.Content className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-[0_0_30px_rgba(30,41,59,0.9)] animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <Search className="w-5 h-5 text-slate-400" strokeWidth={1.75} />
            <input type="text" placeholder="Keresés a ligák, csapatok, meccsek között..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none" autoFocus />
            <Dialog.Close asChild>
              <button className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/60 hover:bg-white/5 transition-colors">
                <X className="w-4 h-4 text-slate-300" strokeWidth={1.75} />
              </button>
            </Dialog.Close>
          </div>

          <div className="max-h-[400px] overflow-y-auto p-2">
            {loading ? <div className="flex items-center justify-center py-12">
                <div className="text-sm text-slate-400">Keresés...</div>
              </div> : results.length === 0 && query ? <div className="flex flex-col items-center justify-center py-12 gap-2">
                <Search className="w-8 h-8 text-slate-600" strokeWidth={1.5} />
                <p className="text-sm text-slate-400">Nincs találat</p>
              </div> : results.length === 0 ? <div className="flex flex-col items-center justify-center py-12 gap-2">
                <Search className="w-8 h-8 text-slate-600" strokeWidth={1.5} />
                <p className="text-sm text-slate-400">
                  Kezdj el gépelni a kereséshez
                </p>
              </div> : <div className="space-y-1">
                {results.map((result, index) => <button key={result.id} onClick={() => handleSelect(result)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${index === selectedIndex ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}>
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${result.type === 'team' ? 'bg-blue-500/20 text-blue-400' : result.type === 'match' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-violet-500/20 text-violet-400'}`}>
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {result.subtitle}
                      </p>
                    </div>
                  </button>)}
              </div>}
          </div>

          <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-black/40">
            <div className="flex items-center gap-4 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-slate-300">
                  ↑
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-slate-300">
                  ↓
                </kbd>
                navigálás
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-slate-300">
                  Enter
                </kbd>
                kiválasztás
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-slate-300">
                  Esc
                </kbd>
                bezárás
              </span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>;
}