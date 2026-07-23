import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * ErrorBoundary — prevents a single failing block (e.g. malformed
 * content data once real content lands) from taking down the entire
 * page. React error boundaries must be class components; this is the
 * one deliberate exception to "everything else is a function component".
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('Uncaught error in application tree:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="flex min-h-screen flex-col items-center justify-center gap-s p-l text-center">
          <p className="heading-card">Something went wrong loading this page.</p>
          <p className="body-text">Please try refreshing, or contact us directly by phone or email.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
