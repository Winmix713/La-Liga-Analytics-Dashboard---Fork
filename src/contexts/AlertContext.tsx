import React, { useCallback, useState, createContext, useContext, type ReactNode } from 'react';
import { getRepository } from '../repositories/factory';
import type { Alert } from '../types';
interface AlertContextState {
  alerts: Alert[];
  activeAlerts: Alert[];
  loading: boolean;
  error: string | null;
}
interface AlertContextActions {
  loadAlerts: (leagueId: string) => Promise<void>;
  createAlert: (data: Omit<Alert, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Alert>;
  updateAlert: (alertId: string, data: Partial<Alert>) => Promise<Alert>;
  deleteAlert: (alertId: string) => Promise<void>;
  toggleAlert: (alertId: string) => Promise<void>;
  clearError: () => void;
}
type AlertContextValue = AlertContextState & AlertContextActions;
const AlertContext = createContext<AlertContextValue | undefined>(undefined);
interface AlertProviderProps {
  children: ReactNode;
}
export function AlertProvider({
  children
}: AlertProviderProps) {
  const [state, setState] = useState<AlertContextState>({
    alerts: [],
    activeAlerts: [],
    loading: false,
    error: null
  });
  const updateActiveAlerts = useCallback((alerts: Alert[]) => {
    const active = alerts.filter(a => a.status === 'active');
    return active;
  }, []);
  const loadAlerts = useCallback(async (leagueId: string) => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const repo = getRepository();
      const alerts = await repo.alerts.getAlerts(leagueId);
      const activeAlerts = updateActiveAlerts(alerts);
      setState(prev => ({
        ...prev,
        alerts,
        activeAlerts,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load alerts'
      }));
    }
  }, [updateActiveAlerts]);
  const createAlert = useCallback(async (data: Omit<Alert, 'id' | 'createdAt' | 'updatedAt'>): Promise<Alert> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const repo = getRepository();
      const newAlert = await repo.alerts.createAlert(data);
      const updatedAlerts = [...state.alerts, newAlert];
      const activeAlerts = updateActiveAlerts(updatedAlerts);
      setState(prev => ({
        ...prev,
        alerts: updatedAlerts,
        activeAlerts,
        loading: false
      }));
      return newAlert;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to create alert'
      }));
      throw error;
    }
  }, [state.alerts, updateActiveAlerts]);
  const updateAlert = useCallback(async (alertId: string, data: Partial<Alert>): Promise<Alert> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const repo = getRepository();
      const updatedAlert = await repo.alerts.updateAlert(alertId, data);
      const updatedAlerts = state.alerts.map(a => a.id === alertId ? updatedAlert : a);
      const activeAlerts = updateActiveAlerts(updatedAlerts);
      setState(prev => ({
        ...prev,
        alerts: updatedAlerts,
        activeAlerts,
        loading: false
      }));
      return updatedAlert;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to update alert'
      }));
      throw error;
    }
  }, [state.alerts, updateActiveAlerts]);
  const deleteAlert = useCallback(async (alertId: string): Promise<void> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const repo = getRepository();
      await repo.alerts.deleteAlert(alertId);
      const updatedAlerts = state.alerts.filter(a => a.id !== alertId);
      const activeAlerts = updateActiveAlerts(updatedAlerts);
      setState(prev => ({
        ...prev,
        alerts: updatedAlerts,
        activeAlerts,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to delete alert'
      }));
      throw error;
    }
  }, [state.alerts, updateActiveAlerts]);
  const toggleAlert = useCallback(async (alertId: string): Promise<void> => {
    const alert = state.alerts.find(a => a.id === alertId);
    if (!alert) return;
    const newStatus = alert.status === 'active' ? 'paused' : 'active';
    await updateAlert(alertId, {
      status: newStatus
    });
  }, [state.alerts, updateAlert]);
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null
    }));
  }, []);
  const value: AlertContextValue = {
    ...state,
    loadAlerts,
    createAlert,
    updateAlert,
    deleteAlert,
    toggleAlert,
    clearError
  };
  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}
export function useAlertContext(): AlertContextValue {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
}