import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from 'store/actions/types'

export const userInitialState = {
  loading: false,
  loginError: null,
  user: {},
}

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_LOGIN_SUCCESS:
      return { ...state, ...action.payload }
    case USER_LOGIN_FAILURE:
      return { ...state, ...action.payload }
    case USER_LOGOUT:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default userReducer
