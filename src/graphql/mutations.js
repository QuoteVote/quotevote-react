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
      messageRoomId
      title
      text
      type
      created
    }
  }
`
