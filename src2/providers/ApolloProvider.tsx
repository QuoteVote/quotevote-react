'use client';

import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo';

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseApolloProvider client={client}>
      {children}
    </BaseApolloProvider>
  );
} 