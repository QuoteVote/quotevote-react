export interface PostChatReactionsProps {
  messageId: string;
  reactions: MessageReaction[];
  created?: string;
  isDefaultDirection?: boolean;
}

export interface MessageReaction {
  _id: string;
  userId: string;
  messageId: string;
  emoji: string;
  count?: number;
}

export interface PostChatSendProps {
  messageRoomId: string;
  type?: string;
  onSend?: () => void;
} 