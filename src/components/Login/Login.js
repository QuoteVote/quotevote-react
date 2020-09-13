import React from 'react'
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

import CardBody from '../../mui-pro/Card/CardBody'
import Card from '../../mui-pro/Card/Card'

const useStyles = makeStyles({
  header: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
  },
  card: {
    width: 350,
  },
  loginButton: {
    textTransform: 'none',
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

function LoginForm({ onSubmit = () => {} }) {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm()

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
            value: 5,
            message: 'Username should be more than six characters',
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
      <Button
        className={classes.loginButton}
        size="large"
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
      >
        <Typography variant="body1" color="secondary">
          Log in
        </Typography>
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

function Login({ login = () => {} }) {
  const classes = useStyles()

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
            <Typography className={classes.header} variant="h6">
              Login
            </Typography>
          </Grid>
          <Grid item>
            <LoginForm onSubmit={login} />
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <Link className={classes.link} href="/forgot">
                Forgot password?
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              No account?
              <span style={{ marginRight: 5 }} />
              <Link className={classes.link} href="/request-access">
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
  login: PropTypes.func,
}

export default Login
