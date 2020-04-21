import gql from 'graphql-tag'

export const DOMAIN_QUERY = gql`
query domains($limit: Int!) {
  domains(limit: $limit) {
    _id
    adminIds
    allowedUserIds
    key
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
export const GET_CONTENT = gql`
  query content($contentId: String!, $key: String!) {
    content(contentId: $contentId) {
      creatorId
      _id
      title
      text
      thumbnail
      created
      creator {
        name
        profileImageUrl
        scoreDetails {
          upvotes
          downvotes
          total
        }
      }
      scoreDetails {
        upvotes
        downvotes
        total
      }
      comments {
        _id
        userId
        text
        hashtags
        created
        quote
      }
    }
    domain(key: $key) {
      _id
      allowedUserIds
      pendingUserIds
      adminIds
      privacy
    }
    userContentChatRoom(contentId: $contentId) {
      _id
      users
      messageType
    }
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
