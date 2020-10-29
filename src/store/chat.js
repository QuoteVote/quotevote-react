/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const chat = createSlice({
  name: 'chat',
  initialState: {
    submitting: false,
    selectedRoom: null,
  },
  reducers: {
    CHAT_SUBMITTING: (state, action) => {
      state.submitting = action.payload
    },
    SELECTED_CHAT_ROOM: (state, action) => {
      state.selectedRoom = action.payload
    },
  },
})

export const { CHAT_SUBMITTING, SELECTED_CHAT_ROOM } = chat.actions

export default chat.reducer
