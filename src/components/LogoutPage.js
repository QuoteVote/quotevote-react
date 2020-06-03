import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

function LogoutPage() {
  const client = useApolloClient()
  useEffect(() => {
    localStorage.removeItem('token')
    client.resetStore()
    console.log("LOGOUT")
  }, [client])

  return <Redirect to="/auth/logout" />
}

export default LogoutPage
