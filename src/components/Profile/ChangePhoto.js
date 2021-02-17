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
    padding: '20px 40px',
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
    backgroundColor: 'rgba(255, 255, 255, .6)',
    height: 80,
    width: 80,
    margin: '5px 20px 5px 15px',
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
  const [avatarOptionsArray, setAvatarOptionsArray] = useState()
  const [updatedAvatar, setUpdatedAvatar] = useState()
  let defaultAvatar = {}
  //  prevent legacy image file avatars from crapping out front end
  if (updatedAvatar !== undefined) {
    defaultAvatar = updatedAvatar
  } else if (typeof user.avatar === 'object') {
    defaultAvatar = user.avatar
  }
  console.log(defaultAvatar)
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

  const groupedAvatarOptions = _.groupBy(avatarOptions, 'name')

  const {
    topType, accessoriesType, facialHairType, clotheType, graphicType, mouthType, eyebrowType, eyeType, facialHairColor, clotheColor, hairColor, hatColor, skinColor
  } = groupedAvatarOptions

  topType.icon = Hat
  accessoriesType.icon = Glasses
  facialHairType.icon = Beard
  clotheType.icon = Shirt
  graphicType.icon = Silhouette
  mouthType.icon = Mouth
  eyeType.icon = Eyes
  eyebrowType.icon = Eyebrow

  const buttonOptions = []

  buttonOptions.push(eyebrowType, topType, accessoriesType, facialHairType, clotheType, graphicType, mouthType, eyeType)

  const displayAvatarOptions = []

  function handleIconClick(category) {
    const { name, options } = category
    switch (name) {
      case "topType":
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = {...defaultAvatar}
          avatarCategoryDisplay.topType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case "eyebrowType":
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = {...defaultAvatar}
          avatarCategoryDisplay.eyebrowType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case "eyeType":
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = {...defaultAvatar}
          avatarCategoryDisplay.eyeType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case "clotheType":
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = {...defaultAvatar}
          avatarCategoryDisplay.clotheType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case "graphicType":
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = {...defaultAvatar}
          avatarCategoryDisplay.graphicType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case "facialHairType":
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = {...defaultAvatar}
          avatarCategoryDisplay.facialHairType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case "mouthType":
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = {...defaultAvatar}
          avatarCategoryDisplay.mouthType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case "accessoriesType":
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = {...defaultAvatar}
          avatarCategoryDisplay.accessoriesType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setAvatarOptionsArray(displayAvatarOptions)
        break
    }
  }

  function handleSelectAvatarOption(options) {
    setUpdatedAvatar(options)
  }
  
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
              <AvatarPreview {...defaultAvatar} />
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
            <Grid item container display="flex" direction="row" justify="space-evenly" wrap className={classes.avatarRow}>
            {buttonOptions.map((category) => <Button className={classes.svgButton} display="flex" justify="center" alignItems="center" onClick={(event)=> handleIconClick(category[0])}><img src={category.icon} /></Button>)}
            </Grid>
          </Grid>
            <Grid container display="flex" direction="column" className={classes.optionCard}>
              <Grid item container display="flex" direction="row" justify="space-evenly" className={classes.avatarRow}>
                {avatarOptionsArray && avatarOptionsArray.map((options) => 
                  <Avatar className={classes.size} onClick={(event) => handleSelectAvatarOption(options)}>
                    <AvatarPreview {...options} />
                  </Avatar>
                )}
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
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default ChangePhoto
