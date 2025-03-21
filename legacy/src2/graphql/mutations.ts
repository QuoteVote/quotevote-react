import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: MessageInput!) {
    createMessage(input: $input) {
      _id
      content
      createdAt
      messageRoomId
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

export const READ_MESSAGES = gql`
  mutation ReadMessages($messageRoomId: String!) {
    readMessages(messageRoomId: $messageRoomId) {
      success
      unreadCount
    }
  }
`;

export const ADD_MESSAGE_REACTION = gql`
  mutation AddMessageReaction($input: MessageReactionInput!) {
    addMessageReaction(input: $input) {
      _id
      userId
      messageId
      emoji
    }
  }
`;

export const REMOVE_MESSAGE_REACTION = gql`
  mutation RemoveMessageReaction($messageId: ID!, $emoji: String!) {
    removeMessageReaction(messageId: $messageId, emoji: $emoji) {
      _id
      userId
      messageId
      emoji
    }
  }
`;

export const CREATE_CHAT_ROOM = gql`
  mutation CreateChatRoom($input: ChatRoomInput!) {
    createMessageRoom(input: $input) {
      _id
      title
      messageType
      avatar {
        url
      }
      participants {
        _id
        name
        avatar {
          url
        }
      }
    }
  }
`; 