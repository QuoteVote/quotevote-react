import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { CircularProgress } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import CardBody from '../../mui-pro/Card/CardBody'
import Card from '../../mui-pro/Card/Card'
import { UPDATE_USER } from '../../graphql/mutations'

const useStyles = makeStyles({
  header: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontStyle: 'normal',
    fontSize: '20px',
    lineHeight: '24px',
  },
  card: {
    width: 350,
  },
  submitButton: {
    textTransform: 'none',
    color: 'white',
    textColor: 'white',
  },
  forgotPassword: {
    textTransform: 'none',
  },
  textfield: {
    marginBottom: 20,
  },
  icon: {
    color: '#495057',
  },
  link: {
    color: '#00bcd4',
  },
})

function SignupForm({
  user,
  token,
}) {
  localStorage.setItem('token', token)
  const classes = useStyles()
  const history = useHistory()
  const {
    register, handleSubmit, errors, setError,
  } = useForm()
  const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER)

  const onSubmit = async (values) => {
    const {
      username, password, email, name,
    } = values

    await updateUser({
      variables: {
        user: {
          _id: user._id,
          email,
          name,
          username,
          password,
        },
      },
    })
  }

  useEffect(() => {
    if (error) {
      setError('password', {
        type: 'manual',
        message: error.message,
      })
    }
  }, [error, setError])

  useEffect(() => {
    if (!loading && data) {
      history.push('/auth/login')
    }
  }, [data, loading, history])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={classes.card}>
        <CardBody>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-evenly"
            spacing={2}
          >
            <Grid item>
              <Typography className={classes.header}>
                Sign Up
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                inputRef={register({
                  required: 'Name is required',
                })}
                className={classes.textfield}
                placeholder="Name"
                fullWidth
                name="name"
                id="name"
                error={errors.name}
                helperText={errors.name && errors.name.message}
                value={user.name}
              />

              <TextField
                inputRef={register({
                  required: 'Email is required',
                })}
                className={classes.textfield}
                placeholder="Email"
                fullWidth
                name="email"
                id="email"
                error={errors.email}
                helperText={errors.email && errors.email.message}
                disabled
                value={user.email}
              />

              <TextField
                inputRef={register({
                  required: 'Username is required',
                  minLength: {
                    value: 4,
                    message: 'Username should be more than 4 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Username should be less than twenty characters',
                  },
                })}
                className={classes.textfield}
                placeholder="Username"
                fullWidth
                name="username"
                id="username"
                error={errors.username}
                helperText={errors.username && errors.username.message}
              />

              <TextField
                inputRef={register({
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password should be more than six characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Password should be less than twenty characters',
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message:
                      'Password should contain a number, an uppercase, and lowercase letter',
                  },
                })}
                className={classes.textfield}
                placeholder="Password"
                fullWidth
                name="password"
                id="password"
                type="password"
                error={errors.password}
                helperText={errors.password && errors.password.message}
              />

            </Grid>
            <Grid item>
              <Button
                className={classes.submitButton}
                size="large"
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
              >
                <Typography variant="body1">
                  Submit
                  {loading && <CircularProgress size={20} style={{ marginLeft: 5 }} />}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </CardBody>
      </Card>
    </form>
  )
}

SignupForm.propTypes = {
  user: PropTypes.object,
  token: PropTypes.any,
}

export default SignupForm
