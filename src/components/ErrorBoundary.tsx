import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900 p-4">
          <div className="max-w-md w-full rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/95 via-black to-slate-900/95 backdrop-blur-3xl shadow-[0_0_30px_rgba(30,41,59,0.9)] p-8 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/20 border border-rose-500/30 mb-4">
              <AlertTriangle className="w-8 h-8 text-rose-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-slate-50 mb-2">
              Hiba történt
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Sajnáljuk, valami hiba történt az alkalmazás futtatása közben.
            </p>
            {this.state.error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <p className="text-xs text-rose-400 font-mono text-left break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.7)] transition-shadow"
            >
              Újrapróbálás
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
