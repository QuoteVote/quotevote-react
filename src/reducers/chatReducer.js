import * as types from "../actions/types"

const defaultState = {}

const chatReducer = (state = defaultState, action) => {
  let _state
  switch (action.type) {
    case types.CHAT_REACTION:
      _state = { ...state, ...action.payload }
      return _state
    default:
      return state
  }
}

export default chatReducer
