import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'

// MUI
import { MuiThemeProvider as ThemeProvider, makeStyles } from '@material-ui/core/styles'
import {
  Avatar, Typography, Grid, Button,
} from '@material-ui/core'

// Local
import { updateAvatar } from 'store/user'
import { UPDATE_USER_AVATAR } from '../../graphql/mutations'
import AvatarPreview from '../Avatar'
// import AvatarDisplay from '../Avatar'
import { avatarOptions } from '../../utils/display'
import theme from '../../themes/MainTheme'
import { SET_SNACKBAR } from '../../store/ui'

// Icons
import Silhouette from '../../assets/svg/Silhouette.svg'
import Glasses from '../../assets/svg/Glasses.svg'
import Mouth from '../../assets/svg/Mouth.svg'
import Shirt from '../../assets/svg/Shirt.svg'
import Eyes from '../../assets/svg/Eyes.svg'
import Hat from '../../assets/svg/Hat.svg'
import Beard from '../../assets/svg/Beard.svg'
import Eyebrow from '../../assets/svg/Eyebrow.svg'

const useStyles = makeStyles({
  fullCard: {
    height: 'calc(95vh - 90px)',
    paddingTop: 30,
  },
  heading: {
    color: '#56DA9C',
    fontSize: 40,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, .6)',
    borderRadius: 5,
  },
  optionCard: {
    borderTop: '1px solid #CAE7FF',
    padding: '20px 30px',
  },
  heading2: {
    color: '#97999A',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
  },
  avatarCard: {
    padding: '20px 30px',
  },
  discardButton: {
    backgroundColor: '#DB6666',
    color: 'white',
    fontSize: 30,
    width: 163,
    height: 88,
  },
  bingoButton: {
    backgroundColor: '#7DD6AD',
    color: 'white',
    fontSize: 30,
    width: 163,
    height: 88,
  },
  avatar: {
    margin: 50,
    height: 200,
    width: 200,
    backgroundColor: '#65C9FF',
  },
  size: {
    height: 80,
    width: 80,
    backgroundColor: '#65C9FF',
  },
  svgButton: {
    borderRadius: 100,
    backgroundColor: '#7DD6AD',
    height: 80,
    width: 80,
  },
  buttonIcon: {
    verticalAlign: 'middle',
  },
  avatarRow: {
    paddingBottom: 20,
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

  return (
    <ThemeProvider theme={theme}>
      <Grid container display="flex" direction="row" className={classes.fullCard}>
        <Grid container item display="flex" direction="column" alignItems="center" xs={6}>
          <Grid item>
            <Typography className={classes.heading}>
              Create your avatar
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AvatarPreview {...watchAllFields} />
            </Avatar>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              className={classes.bingoButton}
            >
              Bingo
            </Button>
            <Button
              variant="contained"
              className={classes.discardButton}
            >
              Nah
            </Button>
          </Grid>
        </Grid>
        <Grid container item display="flex" direction="column" className={classes.card} xs={6}>
          <Grid item>
            <Typography className={classes.heading2}>
              choose a feature to customize
            </Typography>
          </Grid>
          <Grid container display="flex" direction="column" className={classes.avatarCard}>
            <Grid item container display="flex" direction="row" justify="space-evenly" className={classes.avatarRow}>
              <Button className={classes.svgButton} display="flex" justify="center" alignItems="center"><img src={Eyebrow} /></Button>
              <Button className={classes.svgButton} display="flex" justify="center" alignItems="center"><img src={Beard} /></Button>
              <Button className={classes.svgButton} display="flex" justify="center" alignItems="center"><img src={Hat} /></Button>
              <Button className={classes.svgButton} display="flex" justify="center" alignItems="center"><img src={Eyes} /></Button>
            </Grid>
            <Grid item container display="flex" direction="row" justify="space-evenly">
              <Button className={classes.svgButton} display="flex" justify="center" alignItems="center"><img src={Shirt} /></Button>
              <Button className={classes.svgButton} display="flex" justify="center" alignItems="center"><img src={Mouth} /></Button>
              <Button className={classes.svgButton} display="flex" justify="center" alignItems="center"><img src={Glasses} /></Button>
              <Button className={classes.svgButton} display="flex" justify="center" alignItems="center"><img src={Silhouette} /></Button>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container display="flex" direction="column" className={classes.optionCard}>
              <Grid item container display="flex" direction="row" justify="space-evenly" className={classes.avatarRow}>
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
              </Grid>
              <Grid item container display="flex" direction="row" justify="space-evenly">
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
              </Grid>
            </Grid>
            <Grid container display="flex" direction="column" className={classes.optionCard}>
              <Grid item container display="flex" direction="row" justify="space-evenly">
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
                <Avatar className={classes.size}>
                  <AvatarPreview />
                </Avatar>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default ChangePhoto
