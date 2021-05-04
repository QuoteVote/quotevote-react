import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import InputAdornment from '@material-ui/core/InputAdornment'

import FaceIcon from '@material-ui/icons/Face'
import LockIcon from '@material-ui/icons/Lock'

import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import CardBody from '../../mui-pro/Card/CardBody'
import Card from '../../mui-pro/Card/Card'

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
  loginButton: {
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

function LoginForm({ onSubmit = () => {}, loading }) {
  // also removed loginError from props
  const classes = useStyles()
  const {
    register, handleSubmit, errors, setError,
  } = useForm()

  // useEffect(() => {
  //   if (loginError) {
  //     setError('password', {
  //       type: 'manual',
  //       message: loginError,
  //     })
  //   }
  // }, [loginError, setError])

  // if (loginError) {
  //   return (
  //     <div>{loginError.data.message}</div>
  //   )
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaceIcon className={classes.icon} />
            </InputAdornment>
          ),
        }}
        inputRef={register({
          required: 'Username is required',
          minLength: {
            value: 4,
            message: 'Username should be more than 4 characters',
          },
          maxLength: {
            value: 30,
            message: 'Username should be less than thirty characters',
          },
        })}
        className={classes.textfield}
        placeholder="Email/Username"
        fullWidth
        name="username"
        id="username"
        error={errors.username}
        helperText={errors.username && errors.username.message}
      />
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon className={classes.icon} />
            </InputAdornment>
          ),
        }}
        inputRef={register({
          required: 'Password is required',
          minLength: {
            value: 2,
            message: 'Password should be more than 2 characters',
          },
          maxLength: {
            value: 20,
            message: 'Password should be less than twenty characters',
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
      <Button
        className={classes.loginButton}
        size="large"
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        disabled={loading}
      >
        <Typography variant="body1">
          Log in
          {loading && <CircularProgress size={20} style={{ marginLeft: 5 }} />}
        </Typography>
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loginError: PropTypes.any,
}

function Login({ onSubmit = () => {}, loading = false }) {
  const classes = useStyles()
  const loginError = useSelector((state) => state.user.loginError)

  return (
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
              Login
            </Typography>
          </Grid>
          <Grid item>
            <LoginForm onSubmit={onSubmit} loading={loading} loginError={loginError} />
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <Link className={classes.link} href="/auth/forgot">
                Forgot password?
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              No account?
              <span style={{ marginRight: 5 }} />
              <Link className={classes.link} href="/auth/request-access">
                Request Access
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </CardBody>
    </Card>
  )
}

Login.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
}

export default Login
