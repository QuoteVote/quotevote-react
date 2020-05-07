import gql from 'graphql-tag'

export const GROUPS_QUERY = gql`
query groups($limit: Int!) {
  groups(limit: $limit) {
    _id
    creatorId
    adminIds
    allowedUserIds
    privacy
    title
    url
    description
  }
}
`

export const USER_INVITE_REQUESTS = gql`
  query userInviteRequests {
    userInviteRequests {
      email
      status
      _id
    }
  }
`
export const GET_POST = gql`
  query post($postId: String!) {
    post(postId: $postId) 
  }
`

export const SEARCH = gql`
  query search($text: String!) {
    searchContent(text: $text) {
      _id
      title
      creatorId
      domain {
        key
        _id
      }
    }
    searchCreator(text: $text) {
      _id
      name
      avatar
      creator {
        _id
      }
    }
  }
`

export const GET_BOOK_MARKED = gql`
  query getBookmarkedContents {
    getBookmarkedContents {
      lastMessage
    }
  } 
`

export const GET_TOP_POSTS = gql`
  query topPosts($limit: Int!, $offset: Int!, $searchKey: String!) {
    posts(limit: $limit, offset: $offset, searchKey: $searchKey)
  }
`
