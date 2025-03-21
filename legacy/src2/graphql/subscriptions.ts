import { gql } from '@apollo/client';

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription OnNewMessage($messageRoomId: String!) {
    messageCreated(messageRoomId: $messageRoomId) {
      _id
      content
      createdAt
      sender {
        _id
        name
        avatar {
          url
        }
      }
    }
  }
`;

export const MESSAGE_REACTION_SUBSCRIPTION = gql`
  subscription OnMessageReaction($messageId: ID!) {
    messageReactionUpdated(messageId: $messageId) {
      _id
      userId
      messageId
      emoji
    }
  }
`;

export const CHAT_ROOM_SUBSCRIPTION = gql`
  subscription OnChatRoomUpdate {
    messageRoomUpdated {
      _id
      title
      messageType
      unreadMessages
      avatar {
        url
      }
      lastMessage {
        content
        createdAt
      }
    }
  }
`; 