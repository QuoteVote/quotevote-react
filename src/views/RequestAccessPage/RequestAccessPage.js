import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'

import { REQUEST_USER_ACCESS_MUTATION } from 'graphql/mutations'
import { GET_CHECK_DUPLICATE_EMAIL } from 'graphql/query'

import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Button from '../../mui-pro/CustomButtons/Button'

const useStyles = makeStyles(styles)

export default function RequestAccessPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()


  const [userDetails, setUserDetails] = useState('')
  const {
    errors, getValues, setError,
  } = useForm({ userDetails })

  const client = useApolloClient()

  const onContinue = async () => {
    const newUserDetails = getValues()
    const { data } = await client.query({
      query: GET_CHECK_DUPLICATE_EMAIL,
      variables: { email: newUserDetails.email },
      fetchPolicy: 'network-only',
    })
    const hasDuplicateEmail = data && data.checkDuplicateEmail.length
    if (hasDuplicateEmail) {
      setError('email', {
        type: 'manual',
        message: 'Email already exists!',
      })
    }
    if (!hasDuplicateEmail && !Object.keys(errors).length) { // if there are no errors proceed to card number form
      setUserDetails(newUserDetails)
      setContinued(true)
    }
  }

  const [requestUserAccess, { data, error, loading }] = useMutation(REQUEST_USER_ACCESS_MUTATION)
  const onSubmit = async () => {
    try {
      // eslint-disable-next-line no-console
      const requestUserAccessInput = {
        email: userDetails
      }
      await requestUserAccess({ variables: { requestUserAccessInput } })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('onSubmit', e)
    }
  }

  React.useEffect(() => {
    if (error) {
      setErrorMessage(error.toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  React.useEffect(() => {
    if (data) {
      setRequestInviteSuccessful(true)
    }
  }, [data])

  // TODO: Abstract validation into custom hook
  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.container}>
      <Grid
        container
        display="flex"
        justify="center"
        alignItems="center"
        className={classes.inputContainer}
      >
        <Input
          disableUnderline
          placeholder="Enter Email"
          className={classes.input}
          onChange={(event) => setUserDetails(event.target.value)}
        />
        <Button className={classes.requestAccessBtn} onClick={() => onSubmit()}>Request Invite</Button>
      </Grid>
    </div>
  )
}
