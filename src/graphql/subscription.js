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
