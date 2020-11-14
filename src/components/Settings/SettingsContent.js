import React from 'react'
import { Avatar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import classNames from 'classnames'
import InputLabel from '@material-ui/core/InputLabel'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import IconButton from '@material-ui/core/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import AvatarDisplay from '../Avatar'
import SettingsSaveButton from '../CustomButtons/SettingsSaveButton'
import SignOutButton from '../CustomButtons/SignOutButton'
import ManageInviteButton from '../CustomButtons/ManageInviteButton'
import { UPDATE_USER } from '../../graphql/mutations'
import { SET_USER_DATA } from '../../store/user'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    minWidth: 350,
    height: '80vh',
    marginLeft: 5,
    marginRight: 5,
    overflow: 'auto',
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: '22px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#ffffff',
  },
  paperName: {
    maxWidth: 200,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  cameraIcon: {
    marginTop: 25,
    margin: 0,
    position: 'absolute',
    display: 'flex',
  },
  paper: {
    padding: 15,
  },
  footerButtons: {
    position: 'fixed',
    bottom: 0,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  error: {
    padding: 15,
    color: 'red',
    font: 'bold',
  },
  success: {
    padding: 15,
    color: 'white',
    font: 'bold',
  },
}))

function SettingsContent({ setOpen }) {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const client = useApolloClient()
  const {
    username, email, name, avatar, _id, ...otherUserData
  } = useSelector((state) => state.user.data)
  const handleChangeAvatar = () => {
    setOpen(false)
    history.push('/hhsb/Profile/hhsb/avatar')
  }
  const defaultValues = {
    username, password: email, name,
  }
  const {
    register, handleSubmit, errors, formState,
  } = useForm({ defaultValues })
  const isPasswordTouched = !!formState.touched.password
  const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER)
  const onSubmit = async (values) => {
    const result = await updateUser({
      variables: {
        user: {
          _id,
          ...values,
        },
      },
    })

    if (result.data) {
      const { password, ...otherValues } = values
      dispatch(SET_USER_DATA({
        _id,
        ...otherUserData,
        ...otherValues,
      }))
    }
  }

  const handleLogout = () => {
    setOpen(false)
    localStorage.removeItem('token')
    client.stop()
    client.resetStore()
    history.push('/auth/login')
  }

  const handleInvite = () => {
    history.push('/hhsb/ControlPanel')
    setOpen(false)
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
        className={classes.root}
        spacing={2}
      >
        <Grid item>
          <Typography className={classes.title}>
            Settings
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <IconButton onClick={handleChangeAvatar}>
                <Avatar className={classes.avatar}>
                  <AvatarDisplay height={75} width={75} {...avatar} />
                  <PhotoCameraIcon className={classes.cameraIcon} />
                </Avatar>
              </IconButton>
            </Grid>
            <Grid item>
              <Paper className={classNames(classes.paperName, classes.paper)}>
                <InputLabel>Name</InputLabel>
                <TextField
                  inputRef={register({
                    required: 'Name is required',
                  })}
                  defaultValue={name}
                  fullWidth
                  name="name"
                  id="name"
                  error={errors.name}
                  helperText={errors.name && errors.name.message}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <InputLabel>Username</InputLabel>
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
              defaultValue={username}
              fullWidth
              name="username"
              id="username"
              error={errors.username}
              helperText={errors.username && errors.username.message}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <InputLabel>Email</InputLabel>
            <TextField
              inputRef={register({
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Entered value does not match email format',
                },
              })}
              defaultValue={email}
              fullWidth
              name="email"
              id="email"
              error={errors.email}
              helperText={errors.email && errors.email.message}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <InputLabel>Password</InputLabel>
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
                pattern: isPasswordTouched ? {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    'Password should contain a number, an uppercase, and lowercase letter',
                } : null,
              })}
              defaultValue={email}
              fullWidth
              name="password"
              id="password"
              error={errors.password}
              helperText={errors.password && errors.password.message}
              type="password"
            />
          </Paper>
        </Grid>
        {!loading && error && (<Typography className={classes.error}>Something went wrong! Please try again!</Typography>)}
        {!loading && data && (<Typography className={classes.success}>Successfully saved!</Typography>)}
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item>
              <SignOutButton onClick={handleLogout} />
            </Grid>
            {otherUserData.admin && (
              <Grid item>
                <ManageInviteButton onClick={handleInvite} />
              </Grid>
            )}
            <Grid item>
              <SettingsSaveButton disabled={!formState.isDirty} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  )
}

SettingsContent.propTypes = {
  setOpen: PropTypes.func,
}

export default SettingsContent
