// Core domain types
export interface Team {
  id: string;
  name: string;
  logo: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: FormResult[];
  patterns: PatternType[];
  alertActive: boolean;
  indicator: 'emerald' | 'slate' | 'rose';
}
export type FormResult = 'W' | 'D' | 'L';
export type PatternType = 'high_scoring' | 'home_comeback' | 'custom';
export interface Match {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamId: string;
  awayTeamId: string;
  score: string;
  result: FormResult;
  round: string;
  patterns: PatternType[];
  alertTriggered: boolean;
  htScore?: string;
  ftScore?: string;
  events?: MatchEvent[];
}
export interface MatchEvent {
  id: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
  minute: number;
  player: string;
  team: 'home' | 'away';
  description?: string;
}
export interface Pattern {
  id: string;
  name: string;
  description: string;
  type: PatternType;
  conditions: PatternCondition[];
  icon?: string;
}
export interface PatternCondition {
  field: string;
  operator: 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'neq';
  value: string | number;
  logic?: 'AND' | 'OR';
}
export interface Alert {
  id: string;
  name: string;
  pattern: string;
  patternId: string;
  condition: string;
  action: 'email' | 'push' | 'email_push';
  status: 'active' | 'paused' | 'disabled';
  triggeredCount: number;
  lastTriggered?: string;
  createdAt: string;
  updatedAt: string;
}
export interface League {
  id: string;
  name: string;
  country: string;
  season: string;
  teamsCount: number;
  teamsLoaded: number;
  syncEnabled: boolean;
  lastUpdate: string;
}
// Analysis types
export interface PatternAnalysisResult {
  patternId: string;
  patternName: string;
  matchCount: number;
  matches: Match[];
  statistics: {
    totalOccurrences: number;
    byTeam: Record<string, number>;
    byRound: Record<string, number>;
    successRate?: number;
  };
}
export interface FormAnalysis {
  teamId: string;
  teamName: string;
  currentForm: FormResult[];
  formPoints: number;
  trend: 'improving' | 'declining' | 'stable';
  lastFiveMatches: Match[];
}
// Filter types
export interface MatchFilters {
  teams?: string[];
  dateFrom?: string;
  dateTo?: string;
  rounds?: string[];
  patterns?: PatternType[];
  results?: FormResult[];
}
export interface TeamFilters {
  positions?: number[];
  minPoints?: number;
  maxPoints?: number;
  patterns?: PatternType[];
  alertsOnly?: boolean;
}