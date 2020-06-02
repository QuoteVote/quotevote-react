import { SET_SELECTED_POST } from 'store/actions/types'

export const postInitialState = {
  selectedPost: {
    id: null,
  },
}

export const userReducer = (state = postInitialState, action) => {
  switch (action.type) {
    case SET_SELECTED_POST:
      return {
        ...state,
        selectedPost: {
          id: action.payload,
        },
      }
    default:
      return state
  }
}

export default userReducer
