import { SET_SELECTED_PAGE } from 'store/actions/types'

export const postInitialState = {
  selectedPage: 'home',
}

export const appReducer = (state = postInitialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PAGE:
      return {
        ...state,
        selectedPage: action.payload,
      }
    default:
      return state
  }
}

export default appReducer
