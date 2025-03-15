import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuddyRoom } from '@/types';

interface ChatState {
  selectedRoom: BuddyRoom | null;
}

const initialState: ChatState = {
  selectedRoom: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedRoom: (state, action: PayloadAction<BuddyRoom>) => {
      state.selectedRoom = action.payload;
    },
  },
});

export const { setSelectedRoom } = chatSlice.actions;
export default chatSlice.reducer; 