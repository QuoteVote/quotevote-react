import { CHAT_SUBMITTING } from 'store/actions/types'

export const chatInitialState = {
  submitting: false,
}

export const chatReducer = (state = chatInitialState, action) => {
  switch (action.type) {
    case CHAT_SUBMITTING:
      return {
        ...state,
        submitting: action.payload.submitting,
      }
    default:
      return state
  }
}

export default chatReducer
