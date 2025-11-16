import { usePatternContext } from '../contexts/PatternContext';

/**
 * Custom hook to access pattern context
 * Provides patterns state and actions
 */
export function usePatterns() {
  return usePatternContext();
}