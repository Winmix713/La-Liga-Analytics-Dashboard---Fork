import type { IDataRepository, ILeagueRepository, ITeamRepository, IMatchRepository, IPatternRepository, IAlertRepository, IAnalysisRepository } from './interfaces';
import type { Team, Match, Pattern, Alert, League, PatternAnalysisResult, FormAnalysis, MatchFilters, TeamFilters } from '../types';
// Mock data storage
const mockLeague: League = {
  id: 'la-liga-2023-24',
  name: 'La Liga',
  country: 'Spanyolország',
  season: '2023-2024',
  teamsCount: 20,
  teamsLoaded: 16,
  syncEnabled: true,
  lastUpdate: new Date().toISOString()
};
const mockTeams: Team[] = [{
  id: 'bilbao',
  position: 1,
  name: 'Bilbao',
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
  indicator: 'emerald',
  patterns: ['home_comeback', 'high_scoring'],
  alertActive: false
}, {
  id: 'villarreal',
  position: 2,
  name: 'Villarreal',
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
  id: 'madrid-feher',
  position: 3,
  name: 'Madrid Fehér',
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
  id: 'san-sebastian',
  position: 4,
  name: 'San Sebastian',
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
}];
const mockMatches: Match[] = [{
  id: 'match-1',
  date: '2024. 01. 01.',
  homeTeam: 'San Sebastian',
  awayTeam: 'Bilbao',
  homeTeamId: 'san-sebastian',
  awayTeamId: 'bilbao',
  score: '0 - 2',
  result: 'L',
  round: '15',
  patterns: ['high_scoring'],
  alertTriggered: false
}, {
  id: 'match-2',
  date: '2024. 01. 02.',
  homeTeam: 'Villarreal',
  awayTeam: 'Madrid Fehér',
  homeTeamId: 'villarreal',
  awayTeamId: 'madrid-feher',
  score: '3 - 1',
  result: 'W',
  round: '15',
  patterns: ['high_scoring'],
  alertTriggered: true
}, {
  id: 'match-3',
  date: '2024. 01. 03.',
  homeTeam: 'Bilbao',
  awayTeam: 'Villarreal',
  homeTeamId: 'bilbao',
  awayTeamId: 'villarreal',
  score: '2 - 2',
  result: 'D',
  round: '16',
  patterns: ['high_scoring', 'home_comeback'],
  alertTriggered: false
}];
const mockPatterns: Pattern[] = [{
  id: 'pattern-1',
  name: 'Home Team Comeback',
  description: 'Home team was losing at HT but won at FT.',
  type: 'home_comeback',
  conditions: [{
    field: 'score_change',
    operator: 'gt',
    value: 'turnaround'
  }]
}, {
  id: 'pattern-2',
  name: 'High Scoring Match (4+ goals)',
  description: 'Total goals in the match is 4 or more.',
  type: 'high_scoring',
  conditions: [{
    field: 'total_goals',
    operator: 'gte',
    value: 4
  }]
}];
const mockAlerts: Alert[] = [{
  id: 'alert-1',
  name: 'High Scoring Alert',
  pattern: 'High Scoring Match (4+ goals)',
  patternId: 'pattern-2',
  condition: 'Total goals >= 4',
  action: 'email',
  status: 'active',
  triggeredCount: 12,
  lastTriggered: '2024. 01. 01. 15:30',
  createdAt: '2023. 12. 01. 10:00',
  updatedAt: '2024. 01. 01. 15:30'
}];
// Repository implementations
class MockLeagueRepository implements ILeagueRepository {
  async getLeague(leagueId: string): Promise<League> {
    return Promise.resolve(mockLeague);
  }
  async updateLeague(leagueId: string, data: Partial<League>): Promise<League> {
    return Promise.resolve({
      ...mockLeague,
      ...data
    });
  }
}
class MockTeamRepository implements ITeamRepository {
  async getTeams(leagueId: string, filters?: TeamFilters): Promise<Team[]> {
    let teams = [...mockTeams];
    if (filters?.alertsOnly) {
      teams = teams.filter(t => t.alertActive);
    }
    if (filters?.patterns && filters.patterns.length > 0) {
      teams = teams.filter(t => t.patterns.some(p => filters.patterns?.includes(p)));
    }
    return Promise.resolve(teams);
  }
  async getTeam(teamId: string): Promise<Team> {
    const team = mockTeams.find(t => t.id === teamId);
    if (!team) throw new Error('Team not found');
    return Promise.resolve(team);
  }
  async updateTeam(teamId: string, data: Partial<Team>): Promise<Team> {
    const team = mockTeams.find(t => t.id === teamId);
    if (!team) throw new Error('Team not found');
    return Promise.resolve({
      ...team,
      ...data
    });
  }
}
class MockMatchRepository implements IMatchRepository {
  async getMatches(leagueId: string, filters?: MatchFilters): Promise<Match[]> {
    let matches = [...mockMatches];
    if (filters?.teams && filters.teams.length > 0) {
      matches = matches.filter(m => filters.teams?.includes(m.homeTeamId) || filters.teams?.includes(m.awayTeamId));
    }
    if (filters?.patterns && filters.patterns.length > 0) {
      matches = matches.filter(m => m.patterns.some(p => filters.patterns?.includes(p)));
    }
    return Promise.resolve(matches);
  }
  async getMatch(matchId: string): Promise<Match> {
    const match = mockMatches.find(m => m.id === matchId);
    if (!match) throw new Error('Match not found');
    return Promise.resolve(match);
  }
  async importMatches(leagueId: string, matches: Partial<Match>[]): Promise<Match[]> {
    const newMatches = matches.map((m, i) => ({
      id: `match-${Date.now()}-${i}`,
      date: m.date || '',
      homeTeam: m.homeTeam || '',
      awayTeam: m.awayTeam || '',
      homeTeamId: m.homeTeamId || '',
      awayTeamId: m.awayTeamId || '',
      score: m.score || '0 - 0',
      result: m.result || 'D',
      round: m.round || '-',
      patterns: m.patterns || [],
      alertTriggered: m.alertTriggered || false
    }));
    return Promise.resolve(newMatches);
  }
  async updateMatch(matchId: string, data: Partial<Match>): Promise<Match> {
    const match = mockMatches.find(m => m.id === matchId);
    if (!match) throw new Error('Match not found');
    return Promise.resolve({
      ...match,
      ...data
    });
  }
  async deleteMatch(matchId: string): Promise<void> {
    return Promise.resolve();
  }
}
class MockPatternRepository implements IPatternRepository {
  async getPatterns(leagueId: string): Promise<Pattern[]> {
    return Promise.resolve(mockPatterns);
  }
  async getPattern(patternId: string): Promise<Pattern> {
    const pattern = mockPatterns.find(p => p.id === patternId);
    if (!pattern) throw new Error('Pattern not found');
    return Promise.resolve(pattern);
  }
  async createPattern(data: Omit<Pattern, 'id'>): Promise<Pattern> {
    const newPattern = {
      ...data,
      id: `pattern-${Date.now()}`
    };
    return Promise.resolve(newPattern);
  }
  async updatePattern(patternId: string, data: Partial<Pattern>): Promise<Pattern> {
    const pattern = mockPatterns.find(p => p.id === patternId);
    if (!pattern) throw new Error('Pattern not found');
    return Promise.resolve({
      ...pattern,
      ...data
    });
  }
  async deletePattern(patternId: string): Promise<void> {
    return Promise.resolve();
  }
  async analyzePattern(patternId: string, leagueId: string): Promise<PatternAnalysisResult> {
    const pattern = mockPatterns.find(p => p.id === patternId);
    if (!pattern) throw new Error('Pattern not found');
    const matchingMatches = mockMatches.filter(m => m.patterns.includes(pattern.type));
    return Promise.resolve({
      patternId,
      patternName: pattern.name,
      matchCount: matchingMatches.length,
      matches: matchingMatches,
      statistics: {
        totalOccurrences: matchingMatches.length,
        byTeam: {},
        byRound: {}
      }
    });
  }
}
class MockAlertRepository implements IAlertRepository {
  async getAlerts(leagueId: string): Promise<Alert[]> {
    return Promise.resolve(mockAlerts);
  }
  async getAlert(alertId: string): Promise<Alert> {
    const alert = mockAlerts.find(a => a.id === alertId);
    if (!alert) throw new Error('Alert not found');
    return Promise.resolve(alert);
  }
  async createAlert(data: Omit<Alert, 'id' | 'createdAt' | 'updatedAt'>): Promise<Alert> {
    const now = new Date().toISOString();
    const newAlert = {
      ...data,
      id: `alert-${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };
    return Promise.resolve(newAlert);
  }
  async updateAlert(alertId: string, data: Partial<Alert>): Promise<Alert> {
    const alert = mockAlerts.find(a => a.id === alertId);
    if (!alert) throw new Error('Alert not found');
    return Promise.resolve({
      ...alert,
      ...data,
      updatedAt: new Date().toISOString()
    });
  }
  async deleteAlert(alertId: string): Promise<void> {
    return Promise.resolve();
  }
}
class MockAnalysisRepository implements IAnalysisRepository {
  async getFormAnalysis(leagueId: string): Promise<FormAnalysis[]> {
    return Promise.resolve([]);
  }
  async getTeamFormAnalysis(teamId: string): Promise<FormAnalysis> {
    const team = mockTeams.find(t => t.id === teamId);
    if (!team) throw new Error('Team not found');
    return Promise.resolve({
      teamId,
      teamName: team.name,
      currentForm: team.form,
      formPoints: team.form.filter(f => f === 'W').length * 3 + team.form.filter(f => f === 'D').length,
      trend: 'stable',
      lastFiveMatches: []
    });
  }
}
// Main repository export
export class MockDataRepository implements IDataRepository {
  leagues: ILeagueRepository;
  teams: ITeamRepository;
  matches: IMatchRepository;
  patterns: IPatternRepository;
  alerts: IAlertRepository;
  analysis: IAnalysisRepository;
  constructor() {
    this.leagues = new MockLeagueRepository();
    this.teams = new MockTeamRepository();
    this.matches = new MockMatchRepository();
    this.patterns = new MockPatternRepository();
    this.alerts = new MockAlertRepository();
    this.analysis = new MockAnalysisRepository();
  }
}
// Export singleton instance
export const mockDataRepository = new MockDataRepository();