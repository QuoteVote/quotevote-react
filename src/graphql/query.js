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
      joined
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
    post(postId: $postId) {
      _id
      userId
      created
      groupId
      title
      text
      url
      upvotes
      downvotes
      approvedBy
      rejectedBy
      reportedBy
      bookmarkedBy
      creator {
        _id
        name
        avatar
        username
      }
      comments {
        _id
        created
        userId
        content
        startWordIndex
        endWordIndex
        postId
        url
        reaction
        user {
          username
          name
          avatar
        }
      }
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
      user {
        name
        username
        avatar
      }
    }
  }
`

export const GET_TOP_POSTS = gql`
  query topPosts(
    $limit: Int!
    $offset: Int!
    $searchKey: String!
    $startDateRange: String
    $endDateRange: String
  ) {
    posts(
      limit: $limit
      offset: $offset
      searchKey: $searchKey
      startDateRange: $startDateRange
      endDateRange: $endDateRange
    ) {
      entities {
        _id
        userId
        title
        text
        upvotes
        downvotes
        url
        bookmarkedBy
        created
        creator {
          name
          username
          avatar
          _id
        }
      }
      pagination {
        total_count
        limit
        offset
      }
    }
  }
`

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      name
      username
      upvotes
      downvotes
      _followingId
      _followersId
      avatar
    }
  }
`

export const GET_USER_ACTIVITY = gql`
query activities(
  $user_id: String!
  $limit: Int!
  $offset: Int!
  $searchKey: String!
  $startDateRange: String
  $endDateRange: String
  $activityEvent: JSON!
) {
  activities(
    user_id: $user_id
    limit: $limit
    offset: $offset
    searchKey: $searchKey
    startDateRange: $startDateRange
    endDateRange: $endDateRange
    activityEvent: $activityEvent
  ) {
    entities {
      created
      postId
      userId
      activityType
      post {
        _id
        title
        text
        upvotes
        downvotes
        url
        bookmarkedBy
        created
        creator {
          _id
          name
          username
          avatar
        }
      }
      voteId
      vote {
        type
      }
    }
    pagination {
      total_count
      limit
      offset
    }
  }
}
`

export const GET_CHECK_DUPLICATE_EMAIL = gql`
  query checkDuplicateEmail($email: String!) {
    checkDuplicateEmail(email: $email)
  }
`
export const VERIFY_PASSWORD_RESET_TOKEN = gql`
  query verifyUserPasswordResetToken($token: String!) {
    verifyUserPasswordResetToken(token: $token)
  }
`

export const POP_PREDICTION = gql`
  query popPrediction($comment: String!) {
    popPrediction(comment: $comment)
  }
`

export const GET_FOLLOW_INFO = gql`
  query getUserFollowInfo($user_id: String! $filter: String) {
    getUserFollowInfo(user_id: $user_id, filter: $filter)
  }
`
