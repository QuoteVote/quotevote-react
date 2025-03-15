import { BuddyRoom } from '@/types/chat';

export interface ChatAction {
  type: string;
  payload: BuddyRoom | boolean;
}

export interface ChatState {
  selectedRoom: BuddyRoom | null;
  isSubmitting: boolean;
}

export interface RootState {
  chat: ChatState;
  user: {
    data: {
      _id: string;
      name: string;
      avatar?: {
        url: string;
      };
    } | null;
  };
} 