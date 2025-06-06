import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER ? `${process.env.REACT_APP_SERVER}/graphql` : 'http://localhost:5000/graphql',
  credentials: 'include',
  headers: {
    authorization: localStorage.getItem('token') || '',
  },
})

// Create a WebSocket link:
const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(createClient({
  url: process.env.REACT_APP_SERVER_WS ? `${process.env.REACT_APP_SERVER_WS}/graphql` : 'ws://localhost:5000/graphql',
  connectionParams: () => ({
    authToken: localStorage.getItem('token'),
  }),
  retryAttempts: 5,
  shouldRetry: () => true,
})) : null

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = typeof window !== 'undefined' ? split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
) : httpLink

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchKey: {
          read() {
            return ''
          },
        },
        startDateRange: {
          read() {
            return ''
          },
        },
        networkStatus: {
          read() {
            return {
              __typename: 'NetworkStatus',
              isConnected: false,
            }
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  link,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

export default client
