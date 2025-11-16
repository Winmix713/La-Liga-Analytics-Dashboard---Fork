import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PatternProvider } from './contexts/PatternContext';
import { AlertProvider } from './contexts/AlertContext';
import { App } from './App';
import { TeamDetails } from './pages/TeamDetails';
import { MatchDetails } from './pages/MatchDetails';
import { PatternAnalysis } from './pages/PatternAnalysis';
import { AlertsManagement } from './pages/AlertsManagement';
export function AppRouter() {
  return <BrowserRouter>
      <PatternProvider>
        <AlertProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/teams/:teamId" element={<TeamDetails />} />
            <Route path="/matches/:matchId" element={<MatchDetails />} />
            <Route path="/patterns" element={<PatternAnalysis />} />
            <Route path="/alerts" element={<AlertsManagement />} />
          </Routes>
        </AlertProvider>
      </PatternProvider>
    </BrowserRouter>;
}