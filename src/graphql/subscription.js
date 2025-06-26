import gql from 'graphql-tag'

export const NEW_MESSAGE_SUBSCRIPTION = gql`
subscription newMessage($messageRoomId: String!) {
  message(messageRoomId: $messageRoomId) {
    _id
    messageRoomId
    userId
    userName
    title
    text
    created
    type
    mutation_type
  }
}
`

export const NEW_NOTIFICATION_SUBSCRIPTION = gql`
  subscription notification($userId: String!) {
    notification(userId: $userId) {
      _id
      userId
      userIdBy
      userBy{
        name
        avatar
      }
      label
      status
      created
      notificationType
      post {
        _id
        url
      }
    }
  }
`

export const NEW_POST_SUBSCRIPTION = gql`
  subscription newPost {
    newPost {
      _id
      userId
      title
      text
      created
      url
      upvotes
      downvotes
      bookmarkedBy
      creator { _id name username avatar }
      votes { _id startWordIndex endWordIndex type }
      comments { _id }
      quotes { _id }
      messageRoom { _id messages { _id } }
    }
  }
`
