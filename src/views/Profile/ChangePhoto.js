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
import AvatarPreview from '../../components/Avatar'
import { avatarOptions } from '../../utils/display'
import theme from '../../themes/MainTheme'

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
  const {
    handleSubmit, watch, control,
  } = useForm({
    defaultValues: {
      ...user.avatar,
    },
  })
  const dispatch = useDispatch()
  const classes = useStyles()

  const onSubmit = async (formData) => {
    const newAvatar = await updateUserAvatar({ variables: { user_id: user._id, avatarQualities: formData } })
    await updateAvatar(dispatch, newAvatar.data.updateUserAvatar.avatar)
  }

  const watchAllFields = watch()

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
            <Button variant="contained" color="secondary">
              Better
            </Button>
            <Button variant="outlined" color="secondary">
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
            <Grid container item xs={12}>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">Top Type</InputLabel>
                <Controller
                  as={(
                    <Select
                      className={classes.selectInput}
                    >
                      {
                        avatarOptions.topType.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                      }
                    </Select>
                  )}
                  name="topType"
                  control={control}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Accessories Type</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.accessoriesType.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="accessoriesType"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Hat Color</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.hatColor.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="hatColor"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Hair Color</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.hairColor.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="hairColor"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Facial Hair Type</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.facialHairType.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="facialHairType"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Facial Hair Color</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.facialHairColor.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="facialHairColor"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Clothing Type</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.clotheType.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="clotheType"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Clothing Color</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.clotheColor.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="clotheColor"
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Graphic Image</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.graphicType.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="graphicType"
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Eye Type</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.eyeType.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="eyeType"
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Eyebrow Type</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.eyebrowType.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="eyebrowType"
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Mouth Type</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.mouthType.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="mouthType"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Skin Color</InputLabel>
              <Controller
                as={(
                  <Select
                    className={classes.selectInput}
                  >
                    {
                      avatarOptions.skinColor.map((i) => <MenuItem value={i}>{i}</MenuItem>)
                    }
                  </Select>
                )}
                name="skinColor"
                control={control}
              />
            </Grid>
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
