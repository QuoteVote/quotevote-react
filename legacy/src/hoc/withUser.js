import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'
import { VERIFY_PASSWORD_RESET_TOKEN } from '../graphql/query'
import { SET_USER_DATA } from '../store/user'

const withUser = (Component) => (props) => {
  const dispatch = useDispatch()
  const { data } = useQuery(VERIFY_PASSWORD_RESET_TOKEN, {
    variables: { token: localStorage.getItem('token') },
  })

  if (data) {
    dispatch(SET_USER_DATA(data.verifyUserPasswordResetToken))
  }

  return <Component {...props} />
}
export default withUser
