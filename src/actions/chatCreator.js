import { CHAT_REACTION } from "./types"

export const chatReaction = messageId => {
  return async (dispatch, getState) => {
    dispatch({
      type: CHAT_REACTION,
      payload: {
        messageId
      }
    })
  }
}
