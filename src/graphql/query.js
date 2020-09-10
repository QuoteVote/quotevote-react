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

export const GET_USERS = gql`
  query users {
    users {
      _id
      name
      username
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

export const GET_CHAT_ROOMS = gql`
  query chatRooms {
    messageRooms {
      _id
      users
      messageType
      created
      title
      avatar
    }
  }
`

export const GET_ROOM_MESSAGES = gql`
  query messages ($messageRoomId: String!){
    messages(messageRoomId: $messageRoomId) {
      _id
      messageRoomId
      userName
      userId
      title
      text
      type
      created
    }
  }
`

export const GET_TOP_POSTS = gql`
  query topPosts($limit: Int!, $offset: Int!, $searchKey: String!) {
    posts(limit: $limit, offset: $offset, searchKey: $searchKey)
  }
`

export const GET_USER = gql`
  query user($user_id: String!) {
    user(user_id: $user_id) {
      _id
      name
      username
      upvotes
      downvotes
      _followingId
      _followersId
    }
  }
`

export const GET_USER_ACTIVITY = gql`
  query activities($user_id: String!, $limit: Int!, $offset: Int!, $searchKey: String!, $startDateRange: String, $endDateRange: String, $activityEvent: JSON!) {
    activities(user_id: $user_id, limit: $limit, offset: $offset, searchKey: $searchKey, startDateRange: $startDateRange, endDateRange: $endDateRange, activityEvent: $activityEvent)
  }
`

export const GET_CHECK_DUPLICATE_EMAIL = gql`
  query checkDuplicateEmail($email: String!) {
    checkDuplicateEmail(email: $email)
  }
`
