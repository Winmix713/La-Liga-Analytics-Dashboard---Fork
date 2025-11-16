/**
 * Export utility functions for data export
 */

type ExportData = Record<string, string | number | boolean | null | undefined>;

export function exportToCSV(data: ExportData[], filename: string): void {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  try {
    const headers = Object.keys(data[0]);

    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          if (value === null || value === undefined) {
            return '';
          }
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return String(value);
        }).join(',')
      )
    ].join('\n');
    
    downloadFile(csvContent, `${filename}.csv`, 'text/csv');
  } catch (error) {
    console.error('Failed to export CSV:', error);
    throw new Error('CSV export failed');
  }
}

export function exportToJSON(data: ExportData[], filename: string): void {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }
  
  try {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `${filename}.json`, 'application/json');
  } catch (error) {
    console.error('Failed to export JSON:', error);
    throw new Error('JSON export failed');
  }
}
function downloadFile(content: string, filename: string, mimeType: string): void {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Failed to download file:', error);
    throw new Error('File download failed');
  }
}

interface TableTeamData {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}

interface MatchData {
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  result: string;
  round: string;
}

export function exportTableToCSV(tableData: TableTeamData[], filename: string = 'la-liga-table'): void {
  const exportData = tableData.map(team => ({
    Position: team.position,
    Team: team.team,
    Played: team.played,
    Won: team.won,
    Drawn: team.drawn,
    Lost: team.lost,
    'Goals For': team.goalsFor,
    'Goals Against': team.goalsAgainst,
    'Goal Difference': team.goalDifference,
    Points: team.points,
    Form: team.form.join('-')
  }));
  exportToCSV(exportData, filename);
}

export function exportMatchesToCSV(matchesData: MatchData[], filename: string = 'matches'): void {
  const exportData = matchesData.map(match => ({
    Date: match.date,
    'Home Team': match.homeTeam,
    'Away Team': match.awayTeam,
    Score: match.score,
    Result: match.result,
    Round: match.round
  }));
  exportToCSV(exportData, filename);
}