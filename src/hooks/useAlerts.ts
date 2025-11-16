import { useAlertContext } from '../contexts/AlertContext';

/**
 * Custom hook to access alert context
 * Provides alerts state and actions
 */
export function useAlerts() {
  return useAlertContext();
}