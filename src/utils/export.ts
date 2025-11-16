/**
 * Export utility functions for data export
 */

export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvContent = [headers.join(','),
  // Header row
  ...data.map(row => headers.map(header => {
    const value = row[header];
    // Escape commas and quotes
    if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }).join(','))].join('\n');
  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
}
export function exportToJSON(data: any[], filename: string) {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
}
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], {
    type: mimeType
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
export function exportTableToCSV(tableData: any[], filename: string = 'la-liga-table') {
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
export function exportMatchesToCSV(matchesData: any[], filename: string = 'matches') {
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