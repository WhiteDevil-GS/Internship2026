import React from 'react';

/**
 * Surfaces React render errors instead of a blank screen.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('React error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-900">
          <div className="max-w-lg rounded-2xl border border-red-200 dark:border-red-900 bg-white dark:bg-slate-950 p-8 shadow-lg">
            <h1 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Something broke</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Check the browser console (F12) for details.
            </p>
            <pre className="text-xs overflow-auto p-4 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-800 dark:text-slate-200">
              {this.state.error?.message || String(this.state.error)}
            </pre>
            <button
              type="button"
              className="mt-6 px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
