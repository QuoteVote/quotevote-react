import { BuddyRoom } from '@/types/chat';
import { ThunkAction, Action } from '@reduxjs/toolkit';

export interface RootState {
  chat: ChatState;
  user: UserState;
}

export interface ChatState {
  selectedRoom: BuddyRoom | null;
  isSubmitting: boolean;
}

export interface UserState {
  data: {
    _id: string;
    name: string;
    avatar?: {
      url: string;
    };
  } | null;
}

export interface ChatAction {
  type: string;
  payload: BuddyRoom | boolean;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = (action: ChatAction | AppThunk) => void; 