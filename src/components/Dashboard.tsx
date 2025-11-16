import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, Download, Upload, BarChart3, Activity, LineChart, BellRing, Trophy, Info, Table2, Award as IdCard, ChevronsUpDown, Sparkles, Globe2, Shield, RefreshCcw, ShoppingBag, Users, Megaphone, Search, Plus, Bell, X, Eye, Calendar, Clock, MapPin, Flame, TrendingUp, AlertTriangle, CheckCircle2, Play, Trash2, Edit, FileUp } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { ImportMatchesModal } from './ImportMatchesModal';
import { PremiumModal } from './PremiumModal';
import { CreateNewDropdown } from './CreateNewDropdown';
import { MobileNav } from './MobileNav';
import { exportTableToCSV, exportMatchesToCSV } from '../utils/export';
import { getRepository } from '../repositories/factory';
const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const handleImportMatches = async (data: any[]) => {
    try {
      const repo = getRepository();
      await repo.matches.importMatches('la-liga-2023-24', data);
      // Refresh data or show success message
    } catch (error) {
      console.error('Failed to import matches:', error);
      throw error;
    }
  };
  const handleExportTable = () => {
    exportTableToCSV(tableData, 'la-liga-2023-24-table');
  };
  const handleExportMatches = () => {
    exportMatchesToCSV(matchesData, 'la-liga-2023-24-matches');
  };
  const navigationItems = [{
    name: 'Dashboard',
    icon: BarChart3,
    href: '/',
    active: true,
    gradient: 'from-indigo-500 to-blue-500'
  }, {
    name: 'Bolt',
    icon: ShoppingBag,
    href: '#',
    active: false
  }, {
    name: 'Kliensek',
    icon: Users,
    href: '#',
    active: false
  }, {
    name: 'Bevételek',
    icon: Activity,
    href: '#',
    active: false
  }, {
    name: 'Promóció',
    icon: Megaphone,
    href: '#',
    active: false
  }];
  const tabs = [{
    name: 'Tabella',
    icon: Table2
  }, {
    name: 'Forma',
    icon: LineChart
  }, {
    name: 'Meccsek',
    icon: Trophy
  }, {
    name: 'Analitika',
    icon: BarChart3
  }, {
    name: 'Értesítések',
    icon: BellRing
  }];
  const tableData = [{
    position: 1,
    team: 'Bilbao',
    logo: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 18,
    drawn: 7,
    lost: 5,
    goalsFor: 55,
    goalsAgainst: 28,
    goalDifference: 27,
    points: 61,
    form: ['W', 'W', 'W', 'W', 'W'],
    indicator: 'emerald' as const,
    patterns: ['home_comeback', 'high_scoring'],
    alertActive: false
  }, {
    position: 2,
    team: 'Villarreal',
    logo: 'https://images.unsplash.com/photo-1518091043644-c1f4c3aaf2c8?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 18,
    drawn: 5,
    lost: 7,
    goalsFor: 48,
    goalsAgainst: 32,
    goalDifference: 16,
    points: 59,
    form: ['W', 'W', 'W', 'W', 'W'],
    indicator: 'emerald',
    patterns: ['high_scoring'],
    alertActive: true
  }, {
    position: 3,
    team: 'Madrid Fehér',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 17,
    drawn: 4,
    lost: 9,
    goalsFor: 60,
    goalsAgainst: 40,
    goalDifference: 20,
    points: 55,
    form: ['L', 'W', 'W', 'W', 'W'],
    indicator: 'emerald',
    patterns: ['home_comeback'],
    alertActive: false
  }, {
    position: 4,
    team: 'San Sebastian',
    logo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 16,
    drawn: 4,
    lost: 10,
    goalsFor: 58,
    goalsAgainst: 40,
    goalDifference: 18,
    points: 52,
    form: ['W', 'W', 'D', 'W', 'L'],
    indicator: 'emerald',
    patterns: [],
    alertActive: true
  }, {
    position: 5,
    team: 'Barcelona',
    logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 14,
    drawn: 6,
    lost: 10,
    goalsFor: 49,
    goalsAgainst: 34,
    goalDifference: 15,
    points: 48,
    form: ['L', 'D', 'D', 'L', 'W'],
    indicator: 'slate',
    patterns: [],
    alertActive: false
  }, {
    position: 6,
    team: 'Valencia',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 12,
    drawn: 10,
    lost: 8,
    goalsFor: 55,
    goalsAgainst: 46,
    goalDifference: 9,
    points: 46,
    form: ['W', 'D', 'L', 'L', 'W'],
    indicator: 'slate',
    patterns: ['high_scoring'],
    alertActive: false
  }, {
    position: 7,
    team: 'Girona',
    logo: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 13,
    drawn: 7,
    lost: 10,
    goalsFor: 42,
    goalsAgainst: 47,
    goalDifference: -5,
    points: 46,
    form: ['L', 'D', 'D', 'L', 'L'],
    indicator: 'slate',
    patterns: [],
    alertActive: false
  }, {
    position: 8,
    team: 'Madrid Piros',
    logo: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 10,
    drawn: 13,
    lost: 7,
    goalsFor: 38,
    goalsAgainst: 30,
    goalDifference: 8,
    points: 43,
    form: ['W', 'W', 'L', 'D', 'D'],
    indicator: 'slate',
    patterns: [],
    alertActive: false
  }, {
    position: 9,
    team: 'Sevilla Piros',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 11,
    drawn: 7,
    lost: 12,
    goalsFor: 33,
    goalsAgainst: 40,
    goalDifference: -7,
    points: 40,
    form: ['W', 'L', 'L', 'W', 'W'],
    indicator: 'slate',
    patterns: [],
    alertActive: false
  }, {
    position: 10,
    team: 'Osasuna',
    logo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 11,
    drawn: 6,
    lost: 13,
    goalsFor: 34,
    goalsAgainst: 45,
    goalDifference: -11,
    points: 39,
    form: ['D', 'L', 'W', 'L', 'W'],
    indicator: 'slate',
    patterns: [],
    alertActive: false
  }, {
    position: 11,
    team: 'Getafe',
    logo: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 10,
    drawn: 6,
    lost: 14,
    goalsFor: 40,
    goalsAgainst: 50,
    goalDifference: -10,
    points: 36,
    form: ['W', 'W', 'W', 'L', 'D'],
    indicator: 'slate',
    patterns: [],
    alertActive: false
  }, {
    position: 12,
    team: 'Sevilla Zöld',
    logo: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 9,
    drawn: 8,
    lost: 13,
    goalsFor: 41,
    goalsAgainst: 41,
    goalDifference: 0,
    points: 35,
    form: ['L', 'L', 'D', 'D', 'L'],
    indicator: 'slate',
    patterns: [],
    alertActive: false
  }, {
    position: 13,
    team: 'Mallorca',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 8,
    drawn: 5,
    lost: 17,
    goalsFor: 19,
    goalsAgainst: 40,
    goalDifference: -21,
    points: 29,
    form: ['L', 'D', 'W', 'W', 'L'],
    indicator: 'rose',
    patterns: [],
    alertActive: false
  }, {
    position: 14,
    team: 'Las Palmas',
    logo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 7,
    drawn: 6,
    lost: 17,
    goalsFor: 29,
    goalsAgainst: 40,
    goalDifference: -11,
    points: 27,
    form: ['L', 'L', 'L', 'D', 'L'],
    indicator: 'rose',
    patterns: [],
    alertActive: false
  }, {
    position: 15,
    team: 'Vigo',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 7,
    drawn: 5,
    lost: 18,
    goalsFor: 33,
    goalsAgainst: 58,
    goalDifference: -25,
    points: 26,
    form: ['L', 'L', 'L', 'D', 'L'],
    indicator: 'rose',
    patterns: [],
    alertActive: false
  }, {
    position: 16,
    team: 'Alaves',
    logo: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=200&q=80',
    played: 30,
    won: 6,
    drawn: 7,
    lost: 17,
    goalsFor: 25,
    goalsAgainst: 46,
    goalDifference: -21,
    points: 25,
    form: ['W', 'W', 'L', 'L', 'W'],
    indicator: 'rose',
    patterns: [],
    alertActive: false
  }];
  const matchesData = [{
    date: '2024. 01. 01.',
    homeTeam: 'San Sebastian',
    awayTeam: 'Bilbao',
    score: '0 - 2',
    result: 'L',
    round: '-',
    patterns: ['high_scoring'],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Sevilla Piros',
    awayTeam: 'Barcelona',
    score: '0 - 2',
    result: 'L',
    round: '-',
    patterns: [],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Sevilla Zöld',
    awayTeam: 'Osasuna',
    score: '3 - 1',
    result: 'W',
    round: '-',
    patterns: ['high_scoring', 'home_comeback'],
    alertTriggered: true
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Madrid Fehér',
    awayTeam: 'Las Palmas',
    score: '1 - 3',
    result: 'L',
    round: '-',
    patterns: ['high_scoring'],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Valencia',
    awayTeam: 'Alaves',
    score: '4 - 0',
    result: 'W',
    round: '-',
    patterns: ['high_scoring'],
    alertTriggered: true
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Getafe',
    awayTeam: 'Vigo',
    score: '1 - 0',
    result: 'W',
    round: '-',
    patterns: [],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Madrid Piros',
    awayTeam: 'Girona',
    score: '1 - 1',
    result: 'D',
    round: '-',
    patterns: [],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Mallorca',
    awayTeam: 'Villarreal',
    score: '3 - 2',
    result: 'W',
    round: '-',
    patterns: ['high_scoring', 'home_comeback'],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Las Palmas',
    awayTeam: 'Madrid Piros',
    score: '1 - 2',
    result: 'L',
    round: '-',
    patterns: [],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Vigo',
    awayTeam: 'Valencia',
    score: '2 - 4',
    result: 'L',
    round: '-',
    patterns: ['high_scoring'],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Osasuna',
    awayTeam: 'Sevilla Piros',
    score: '1 - 1',
    result: 'D',
    round: '-',
    patterns: [],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Bilbao',
    awayTeam: 'Mallorca',
    score: '0 - 1',
    result: 'L',
    round: '-',
    patterns: [],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Girona',
    awayTeam: 'Getafe',
    score: '3 - 2',
    result: 'W',
    round: '-',
    patterns: ['high_scoring'],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Alaves',
    awayTeam: 'San Sebastian',
    score: '1 - 1',
    result: 'D',
    round: '-',
    patterns: [],
    alertTriggered: false
  }, {
    date: '2024. 01. 01.',
    homeTeam: 'Villarreal',
    awayTeam: 'Sevilla Zöld',
    score: '0 - 0',
    result: 'D',
    round: '-',
    patterns: [],
    alertTriggered: false
  }];
  const activeAlerts = [{
    id: 'alert-1',
    name: 'High Scoring Alert',
    pattern: 'High Scoring Match (4+ goals)',
    condition: 'Total goals >= 4',
    action: 'Email notification',
    status: 'active',
    triggeredCount: 12,
    lastTriggered: '2024. 01. 01. 15:30'
  }, {
    id: 'alert-2',
    name: 'Comeback Watch',
    pattern: 'Home Team Comeback',
    condition: 'Home losing at HT, wins at FT',
    action: 'Push notification',
    status: 'active',
    triggeredCount: 5,
    lastTriggered: '2023. 12. 28. 20:15'
  }, {
    id: 'alert-3',
    name: 'Form Drop Alert',
    pattern: 'Custom Pattern',
    condition: '3 consecutive losses',
    action: 'Email + Push',
    status: 'paused',
    triggeredCount: 3,
    lastTriggered: '2023. 12. 20. 18:00'
  }];
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
  const getResultBadge = (result: string) => {
    switch (result) {
      case 'W':
        return <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
            W
          </span>;
      case 'D':
        return <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-semibold">
            D
          </span>;
      case 'L':
        return <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-semibold">
            L
          </span>;
      default:
        return null;
    }
  };
  const getPatternIcon = (pattern: string) => {
    switch (pattern) {
      case 'high_scoring':
        return <Flame className="w-3 h-3" strokeWidth={1.75} />;
      case 'home_comeback':
        return <TrendingUp className="w-3 h-3" strokeWidth={1.75} />;
      default:
        return null;
    }
  };
  return <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-black to-slate-900">
      {/* Top Nav */}
      <header className="z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <span className="text-sm font-semibold tracking-tight">LL</span>
          </div>
          <span className="hidden sm:inline-flex text-xs font-medium text-slate-300/80">
            Analytics Console
          </span>
        </div>

        {/* Desktop Search */}
        <div className="flex-1 max-w-xl mx-4 hidden md:flex">
          <button onClick={() => setIsSearchModalOpen(true)} className="relative w-full rounded-full border border-white/10 bg-gradient-to-r from-slate-900/70 via-slate-900/60 to-slate-950/80 px-4 py-2 flex items-center gap-2 shadow-[0_0_10px_rgba(30,41,59,0.5)] hover:border-white/20 transition-colors text-left">
            <Search className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
            <span className="text-xs text-slate-500 flex-1">
              Keresés a ligák, csapatok, meccsek között...
            </span>
            <div className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-400 border border-white/10">
              <span className="font-medium">⌘</span>
              <span>K</span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button onClick={() => setIsSearchModalOpen(true)} className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60">
            <Search className="w-4 h-4 text-slate-300" strokeWidth={1.75} />
          </button>

          {/* Create New Dropdown - Hidden on mobile */}
          <div className="hidden sm:block">
            <CreateNewDropdown onCreatePattern={() => navigate('/patterns')} onCreateAlert={() => navigate('/alerts')} onImportMatches={() => setIsImportModalOpen(true)} />
          </div>

          {/* Notifications */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 shadow-[0_0_10px_rgba(30,41,59,0.5)] hover:shadow-[0_0_15px_rgba(30,41,59,0.7)] transition-shadow">
                <Bell className="w-4 h-4 text-slate-300" strokeWidth={1.75} />
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 border border-black animate-pulse"></span>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="w-72 origin-top-right rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl p-2 shadow-[0_0_20px_rgba(30,41,59,0.7)] focus:outline-none z-50" sideOffset={5} align="end" alignOffset={-5}>
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-xs font-semibold text-slate-200">
                    Értesítések
                  </p>
                </div>
                <DropdownMenu.Item className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs transition-colors focus:bg-white/5 outline-none">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-slate-200 font-medium">
                      Új meccs eredmény
                    </p>
                    <p className="text-slate-400 text-[10px]">
                      Real Madrid 2-0 Athletic
                    </p>
                  </div>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          {/* Profile */}
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-blue-500 shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.7)] transition-shadow">
            <span className="text-[10px] font-semibold tracking-tight text-white">
              KM
            </span>
          </button>

          {/* Mobile Nav Toggle */}
          <MobileNav open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:flex lg:w-64 xl:w-72 flex-col border-r border-white/10 bg-black/40 backdrop-blur-2xl">
          <div className="px-4 py-5">
            <div className="text-xs font-medium tracking-tight text-slate-400/90 mb-4">
              Navigáció
            </div>
            <nav className="space-y-1.5 text-xs font-medium">
              {navigationItems.map(item => {
              const Icon = item.icon;
              return <Link key={item.name} to={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all ${item.active ? `bg-gradient-to-r from-white/10 via-white/5 to-transparent border border-white/10 text-slate-50 shadow-[0_0_15px_rgba(30,41,59,0.5)]` : 'text-slate-300 hover:text-slate-50 hover:bg-white/5 border border-transparent hover:border-white/5'}`}>
                    <div className={`h-7 w-7 rounded-xl flex items-center justify-center ${item.active ? `bg-gradient-to-tr ${item.gradient}` : 'bg-slate-900/80'}`}>
                      <Icon className={`w-3.5 h-3.5 ${item.active ? 'text-slate-50' : 'text-slate-400'}`} strokeWidth={1.6} />
                    </div>
                    <span>{item.name}</span>
                  </Link>;
            })}
            </nav>
          </div>
          <div className="mt-auto px-4 pb-5 pt-3 border-t border-white/10">
            <button onClick={() => setIsPremiumModalOpen(true)} className="w-full relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 p-3.5 shadow-[0_0_10px_rgba(30,41,59,0.5)] hover:shadow-[0_0_15px_rgba(30,41,59,0.7)] transition-shadow">
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-tr from-blue-500/40 via-cyan-400/40 to-transparent blur-2xl"></div>
              <div className="relative">
                <p className="text-[11px] font-medium tracking-tight text-slate-100">
                  Profi csapat elemzés
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  Részletes mutatók, formagörbe és meccs előrejelzések egyetlen
                  felületen.
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-white text-[10px] font-medium tracking-tight text-slate-900 px-2.5 py-1 shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-shadow">
                  <Sparkles className="w-3 h-3" strokeWidth={1.75} />
                  <span>Prémium aktiválása</span>
                </div>
              </div>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-5 space-y-4">
            {/* Breadcrumb & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-slate-300 hover:bg-white/5 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span className="hidden sm:inline">Vissza a ligákhoz</span>
                  <span className="sm:hidden">Vissza</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleExportTable} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3.5 py-1.5 text-[11px] text-slate-200 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(30,41,59,0.5)] transition-all">
                  <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button onClick={() => setIsImportModalOpen(true)} className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/70 bg-gradient-to-r from-indigo-500 to-blue-500 px-3.5 py-1.5 text-[11px] font-medium tracking-tight text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.7)] transition-shadow">
                  <Upload className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span className="hidden sm:inline">Meccsek importálása</span>
                  <span className="sm:hidden">Import</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-[26px] sm:text-[28px] font-semibold tracking-tight text-slate-50">
                  La Liga (2023–2024)
                </h1>
                <p className="mt-1 text-[11px] text-slate-400">
                  Valós idejű tabella, formagörbe és csapat elemzések egyetlen
                  átlátható nézetben.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 border border-white/10 rounded-full px-2.5 py-1 bg-black/60">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Frissítve: 2 perce</span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs.Root defaultValue="Tabella">
              <div className="flex flex-col gap-3">
                <Tabs.List className="flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-black/60 overflow-hidden">
                    {tabs.map(tab => {
                    const Icon = tab.icon;
                    return <Tabs.Trigger key={tab.name} value={tab.name} className="inline-flex items-center justify-center gap-2 px-4 py-2 transition-all data-[state=active]:rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(79,70,229,0.5)] data-[state=inactive]:text-slate-300 data-[state=inactive]:hover:bg-white/5 whitespace-nowrap">
                          <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                          <span>{tab.name}</span>
                        </Tabs.Trigger>;
                  })}
                  </div>
                </Tabs.List>
                {/* Tabella Content */}
                <Tabs.Content value="Tabella" className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-950/90 to-black/95 backdrop-blur-3xl shadow-[0_0_20px_rgba(30,41,59,0.7)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex flex-col gap-3 px-4 sm:px-6 pt-4 pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-blue-500 via-sky-400 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                          <Trophy className="w-4 h-4 text-slate-950" strokeWidth={1.75} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold tracking-tight text-slate-50">
                            Bajnokság állása
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Frissítve:{' '}
                            <span className="text-slate-200">
                              2025. 11. 16.
                            </span>
                          </p>
                        </div>
                        <button className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-black/60">
                          <Info className="w-2.5 h-2.5 text-slate-300" strokeWidth={1.75} />
                        </button>
                      </div>
                      <div className="inline-flex items-center rounded-full border border-white/10 bg-black/60 text-[11px] overflow-hidden">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium tracking-tight shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                          <Table2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                          <span>Tabella</span>
                        </button>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:bg-white/5 transition-colors">
                          <IdCard className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.75} />
                          <span>Kártyák</span>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        <span>Aktív szezon:</span>
                        <span className="font-medium text-slate-200">
                          2023–2024
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe2 className="w-3 h-3 text-slate-400" strokeWidth={1.75} />
                        <span>Ország:</span>
                        <span className="font-medium text-slate-200">
                          Spanyolország
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-slate-400" strokeWidth={1.75} />
                        <span>Csapatok:</span>
                        <span className="font-medium text-slate-200">
                          16 / 20 betöltve
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <RefreshCcw className="w-3 h-3 text-slate-400" strokeWidth={1.75} />
                        <span>Szinkron:</span>
                        <span className="font-medium text-emerald-400">
                          Automatikus
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 bg-black/40">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-[11px] text-left text-slate-200">
                        <thead>
                          <tr className="bg-gradient-to-r from-white/5 via-slate-900/80 to-slate-950/80">
                            <th className="px-4 sm:px-6 py-3.5 font-medium text-slate-400">
                              <div className="flex items-center gap-1">
                                <span>Pos</span>
                                <button className="inline-flex">
                                  <ChevronsUpDown className="w-3 h-3 text-slate-500" strokeWidth={1.75} />
                                </button>
                              </div>
                            </th>
                            <th className="px-4 sm:px-6 py-3.5 font-medium text-slate-400">
                              <div className="flex items-center gap-1">
                                <span>Csapat</span>
                                <button className="inline-flex">
                                  <ChevronsUpDown className="w-3 h-3 text-slate-500" strokeWidth={1.75} />
                                </button>
                              </div>
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              P
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              W
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              D
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              L
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              GF
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              GA
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              GD
                            </th>
                            <th className="px-3 sm:px-4 py-3.5 font-medium text-slate-400 text-center">
                              Pts
                            </th>
                            <th className="px-4 sm:px-6 py-3.5 font-medium text-slate-400">
                              Patterns
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {tableData.map(team => <tr key={team.position} className={`${team.indicator === 'emerald' ? 'bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent' : team.indicator === 'rose' ? 'bg-gradient-to-r from-rose-500/5 via-rose-500/0 to-transparent' : ''}`}>
                              <td className="px-4 sm:px-6 py-3 align-middle text-center">
                                <span className="text-[11px] font-semibold text-slate-50">
                                  {team.position}
                                </span>
                              </td>
                              <td className="px-4 sm:px-6 py-3 align-middle">
                                <Link to={`/teams/${team.team.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                  <div className="h-7 w-7 rounded-xl bg-cover bg-center border border-white/20 shadow-[0_0_10px_rgba(30,41,59,0.5)]" style={{
                                backgroundImage: `url(${team.logo})`
                              }}></div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="text-[11px] font-medium text-slate-50">
                                        {team.team}
                                      </p>
                                      {team.alertActive && <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 border border-amber-500/30">
                                          <Bell className="w-2.5 h-2.5 text-amber-400" strokeWidth={1.75} />
                                        </span>}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px]">
                                      {team.form.map((result, idx) => <span key={idx} className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded text-[8px] font-semibold ${result === 'W' ? 'bg-emerald-500 text-white' : result === 'D' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'}`}>
                                          {result}
                                        </span>)}
                                    </div>
                                  </div>
                                </Link>
                              </td>
                              <td className="px-2 py-3 text-center align-middle">
                                {team.played}
                              </td>
                              <td className={`px-2 py-3 text-center align-middle ${team.won > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                                {team.won}
                              </td>
                              <td className="px-2 py-3 text-center align-middle text-slate-300">
                                {team.drawn}
                              </td>
                              <td className={`px-2 py-3 text-center align-middle ${team.lost > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                                {team.lost}
                              </td>
                              <td className="px-2 py-3 text-center align-middle">
                                {team.goalsFor}
                              </td>
                              <td className="px-2 py-3 text-center align-middle">
                                {team.goalsAgainst}
                              </td>
                              <td className={`px-2 py-3 text-center align-middle font-medium ${team.goalDifference > 0 ? 'text-emerald-400' : team.goalDifference < 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                                {team.goalDifference > 0 ? '+' : ''}
                                {team.goalDifference}
                              </td>
                              <td className="px-3 sm:px-4 py-3 text-center align-middle text-[11px] font-semibold text-slate-50">
                                {team.points}
                              </td>
                              <td className="px-4 sm:px-6 py-3 align-middle">
                                <div className="flex items-center gap-1">
                                  {team.patterns.map((pattern, idx) => <span key={idx} className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-400" title={pattern}>
                                      {getPatternIcon(pattern)}
                                    </span>)}
                                  {team.patterns.length === 0 && <span className="text-[10px] text-slate-500">
                                      -
                                    </span>}
                                </div>
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-6 py-3 border-t border-white/10 bg-gradient-to-r from-slate-950/90 via-black to-slate-950/90">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <Sparkles className="w-3 h-3 text-indigo-400" strokeWidth={1.75} />
                        <span>
                          Pattern-ek:{' '}
                          <Flame className="w-3 h-3 inline text-orange-400" />{' '}
                          High Scoring,{' '}
                          <TrendingUp className="w-3 h-3 inline text-emerald-400" />{' '}
                          Comeback
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 text-[10px] text-slate-400">
                        <Bell className="w-3 h-3 text-amber-400" strokeWidth={1.75} />
                        <span>Aktív alertek: 2 csapat</span>
                      </div>
                    </div>
                  </div>
                </Tabs.Content>
                {/* Forma Content */}
                <Tabs.Content value="Forma" className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-950/90 to-black/95 backdrop-blur-3xl shadow-[0_0_20px_rgba(30,41,59,0.7)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex flex-col gap-3 px-4 sm:px-6 pt-4 pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-400 to-fuchsia-400 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                          <LineChart className="w-4 h-4 text-slate-950" strokeWidth={1.75} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold tracking-tight text-slate-50">
                            Csapat forma elemzés
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Utolsó 5 meccs eredményei
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-slate-300 hover:bg-white/5 transition-colors">
                          <span>Szűrés csapat szerint</span>
                        </button>
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-slate-300 hover:bg-white/5 transition-colors">
                          <span>Rendezés</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 bg-black/40">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-[11px] text-left text-slate-200">
                        <thead>
                          <tr className="bg-gradient-to-r from-white/5 via-slate-900/80 to-slate-950/80">
                            <th className="px-4 sm:px-6 py-3.5 font-medium text-slate-400">
                              Pos
                            </th>
                            <th className="px-4 sm:px-6 py-3.5 font-medium text-slate-400">
                              Csapat
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              P
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              GF
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              GA
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              GD
                            </th>
                            <th className="px-3 sm:px-4 py-3.5 font-medium text-slate-400 text-center">
                              Pts
                            </th>
                            <th className="px-4 sm:px-6 py-3.5 font-medium text-slate-400">
                              Forma
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {tableData.map(team => <tr key={team.position} className="hover:bg-white/5 transition-colors">
                              <td className="px-4 sm:px-6 py-3 align-middle">
                                <span className="text-[11px] font-medium text-slate-100">
                                  {team.position}
                                </span>
                              </td>
                              <td className="px-4 sm:px-6 py-3 align-middle">
                                <div className="flex items-center gap-3">
                                  <div className="h-7 w-7 rounded-xl bg-cover bg-center border border-white/20 shadow-[0_0_10px_rgba(30,41,59,0.5)]" style={{
                                backgroundImage: `url(${team.logo})`
                              }}></div>
                                  <p className="text-[11px] font-medium text-slate-50">
                                    {team.team}
                                  </p>
                                </div>
                              </td>
                              <td className="px-2 py-3 text-center align-middle">
                                {team.played}
                              </td>
                              <td className="px-2 py-3 text-center align-middle">
                                {team.goalsFor}
                              </td>
                              <td className="px-2 py-3 text-center align-middle">
                                {team.goalsAgainst}
                              </td>
                              <td className={`px-2 py-3 text-center align-middle font-medium ${team.goalDifference > 0 ? 'text-emerald-400' : team.goalDifference < 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                                {team.goalDifference > 0 ? '+' : ''}
                                {team.goalDifference}
                              </td>
                              <td className="px-3 sm:px-4 py-3 text-center align-middle text-[11px] font-semibold text-slate-50">
                                {team.points}
                              </td>
                              <td className="px-4 sm:px-6 py-3 align-middle">
                                <div className="flex items-center gap-1">
                                  {team.form.map((result, idx) => <span key={idx} className={`inline-flex h-6 w-6 items-center justify-center rounded text-[10px] font-semibold ${getFormBadgeColor(result)} text-white`}>
                                      {result}
                                    </span>)}
                                </div>
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tabs.Content>
                {/* Meccsek Content */}
                <Tabs.Content value="Meccsek" className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-950/90 to-black/95 backdrop-blur-3xl shadow-[0_0_20px_rgba(30,41,59,0.7)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex flex-col gap-3 px-4 sm:px-6 pt-4 pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-rose-500 via-orange-400 to-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                          <Trophy className="w-4 h-4 text-slate-950" strokeWidth={1.75} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold tracking-tight text-slate-50">
                            Meccsek
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Összes mérkőzés eredménye
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-slate-300 hover:bg-white/5 transition-colors">
                          <span>Minden forduló</span>
                        </button>
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-slate-300 hover:bg-white/5 transition-colors">
                          <span>Minden csapat</span>
                        </button>
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-slate-300 hover:bg-white/5 transition-colors">
                          <span>Rendezés</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 bg-black/40">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-[11px] text-left text-slate-200">
                        <thead>
                          <tr className="bg-gradient-to-r from-white/5 via-slate-900/80 to-slate-950/80">
                            <th className="px-4 sm:px-6 py-3.5 font-medium text-slate-400">
                              Dátum
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              Forduló
                            </th>
                            <th className="px-4 sm:px-6 py-3.5 font-medium text-slate-400 text-right">
                              Hazai csapat
                            </th>
                            <th className="px-3 py-3.5 font-medium text-slate-400 text-center">
                              Eredmény
                            </th>
                            <th className="px-4 sm:px-6 py-3.5 font-medium text-slate-400">
                              Vendég csapat
                            </th>
                            <th className="px-2 py-3.5 font-medium text-slate-400 text-center">
                              Kimenetel
                            </th>
                            <th className="px-4 sm:px-6 py-3.5 font-medium text-slate-400 text-center">
                              Műveletek
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {matchesData.map((match, idx) => <tr key={idx} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate(`/matches/match-${idx + 1}`)}>
                              <td className="px-4 sm:px-6 py-3 align-middle text-slate-300">
                                {match.date}
                              </td>
                              <td className="px-2 py-3 text-center align-middle text-slate-400">
                                {match.round}
                              </td>
                              <td className="px-4 sm:px-6 py-3 align-middle text-right">
                                <span className="text-slate-50 font-medium">
                                  {match.homeTeam}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-center align-middle">
                                <span className="text-slate-50 font-semibold">
                                  {match.score}
                                </span>
                              </td>
                              <td className="px-4 sm:px-6 py-3 align-middle">
                                <span className="text-slate-50 font-medium">
                                  {match.awayTeam}
                                </span>
                              </td>
                              <td className="px-2 py-3 text-center align-middle">
                                {getResultBadge(match.result)}
                              </td>
                              <td className="px-4 sm:px-6 py-3 text-center align-middle">
                                <button onClick={() => setSelectedMatch(match)} className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/60 hover:bg-white/5 transition-colors">
                                  <Eye className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.75} />
                                </button>
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tabs.Content>
                {/* Analitika Content */}
                <Tabs.Content value="Analitika" className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-950/90 to-black/95 backdrop-blur-3xl shadow-[0_0_20px_rgba(30,41,59,0.7)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex flex-col gap-3 px-4 sm:px-6 pt-4 pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-violet-500 via-purple-400 to-fuchsia-400 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                          <BarChart3 className="w-4 h-4 text-slate-950" strokeWidth={1.75} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold tracking-tight text-slate-50">
                            Pattern Analysis
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Define, analyze, and discover patterns in your
                            soccer match data.
                          </p>
                        </div>
                      </div>
                      <Link to="/patterns" className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5 transition-colors">
                        <span>View Full Analysis</span>
                      </Link>
                    </div>
                    {/* Filters */}
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
                          <option>San Sebastian</option>
                          <option>Barcelona</option>
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
                          <option>2021-2022</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 mb-1.5">
                          Filter by Date Range
                        </label>
                        <button className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs text-slate-400 text-left hover:bg-white/5 transition-colors flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
                          <span>Pick a date range</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-xs font-medium text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-shadow">
                        <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Discover Patterns (ML)</span>
                      </button>
                    </div>
                  </div>
                  {/* Pattern Tabs */}
                  <div className="border-t border-white/10 bg-black/40">
                    <div className="flex border-b border-white/10">
                      <button className="inline-flex items-center gap-2 px-6 py-3 text-xs font-medium text-slate-50 border-b-2 border-indigo-500 bg-gradient-to-t from-indigo-500/10 to-transparent">
                        <Info className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Pattern Definitions</span>
                      </button>
                      <button className="inline-flex items-center gap-2 px-6 py-3 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors">
                        <BarChart3 className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Analysis Results</span>
                      </button>
                    </div>
                    {/* Pattern Cards */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-slate-200">
                          Your Patterns
                        </h3>
                        <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5 transition-colors">
                          <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
                          <span>Add Pattern</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Pattern Card 1 */}
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-950/50 p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-sm font-semibold text-slate-50 mb-1">
                                Home Team Comeback
                              </h4>
                              <p className="text-[11px] text-slate-400">
                                Home team was losing at HT but won at FT.
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <button className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/60 hover:bg-white/5 transition-colors">
                                <span className="text-slate-300 text-sm">
                                  ✏️
                                </span>
                              </button>
                              <button className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/60 hover:bg-rose-500/20 hover:border-rose-500/30 transition-colors">
                                <span className="text-slate-300 text-sm">
                                  🗑️
                                </span>
                              </button>
                            </div>
                          </div>
                          <div className="mb-3">
                            <p className="text-[10px] font-medium text-slate-400 mb-2">
                              Conditions:
                            </p>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                                <span className="inline-flex h-1 w-1 rounded-full bg-emerald-400"></span>
                                <span>score_change {'>'} turnaround</span>
                              </div>
                            </div>
                          </div>
                          <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-[0_0_10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_15px_rgba(79,70,229,0.7)] transition-shadow">
                            <Activity className="w-3.5 h-3.5" strokeWidth={1.75} />
                            <span>Run Analysis</span>
                          </button>
                        </div>
                        {/* Pattern Card 2 */}
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-950/50 p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-sm font-semibold text-slate-50 mb-1">
                                High Scoring Match (4+ goals)
                              </h4>
                              <p className="text-[11px] text-slate-400">
                                Total goals in the match is 4 or more.
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <button className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/60 hover:bg-white/5 transition-colors">
                                <span className="text-slate-300 text-sm">
                                  ✏️
                                </span>
                              </button>
                              <button className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/60 hover:bg-rose-500/20 hover:border-rose-500/30 transition-colors">
                                <span className="text-slate-300 text-sm">
                                  🗑️
                                </span>
                              </button>
                            </div>
                          </div>
                          <div className="mb-3">
                            <p className="text-[10px] font-medium text-slate-400 mb-2">
                              Conditions:
                            </p>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                                <span className="inline-flex h-1 w-1 rounded-full bg-emerald-400"></span>
                                <span>
                                  Custom: (ft_home + ft_away) {'>'}= 4
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-[0_0_10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_15px_rgba(79,70,229,0.7)] transition-shadow">
                            <Activity className="w-3.5 h-3.5" strokeWidth={1.75} />
                            <span>Run Analysis</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs.Content>
                <Tabs.Content value="Értesítések" className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-950/90 to-black/95 backdrop-blur-3xl shadow-[0_0_20px_rgba(30,41,59,0.7)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex flex-col gap-3 px-4 sm:px-6 pt-4 pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-rose-500 via-orange-400 to-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                          <BellRing className="w-4 h-4 text-slate-950" strokeWidth={1.75} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold tracking-tight text-slate-50">
                            Alerts
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Configure alerts for pattern detection
                          </p>
                        </div>
                      </div>
                      <Link to="/alerts" className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5 transition-colors">
                        <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Manage Alerts</span>
                      </Link>
                    </div>
                  </div>
                  <div className="border-t border-white/10 bg-black/40 p-8 sm:p-12">
                    <div className="flex flex-col items-center gap-4 text-center max-w-md mx-auto">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(244,63,94,0.3)]">
                        <BellRing className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">
                          No Alerts Configured
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">
                          Create alerts to get notified when patterns are
                          detected
                        </p>
                      </div>
                      <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/60 px-4 py-2 text-xs text-slate-200 hover:bg-white/5 transition-colors">
                        <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Add Alert</span>
                      </button>
                    </div>
                  </div>
                </Tabs.Content>
              </div>
            </Tabs.Root>
          </div>
        </main>
      </div>

      {/* Modals */}
      <SearchModal open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen} />
      <ImportMatchesModal open={isImportModalOpen} onOpenChange={setIsImportModalOpen} onImport={handleImportMatches} />
      <PremiumModal open={isPremiumModalOpen} onOpenChange={setIsPremiumModalOpen} />

      {/* Match Details Dialog */}
      <Dialog.Root open={selectedMatch !== null} onOpenChange={open => !open && setSelectedMatch(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/95 via-black to-slate-900/95 backdrop-blur-3xl shadow-[0_0_30px_rgba(30,41,59,0.9)] animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-slate-950" strokeWidth={1.75} />
                </div>
                <div>
                  <Dialog.Title className="text-sm font-semibold text-slate-50">
                    Meccs részletek
                  </Dialog.Title>
                  <p className="text-[10px] text-slate-400">
                    {selectedMatch?.date}
                  </p>
                </div>
                <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/30">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Befejezett
                </span>
              </div>
              <Dialog.Close asChild>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 hover:bg-white/5 transition-colors">
                  <X className="w-4 h-4 text-slate-300" strokeWidth={1.75} />
                </button>
              </Dialog.Close>
            </div>
            {selectedMatch && <div className="p-6 space-y-6">
                {/* Score Display */}
                <div className="flex items-center justify-between gap-8 p-6 rounded-2xl bg-gradient-to-r from-white/5 via-slate-900/50 to-white/5 border border-white/10">
                  <div className="flex-1 text-center">
                    <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-lg font-bold">
                      S
                    </div>
                    <p className="text-sm font-semibold text-slate-50">
                      {selectedMatch.homeTeam}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-50 mb-1">
                      {selectedMatch.score}
                    </div>
                    <p className="text-[10px] text-slate-400">HT: 0 - 1</p>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-lg font-bold">
                      B
                    </div>
                    <p className="text-sm font-semibold text-slate-50">
                      {selectedMatch.awayTeam}
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
                        Jan 14, 2024
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                    <Clock className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                    <div>
                      <p className="text-[10px] text-slate-400">Időpont</p>
                      <p className="text-xs font-medium text-slate-200">
                        11:53 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                    <MapPin className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                    <div>
                      <p className="text-[10px] text-slate-400">Helyszín</p>
                      <p className="text-xs font-medium text-slate-200">
                        Stadion
                      </p>
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
              </div>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>;
};
export default Dashboard;