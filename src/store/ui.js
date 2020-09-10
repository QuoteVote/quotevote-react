/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedPost: {
      id: null,
    },
    selectedPage: 'home',
    hiddenPosts: [],
    snackbar: {
      open: false,
      type: '',
      message: '',
    },
    selectedPlan: 'personal',
  },
  reducers: {
    SET_SELECTED_POST: (state, action) => {
      state.selectedPost.id = action.payload
    },
    SET_SELECTED_PAGE: (state, action) => {
      state.selectedPage = action.payload
    },
    SET_HIDDEN_POSTS: (state, action) => {
      state.hiddenPosts = [...state.hiddenPosts, action.payload]
    },
    SET_SNACKBAR: (state, action) => {
      state.snackbar = action.payload
    },
    SET_SELECTED_PLAN: (state, action) => {
      state.selectedPlan = action.payload
    },
  },
})

export const {
  SET_SELECTED_POST,
  SET_SELECTED_PAGE,
  SET_HIDDEN_POSTS,
  SET_SNACKBAR,
  SET_SELECTED_PLAN,
} = uiSlice.actions

export default uiSlice.reducer
