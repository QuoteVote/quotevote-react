'use client';

import React from 'react';
import { ApolloProvider } from './ApolloProvider';
import { ReduxProvider } from './ReduxProvider';
import { AuthProvider } from '@/components/AuthProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ApolloProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
} 