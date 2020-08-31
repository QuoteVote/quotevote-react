import React, { useState } from 'react'
import PropTypes from 'prop-types'

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

import 'fontsource-montserrat'

const useStyles = makeStyles({
  header: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
  },
  card: {
    width: 350,
    // height: 459
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

function LoginForm({ onChange, onClick }) {
  const classes = useStyles()

  const handleInputChange = (e) => onChange({ [e.target.name]: e.target.value })

  return (
    <>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaceIcon className={classes.icon} />
            </InputAdornment>
          ),
        }}
        className={classes.textfield}
        placeholder="Username"
        fullWidth
        name="username"
        id="username"
        onChange={handleInputChange}
      />
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon className={classes.icon} />
            </InputAdornment>
          ),
        }}
        className={classes.textfield}
        placeholder="Password"
        fullWidth
        name="password"
        id="password"
        type="password"
        onChange={handleInputChange}
      />
      <Button
        className={classes.loginButton}
        size="large"
        color="primary"
        variant="contained"
        fullWidth
        onClick={onClick}
      >
        <Typography variant="body1" color="secondary">
          Log in
        </Typography>
      </Button>
    </>
  )
}

LoginForm.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
}

function Login({ login = () => {} }) {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const classes = useStyles()

  const handleInputChange = (val) => {
    setUsername(val.username)
    setPassword(val.password)
  }

  const handleLoginButtonClick = () => {
    login(username, password)
  }

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
            <Typography variant="h6">Login</Typography>
          </Grid>
          <Grid item>
            <LoginForm
              onChange={handleInputChange}
              onClick={handleLoginButtonClick}
            />
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
              <span />
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
