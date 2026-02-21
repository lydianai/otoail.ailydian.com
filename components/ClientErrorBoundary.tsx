'use client';

// ============================================
// TÜRK OTO AI - Client Error Boundary Wrapper
// Wraps ErrorBoundary for use in server components
// ============================================

import React, { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface ClientErrorBoundaryProps {
  children: ReactNode;
}

export default function ClientErrorBoundary({ children }: ClientErrorBoundaryProps) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.error('[ClientErrorBoundary] Error caught:', error);
          console.error('[ClientErrorBoundary] Error info:', errorInfo);
        }

        // In production, send to error tracking service
        // TODO: Integrate with Sentry or similar service
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
