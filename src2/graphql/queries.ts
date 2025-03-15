import { gql } from '@apollo/client';

export const GET_ROOM_MESSAGES = gql`
  query GetRoomMessages($messageRoomId: String!, $limit: Int, $offset: Int) {
    messages(messageRoomId: $messageRoomId, limit: $limit, offset: $offset) {
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

export const GET_MESSAGE_REACTIONS = gql`
  query GetMessageReactions($messageId: ID!) {
    messageReactions(messageId: $messageId) {
      _id
      userId
      messageId
      emoji
    }
  }
`;

export const GET_CHAT_ROOMS = gql`
  query GetChatRooms {
    messageRooms {
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

export const GET_POST = gql`
  query GetPost($postId: ID!) {
    post(postId: $postId) {
      _id
      title
      content
      createdAt
      author {
        _id
        name
        avatar {
          url
        }
      }
      likes
      comments
      shares
      messageRoom {
        _id
      }
    }
`;

export const GET_RECENT_ACTIVITIES = gql`
  query GetRecentActivities {
    recentActivities {
      _id
      type
      content
      createdAt
      user {
        name
        avatar {
          url
        }
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    profile {
      _id
      name
      email
      bio
      avatar {
        url
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      _id
      name
      bio
      avatar {
        url
      }
    }
  }
`; 