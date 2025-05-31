/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const chat = createSlice({
  name: 'chat',
  initialState: {
    submitting: false,
    selectedRoom: null,
    open: false,
  },
  reducers: {
    CHAT_SUBMITTING: (state, action) => {
      state.submitting = action.payload
    },
    SELECTED_CHAT_ROOM: (state, action) => {
      state.selectedRoom = action.payload
    },
    SET_CHAT_OPEN: (state, action) => {
      state.open = action.payload
    },
  },
})

export const { CHAT_SUBMITTING, SELECTED_CHAT_ROOM, SET_CHAT_OPEN } = chat.actions

export default chat.reducer
