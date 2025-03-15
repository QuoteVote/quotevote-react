export interface BuddyRoom {
  id: string;
  name: string;
  type: string;
  avatar?: {
    url?: string;
    width?: number;
    height?: number;
  };
  unreadMessages?: number;
  room?: any; // This should be typed properly based on your backend schema
  lastMessage?: {
    content: string;
    createdAt: string;
  };
}

export interface MessageRoom {
  _id: string;
  title: string;
  messageType: string;
  avatar: {
    url?: string;
    width?: number;
    height?: number;
  };
  unreadMessages: number;
  lastMessage?: {
    content: string;
    createdAt: string;
  };
} 