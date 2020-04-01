import gql from "graphql-tag"

export const MESSAGE_REACTIONS_QUERY = gql`
  query userMessageReactions($messageId: String!) {
    userMessageReactions(messageId: $messageId) {
      _id
      userId
      messageId
      reaction
      created
    }
  }
`

export const MESSAGE_REACTIONS_USER_TOOLTIP_QUERY = gql`
  query userMessageReactionToolTip($messageId: String!, $reactionId: String!) {
    userMessageReactionToolTip(messageId: $messageId, reactionId: $reactionId) {
      _id
      userId
      messageId
      reaction
      created
      user {
        name
      }
    }
  }
`

export const CREATE_USER_MESSAGE_REACTION_MUTATION = gql`
  mutation createUserReaction($messageId: String!, $reaction: String!) {
    createUserReaction(messageId: $messageId, reaction: $reaction) {
      _id
      userId
      messageId
      reaction
      created
    }
  }
`

export const DELETE_USER_MESSAGE_REACTION_MUTATION = gql`
  mutation deleteUserReaction($reactionId: String!) {
    deleteUserReaction(reactionId: $reactionId) {
      _id
      userId
      messageId
      reaction
      created
    }
  }
`

export const USER_REACTION_SUBSCRIPTION = gql`
  subscription userReaction($messageId: String!) {
    userReaction(messageId: $messageId) {
      _id
      userId
      messageId
      reaction
      created
    }
  }
`

export const USER_BUDDY_LIST = gql`
  query followedUsers {
    userBuddyList
    getBookmarkedContents {
      _id
      users
      contentId
      lastMessage
    }
  }
`

export const USER_QUERY = gql`
  query userDetails($userId: String!) {
    user(user_id: $userId) {
      avatar
    }
  }
`

export const CHAT_QUERY = gql`
  query userMessages($messageRoomId: String!) {
    userMessages(messageRoomId: $messageRoomId) {
      _id
      messageRoomId
      userId
      userName
      userAvatar
      title
      text
      imageUrl
      date
    }
  }
`

export const CONTENT_CHAT_QUERY = gql`
  query chats($contentId: String!) {
    messages(contentId: $contentId) {
      _id
      contentId
      userId
      userName
      userAvatar
      title
      text
      imageUrl
      date
    }
  }
`

export const MESSAGE_MUTATION = gql`
  mutation onCreateUserMessage($message: UserMessageInput!, $userId: String!) {
    createUserMessage(message: $message, userId: $userId) {
      _id
      messageRoomId
      userName
      text
      date
    }
  }
`

export const CONTENT_MESSAGE_MUTATION = gql`
  mutation createMessage($message: MessageInput!) {
    createMessage(message: $message) {
      _id
      contentId
      userId
      userName
      title
      text
      date
    }
  }
`

export const CHAT_SUBSCRIPTION = gql`
  subscription onUserMessageCreated($messageRoomId: String!) {
    userMessageCreated(messageRoomId: $messageRoomId) {
      _id
      messageRoomId
      userId
      userName
      userAvatar
      title
      text
      imageUrl
      date
    }
  }
`

export const CONTENT_CHAT_SUBSCRIPTION = gql`
  subscription onMessageCrated($contentId: String!) {
    messageCreated(contentId: $contentId) {
      _id
      contentId
      userId
      userName
      userAvatar
      title
      text
      imageUrl
      date
    }
  }
`
