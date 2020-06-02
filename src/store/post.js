/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
  name: 'post',
  initialState: {
    selectedPost: {
      id: null,
    },
  },
  reducers: {
    SET_SELECTED_POST: (state, action) => {
      state.selectedPost.id = action.payload
    },
  },
})

export const { SET_SELECTED_POST } = postSlice.actions

export default postSlice.reducer
