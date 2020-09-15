import gql from 'graphql-tag'

export const CREATE_GROUP = gql`
  mutation createGroup($group: GroupInput!) {
    createGroup(group: $group) {
      _id
      title
      description
      url
      created
    }
  }`

export const SUBMIT_POST = gql`
  mutation addPost($post: PostInput!) {
    addPost(post: $post) {
      _id
      url
    }
  }
`

export const APPROVE_POST = gql`
  mutation approvePost($postId: String!, $userId: String!) {
    approvePost(postId: $postId, userId: $userId) {
      _id
    }
  }
`

export const REJECT_POST = gql`
  mutation rejectPost($postId: String!, $userId: String!) {
    rejectPost(postId: $postId, userId: $userId) {
      _id
    }
  }
`

export const UPDATE_USER_INVITE_STATUS = gql`
  mutation sendUserInviteApproval($user_invite_id: String!, $action: String!) {
    sendUserInviteApproval(user_invite_id: $user_invite_id, action: $action)
  }
`

export const VOTE = gql`
  mutation addVote($vote: VoteInput!) {
    addVote(vote: $vote) {
      postId
      type
    }
  }
`

export const ADD_COMMENT = gql`
  mutation addComment($comment: CommentInput!) {
    addComment(comment: $comment) {
      _id
    }
  }
`

export const UPDATE_POST_BOOKMARK = gql`
  mutation updatePostBookmark($postId: String!, $userId: String!) {
    updatePostBookmark(postId: $postId, userId: $userId) {
      _id,
      bookmarkedBy
    }
  }
`
export const SEND_MESSAGE = gql`
  mutation chat($message: MessageInput!) {
    createMessage(message: $message) {
      _id
      userId
      userName
      messageRoomId
      title
      text
      type
      created
    }
  }
`

export const FOLLOW_MUTATION = gql`
  mutation followUser($user_id: String!, $action: String!) {
    followUser(user_id: $user_id, action: $action) {
      _id
      name
    }
  }
`

export const REQUEST_USER_ACCESS_MUTATION = gql`
mutation requestUserAccess($requestUserAccessInput: RequestUserAccessInput!) {
  requestUserAccess(requestUserAccessInput: $requestUserAccessInput) {
    _id
    name
    email
  }
}
`

export const SEND_INVESTOR_EMAIL = gql`
  mutation sendInvestorMail($email: String!) {
    sendInvestorMail(email: $email)
  }
`
