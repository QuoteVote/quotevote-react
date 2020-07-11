/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const chat = createSlice({
  name: 'chat',
  initialState: {
    submitting: false,
  },
  reducers: {
    CHAT_SUBMITTING: (state, action) => {
      state.submitting = action.payload
    },
  },
})

export const { CHAT_SUBMITTING } = chat.actions

export default chat.reducer
