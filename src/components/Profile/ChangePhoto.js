import React, { useState } from 'react'
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
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Divider from '@material-ui/core/Divider'

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
    textAlign: 'center',
  },
  heading: {
    color: 'grey',
  },
})

/**
 * Creating a Users Avataaar
 * @function
 * @returns {JSX.Element}
 */
function ChangePhoto() {
  const [allAvatars, addAvatar] = useState([])
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
  const nameLookup = {
    'Top Type': 'Top',
    'Accessories Type': 'Accessories',
    hairColor: 'Hair Color',
    facialHairColor: 'Facial Hair Color',
    facialHairType: 'Facial Hair',
    clotheColor: 'Clothes',
    eyeType: 'Eyes',
    eyebrowType: 'Eyebrow',
    'Mouth Type': 'Mouth',
    'Skin Color': 'Skin',
  }

  const shouldIgnore = {
    'Hat Color': true,
    clotheType: true,
    graphicType: true,
  }
  const watchAllFields = watch()

  const generateAvatar = () => {
    const avatar = avatarOptions.reduce((newAvatar, category) => [
      ...newAvatar,
      {
        key: category.name,
        option: category.options[Math.floor(Math.random() * Math.floor(category.options.length))],
      },
    ], [])
    const newAvatars = allAvatars.concat({ avatar })
    addAvatar(newAvatars)
    return avatar
  }

  const pickLastAvatar = () => {
    const { avatar } = allAvatars[allAvatars.length - 2]
    return avatar
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item container column xs={6} md={6}>
          <Grid item xs={10}>
            <Typography className={classes.heading} variant="h4" noWrap>
              <ArrowBackIcon size={15} />
              Create your avatar with AI
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="p">
              This is for anyone to make their beautiful personal avatar easily! If you have no idea what kind of style you want, you can hit the better or worse button until you find something you want.
            </Typography>
          </Grid>
          <Grid style={{ marginLeft: 80 }} item md={11} xs={11}>
            <AvatarPreview height="150" width="150" {...watchAllFields} />
          </Grid>
          <Grid style={{ marginLeft: 30 }} item xs={10}>
            <Button
              onClick={() => generateAvatar('better').map((q) => setValue(q.key, q.option))}
              variant="contained"
              style={{ backgroundColor: '#4baf4f', color: 'white', margin: 30 }}
            >
              Better
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                pickLastAvatar().map((q) => setValue(q.key, q.option))
              }}
            >
              Worse
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 150, marginLeft: -184 }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid style={{ marginLeft: 30 }} item container column md={5} xs={5}>
          <Grid xs={14} item>
            <Typography style={{ color: 'black' }} variant="h6" noWrap>
              Or you can create it manually
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              avatarOptions.map((category) => {
                const { displayName, name, options } = category
                if (!shouldIgnore[displayName]) {
                  return (
                    <Grid container item key={category.name}>
                      <Grid item>
                        <Grid container>
                          <Grid item style={{ margin: 15 }}>
                            <InputLabel id="demo-simple-select-helper-label">{nameLookup[displayName]}</InputLabel>
                          </Grid>
                          <Grid item>
                            <Controller
                              as={(
                                <Select
                                  className={classes.selectInput}
                                >
                                  {
                                    options.map((i) => <MenuItem value={i} key={i}>{i}</MenuItem>)
                                  }
                                </Select>
                              )}
                              name={name}
                              control={control}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                }
                return null
              })
            }

          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default ChangePhoto
