import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'

// MUI
import { MuiThemeProvider as ThemeProvider, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

// Local
import { updateAvatar } from 'store/user'
import { UPDATE_USER_AVATAR } from '../../graphql/mutations'
import AvatarPreview from '../Avatar'
import { avatarOptions } from '../../utils/display'
import theme from '../../themes/MainTheme'
import { SET_SNACKBAR } from '../../store/ui'

const useStyles = makeStyles({
  selectInput: {
    width: '250px',
  },
})

/**
 * Creating a Users Avataaar
 * @function
 * @returns {JSX.Element}
 */
function ChangePhoto() {
  const user = useSelector((state) => state.user.data)
  const [updateUserAvatar] = useMutation(UPDATE_USER_AVATAR)
  let defaultAvatar = {}
  //  prevent legacy image file avatars from crapping out front end
  if (typeof user.avatar === 'object') {
    defaultAvatar = user.avatar
  }
  const {
    handleSubmit, watch, control, setValue,
  } = useForm({
    defaultValues: {
      ...defaultAvatar,
    },
  })
  const dispatch = useDispatch()
  const classes = useStyles()

  const onSubmit = async (formData) => {
    const newAvatar = await updateUserAvatar({ variables: { user_id: user._id, avatarQualities: formData } })
    await updateAvatar(dispatch, newAvatar.data.updateUserAvatar.avatar)
    dispatch(SET_SNACKBAR({
      type: 'danger',
      message: 'Avatar has been updated',
      open: true,
    }))
  }

  const watchAllFields = watch()

  const generateAvatar = () => avatarOptions.reduce((newAvatar, category) => [
    ...newAvatar,
    {
      key: category.name,
      option: category.options[Math.floor(Math.random() * Math.floor(category.options.length))],
    },
  ], [])

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item container column xs={12} md={6}>
          <Grid item xs={12}>
            <Typography variant="h5" noWrap>
              Create your avatar with AI
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="p">
              This is for anyone to make their beautiful personal avatar easily! If you have no idea what kind of style you want, you can hit the better or worse button until you find something you want.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AvatarPreview height="150" width="150" {...watchAllFields} />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => generateAvatar('better').map((q) => setValue(q.key, q.option))}
              variant="contained"
              color="secondary"
            >
              Better
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => generateAvatar('worse').map((q) => setValue(q.key, q.option))}
            >
              Worse
            </Button>
          </Grid>
        </Grid>
        <Grid item container column xs={6}>
          <Grid xs={12} item>
            <Typography variant="subtitle" noWrap>
              Or you can create it manually
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              avatarOptions.map((category) => {
                const { displayName, name, options } = category
                return (
                  <Grid container item xs={12}>
                    <Grid item xs={6}>
                      <InputLabel id="demo-simple-select-helper-label">{displayName}</InputLabel>
                      <Controller
                        as={(
                          <Select
                            className={classes.selectInput}
                          >
                            {
                              options.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                            }
                          </Select>
                        )}
                        name={name}
                        control={control}
                      />
                    </Grid>
                  </Grid>
                )
              })
            }
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Change my Profile
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default ChangePhoto
