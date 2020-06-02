/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jwt from 'jsonwebtoken'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    loginError: null,
    user: {},
  },
  reducers: {
    USER_LOGIN_REQUEST: (state) => {
      state.loading = true
    },
    USER_LOGIN_SUCCESS: (state, action) => {
      const { user, loading, loginError } = action.payload
      state.user = user
      state.loading = loading
      state.loginError = loginError
    },
    USER_LOGIN_FAILURE: (state, action) => {
      const { loginError, loading } = action.payload
      state.loading = loading
      state.loginError = loginError
    },
    USER_LOGOUT: (state) => {
      state.loading = false
      state.isLoggedIn = false
    },
    USER_TOKEN_VALIDATION: (state) => {
      state.loading = true
    },
    USER_TOKEN_VALIDATED: (state) => {
      state.loading = false
    },
    // USER_SIGNUP_REQUEST: (state, action) => {},
    // USER_SIGNUP_FAILURE: (state, action) => {},
    // USER_SIGNUP_SUCCESS: (state, action) => {},
  },
})

// Do not export the actions.
// Create functions, then export them
const { actions } = userSlice

// Private function(s) for actions
const getToken = async (username, password) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_SERVER}/login`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (err) {
    return { error: err }
  }
}

// Public functions that dispatch multiple actions
export const userLogin = async (username, password, dispatch, history) => {
  dispatch(actions.USER_LOGIN_REQUEST())
  const result = await getToken(username, password)

  if ('error' in result) {
    const serverConnectionRefuseError = {
      data: { message: 'Connection refuse' },
    }
    const errorMessage =
      typeof result.error.response !== 'undefined' ?
        result.error.response.data.message :
        serverConnectionRefuseError
    dispatch(
      actions.USER_LOGIN_FAILURE({ loginError: errorMessage, loading: false })
    )
  } else {
    const { token, user } = result.data
    localStorage.setItem('token', token)
    dispatch(
      actions.USER_LOGIN_SUCCESS({
        user,
        loading: false,
        loginError: null,
      })
    )
    // await persistor.flush()

    history.push('/hhsb/Home')
  }
}

export function tokenValidator(dispatch) {
  dispatch(actions.USER_TOKEN_VALIDATION())

  const storedToken = localStorage.getItem('token')

  const result = jwt.verify(storedToken, 'HHSB', (err) => {
    if (err) {
      localStorage.removeItem('token')
      dispatch(actions.USER_LOGOUT())
      // console.log("Error", err);
      return false
    }
    // console.log(decoded);
    dispatch(actions.USER_TOKEN_VALIDATED())
    return true
  })

  return result
}

export function clearToken(dispatch) {
  dispatch(actions.USER_LOGOUT())
  localStorage.removeItem('token')
}

// export const userLogout = (history) => async (dispatch) => {
//   console.log('userLogout', history)
//   clearToken()

//   if (history) {
//     history.push('/logout')
//   }
// }

export default userSlice.reducer
