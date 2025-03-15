export interface BuddyRoom {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  timestamp?: string;
  messageType?: string;
  unreadMessages?: number;
  _id?: string;
  title?: string;
}

export interface Message {
  _id: string;
  content: string;
  createdAt: string;
  messageRoomId: string;
  sender: {
    _id: string;
    name: string;
    avatar?: {
      url: string;
    };
  };
}

export interface MessageReaction {
  _id: string;
  userId: string;
  messageId: string;
  emoji: string;
  count?: number;
}

export interface ChatState {
  selectedRoom: BuddyRoom | null;
  isSubmitting: boolean;
}

export interface MessageInput {
  messageRoomId: string;
  content: string;
  type?: string;
}

export interface MessageReactionInput {
  messageId: string;
  emoji: string;
}

export interface MessageSendProps {
  messageRoomId: string;
  type?: string;
}

export interface MessageProps {
  message: {
    _id: string;
    content: string;
    createdAt: string;
    sender: {
      _id: string;
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
}

export interface PostChatReactionsProps {
  messageId: string;
  reactions: MessageReaction[];
  created?: string;
  direction?: 'left' | 'right';
} 