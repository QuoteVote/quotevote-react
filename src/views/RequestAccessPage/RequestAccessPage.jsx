import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import PersonalForm from 'components/RequestAccess/PersonalForm/PersonalForm'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'

import { REQUEST_USER_ACCESS_MUTATION } from '@/graphql/mutations'
import { GET_CHECK_DUPLICATE_EMAIL } from '@/graphql/query'

import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import { Typography } from '@material-ui/core'

import Button from '../../mui-pro/CustomButtons/Button'

const useStyles = makeStyles(styles)

export default function RequestAccessPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const [userDetails, setUserDetails] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [requestInviteSuccessful, setRequestInviteSuccessful] = useState(false)
  const {
    errors,
  } = useForm({ userDetails })

  const client = useApolloClient()

  const [requestUserAccess] = useMutation(REQUEST_USER_ACCESS_MUTATION)
  const onSubmit = async () => {
    const pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i)
    const isValidEmail = pattern.test(userDetails)
    if (!isValidEmail) {
      setErrorMessage('This is not a valid email address')
    } else {
      const checkDuplicate = await client.query({
        query: GET_CHECK_DUPLICATE_EMAIL,
        variables: { email: userDetails },
        fetchPolicy: 'network-only',
      })
      const hasDuplicateEmail = checkDuplicate && checkDuplicate.data.checkDuplicateEmail.length
      if (hasDuplicateEmail) {
        setErrorMessage('This email already exists')
      } else if (!hasDuplicateEmail && !Object.keys(errors).length) {
        try {
          // eslint-disable-next-line no-console
          const requestUserAccessInput = {
            email: userDetails,
          }
          await requestUserAccess({ variables: { requestUserAccessInput } })
          setRequestInviteSuccessful(true)
        } catch (e) {
          if (e.message.includes('email: Path `email` is required.')) {
            setErrorMessage('Email is required')
          }
        }
      }
    }
  }

  // TODO: Abstract validation into custom hook
  useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (requestInviteSuccessful) {
    return (
      <PersonalForm
        requestInviteSuccessful={requestInviteSuccessful}
      />
    )
  }

  const duplicate = (
    <Typography>{errorMessage}</Typography>
  )

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
        {duplicate}
      </Grid>
    </div>
  )
}
