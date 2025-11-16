import React, { useCallback, useState, createContext, useContext, type ReactNode } from 'react';
import { getRepository } from '../repositories/factory';
import type { Pattern, PatternAnalysisResult } from '../types';
interface PatternContextState {
  patterns: Pattern[];
  selectedPattern: Pattern | null;
  analysisResult: PatternAnalysisResult | null;
  loading: boolean;
  error: string | null;
}
interface PatternContextActions {
  loadPatterns: (leagueId: string) => Promise<void>;
  createPattern: (data: Omit<Pattern, 'id'>) => Promise<Pattern>;
  updatePattern: (patternId: string, data: Partial<Pattern>) => Promise<Pattern>;
  deletePattern: (patternId: string) => Promise<void>;
  selectPattern: (patternId: string | null) => void;
  analyzePattern: (patternId: string, leagueId: string) => Promise<PatternAnalysisResult>;
  clearError: () => void;
}
type PatternContextValue = PatternContextState & PatternContextActions;
const PatternContext = createContext<PatternContextValue | undefined>(undefined);
interface PatternProviderProps {
  children: ReactNode;
}
export function PatternProvider({
  children
}: PatternProviderProps) {
  const [state, setState] = useState<PatternContextState>({
    patterns: [],
    selectedPattern: null,
    analysisResult: null,
    loading: false,
    error: null
  });
  const loadPatterns = useCallback(async (leagueId: string) => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const repo = getRepository();
      const patterns = await repo.patterns.getPatterns(leagueId);
      setState(prev => ({
        ...prev,
        patterns,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load patterns'
      }));
    }
  }, []);
  const createPattern = useCallback(async (data: Omit<Pattern, 'id'>): Promise<Pattern> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const repo = getRepository();
      const newPattern = await repo.patterns.createPattern(data);
      setState(prev => ({
        ...prev,
        patterns: [...prev.patterns, newPattern],
        loading: false
      }));
      return newPattern;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to create pattern'
      }));
      throw error;
    }
  }, []);
  const updatePattern = useCallback(async (patternId: string, data: Partial<Pattern>): Promise<Pattern> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const repo = getRepository();
      const updatedPattern = await repo.patterns.updatePattern(patternId, data);
      setState(prev => ({
        ...prev,
        patterns: prev.patterns.map(p => p.id === patternId ? updatedPattern : p),
        selectedPattern: prev.selectedPattern?.id === patternId ? updatedPattern : prev.selectedPattern,
        loading: false
      }));
      return updatedPattern;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to update pattern'
      }));
      throw error;
    }
  }, []);
  const deletePattern = useCallback(async (patternId: string): Promise<void> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const repo = getRepository();
      await repo.patterns.deletePattern(patternId);
      setState(prev => ({
        ...prev,
        patterns: prev.patterns.filter(p => p.id !== patternId),
        selectedPattern: prev.selectedPattern?.id === patternId ? null : prev.selectedPattern,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to delete pattern'
      }));
      throw error;
    }
  }, []);
  const selectPattern = useCallback((patternId: string | null) => {
    if (patternId === null) {
      setState(prev => ({
        ...prev,
        selectedPattern: null,
        analysisResult: null
      }));
      return;
    }
    const pattern = state.patterns.find(p => p.id === patternId);
    if (pattern) {
      setState(prev => ({
        ...prev,
        selectedPattern: pattern
      }));
    }
  }, [state.patterns]);
  const analyzePattern = useCallback(async (patternId: string, leagueId: string): Promise<PatternAnalysisResult> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const repo = getRepository();
      const result = await repo.patterns.analyzePattern(patternId, leagueId);
      setState(prev => ({
        ...prev,
        analysisResult: result,
        loading: false
      }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to analyze pattern'
      }));
      throw error;
    }
  }, []);
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null
    }));
  }, []);
  const value: PatternContextValue = {
    ...state,
    loadPatterns,
    createPattern,
    updatePattern,
    deletePattern,
    selectPattern,
    analyzePattern,
    clearError
  };
  return <PatternContext.Provider value={value}>{children}</PatternContext.Provider>;
}
export function usePatternContext(): PatternContextValue {
  const context = useContext(PatternContext);
  if (context === undefined) {
    throw new Error('usePatternContext must be used within a PatternProvider');
  }
  return context;
}