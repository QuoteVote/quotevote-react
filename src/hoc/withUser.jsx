import React from 'react'
import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { VERIFY_PASSWORD_RESET_TOKEN } from '../graphql/query'
import { SET_USER_DATA } from '../store/user'

const withUser = (Component) => (props) => {
  const dispatch = useDispatch()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const { data, loading, error } = useQuery(VERIFY_PASSWORD_RESET_TOKEN, {
    variables: { token },
    skip: !token,
    fetchPolicy: 'network-only',
  })

  React.useEffect(() => {
    if (data?.verifyUserPasswordResetToken) {
      dispatch(SET_USER_DATA(data.verifyUserPasswordResetToken))
    }
  }, [data, dispatch])

  if (loading) return null
  if (error) {
    // console.error('Error verifying token:', error) // Commenting out console.error
    return <Component {...props} />
  }

  return <Component {...props} />
}

export default withUser
