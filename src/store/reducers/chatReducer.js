import { CHAT_SUBMITTING } from 'store/actions/types'

export const chatInitialState = {
  submitting: false,
  text: '',
}

export const chatReducer = (state = chatInitialState, action) => {
  switch (action.type) {
    case CHAT_SUBMITTING:
      console.log({})
      return {
        ...state,
        text: action.payload.text,
        submitting: action.payload.submitting,
      }
    default:
      return state
  }
}

export default chatReducer
