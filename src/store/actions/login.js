import axios from 'axios'

import jwt from 'jsonwebtoken'
import { persistor } from 'store/store'
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  // USER_LOGOUT
} from './types'

export const userLogin = async (username, password, dispatch, history) => {
  dispatch({ type: USER_LOGIN_REQUEST })
  const result = await getToken(username, password)

  if ('error' in result) {
    const serverConnectionRefuseError = {
      data: { message: 'Connection refuse' },
    }
    const errorMessage =
      typeof result.error.response !== 'undefined' ?
        result.error.response.data.message :
        serverConnectionRefuseError
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: { loginError: errorMessage, loading: false },
    })
  } else {
    const { token, user } = result.data
    localStorage.setItem('token', token)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        user,
        loading: false,
        loginError: null,
      },
    })
    await persistor.flush()

    history.push('/hhsb/Home')
  }
}

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

export function tokenValidator() {
  const storedToken = localStorage.getItem('token')

  const result = jwt.verify(storedToken, 'HHSB', (err) => {
    if (err) {
      localStorage.removeItem('token')
      // console.log("Error", err);
      return false
    }
    // console.log(decoded);
    return true
  })

  return result
}

// export function clearToken() {
//   localStorage.removeItem("token");
// }

// export const userLogout = history => {
//   return async dispatch => {
//     console.log("userLogout", history);
//     clearToken();
//     dispatch({
//       type: USER_LOGOUT,
//       payload: { loading: false, isLoggedIn: false }
//     });

//     if (history) {
//       history.push("/logout");
//     }
//   };
// };
