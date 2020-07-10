import { SET_SELECTED_PAGE, SET_HIDDEN_POSTS } from 'store/actions/types'

export const postInitialState = {
  selectedPage: 'home',
  hiddenPosts: [],
}

export const appReducer = (state = postInitialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PAGE:
      return {
        ...state,
        selectedPage: action.payload,
      }
    case SET_HIDDEN_POSTS:
      return {
        ...state,
        hiddenPosts: action.payload,
      }
    default:
      return state
  }
}

export default appReducer
