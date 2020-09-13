import gql from 'graphql-tag'

export const ACTIVITIES_QUERY = gql`
  query activities($limit: Int!, $offset: Int!, $searchKey: String!, $startDateRange: String, $activityEvent: JSON!) {
    activities(limit: $limit, offset: $offset, searchKey: $searchKey, startDateRange: $startDateRange, activityEvent: $activityEvent)
  }
`
