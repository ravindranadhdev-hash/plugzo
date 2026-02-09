
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in their child component tree,
 * log those errors, and display a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4FFF8] p-10 text-center">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-black text-[#0D1E3A] font-display">Something went wrong.</h1>
            <p className="text-gray-500 font-sans">The grid intelligence encountered a fatal sync error. Please refresh the page to reconnect.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-[#1DB954] text-white rounded-2xl font-black uppercase tracking-widest text-xs"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    // Correctly accessing children via this.props
    return this.props.children;
  }
}

export default ErrorBoundary;
