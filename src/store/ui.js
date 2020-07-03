/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedPost: {
      id: null,
    },
    selectedPage: 'home',
  },
  reducers: {
    SET_SELECTED_POST: (state, action) => {
      state.selectedPost.id = action.payload
    },
    SET_SELECTED_PAGE: (state, action) => {
      state.selectedPage = action.payload
    },
  },
})

export const { SET_SELECTED_POST, SET_SELECTED_PAGE } = uiSlice.actions

export default uiSlice.reducer
