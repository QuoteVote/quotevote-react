declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_GRAPHQL_URL: string;
      NEXT_PUBLIC_WS_URL: string;
      // Add other environment variables here
    }
  }
}

export {}; 