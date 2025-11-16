import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PatternProvider } from './contexts/PatternContext';
import { AlertProvider } from './contexts/AlertContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { App } from './App';
import { TeamDetails } from './pages/TeamDetails';
import { MatchDetails } from './pages/MatchDetails';
import { PatternAnalysis } from './pages/PatternAnalysis';
import { AlertsManagement } from './pages/AlertsManagement';
import { NotFound } from './pages/NotFound';

export function AppRouter() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <PatternProvider>
          <AlertProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/teams/:teamId" element={<TeamDetails />} />
              <Route path="/matches/:matchId" element={<MatchDetails />} />
              <Route path="/patterns" element={<PatternAnalysis />} />
              <Route path="/alerts" element={<AlertsManagement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AlertProvider>
        </PatternProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}