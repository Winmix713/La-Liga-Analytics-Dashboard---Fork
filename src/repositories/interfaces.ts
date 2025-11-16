import type { Team, Match, Pattern, Alert, League, PatternAnalysisResult, FormAnalysis, MatchFilters, TeamFilters } from '../types';
// Repository interfaces for data access
export interface ILeagueRepository {
  getLeague(leagueId: string): Promise<League>;
  updateLeague(leagueId: string, data: Partial<League>): Promise<League>;
}
export interface ITeamRepository {
  getTeams(leagueId: string, filters?: TeamFilters): Promise<Team[]>;
  getTeam(teamId: string): Promise<Team>;
  updateTeam(teamId: string, data: Partial<Team>): Promise<Team>;
}
export interface IMatchRepository {
  getMatches(leagueId: string, filters?: MatchFilters): Promise<Match[]>;
  getMatch(matchId: string): Promise<Match>;
  importMatches(leagueId: string, matches: Partial<Match>[]): Promise<Match[]>;
  updateMatch(matchId: string, data: Partial<Match>): Promise<Match>;
  deleteMatch(matchId: string): Promise<void>;
}
export interface IPatternRepository {
  getPatterns(leagueId: string): Promise<Pattern[]>;
  getPattern(patternId: string): Promise<Pattern>;
  createPattern(data: Omit<Pattern, 'id'>): Promise<Pattern>;
  updatePattern(patternId: string, data: Partial<Pattern>): Promise<Pattern>;
  deletePattern(patternId: string): Promise<void>;
  analyzePattern(patternId: string, leagueId: string): Promise<PatternAnalysisResult>;
}
export interface IAlertRepository {
  getAlerts(leagueId: string): Promise<Alert[]>;
  getAlert(alertId: string): Promise<Alert>;
  createAlert(data: Omit<Alert, 'id' | 'createdAt' | 'updatedAt'>): Promise<Alert>;
  updateAlert(alertId: string, data: Partial<Alert>): Promise<Alert>;
  deleteAlert(alertId: string): Promise<void>;
}
export interface IAnalysisRepository {
  getFormAnalysis(leagueId: string): Promise<FormAnalysis[]>;
  getTeamFormAnalysis(teamId: string): Promise<FormAnalysis>;
}
// Main repository interface combining all repositories
export interface IDataRepository {
  leagues: ILeagueRepository;
  teams: ITeamRepository;
  matches: IMatchRepository;
  patterns: IPatternRepository;
  alerts: IAlertRepository;
  analysis: IAnalysisRepository;
}