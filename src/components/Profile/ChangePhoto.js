import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

// MUI
import { MuiThemeProvider as ThemeProvider, makeStyles } from '@material-ui/core/styles'
import {
  Avatar, Typography, Grid, Button,
} from '@material-ui/core'

// Local
import { updateAvatar } from 'store/user'
import { UPDATE_USER_AVATAR } from '../../graphql/mutations'
import AvatarPreview from '../Avatar'
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
  buttonCard: {
    padding: '0px 30px',
  },
  heading2: {
    color: '#97999A',
    fontWeight: 'bold',
    fontSize: 16,
    padding: '10px 0px 0px 10px',
  },
  discardButton: {
    backgroundColor: '#DB6666',
    color: 'white',
    fontSize: 30,
    width: 163,
    height: 88,
    textTransform: 'none',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: '#E75656 !important',
    },
  },
  bingoButton: {
    backgroundColor: '#7DD6AD',
    marginRight: 30,
    color: 'white',
    fontSize: 30,
    width: 163,
    height: 88,
    textTransform: 'none',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: '#52E39F !important',
    },
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
    margin: '5px 20px 5px 15px',
    cursor: 'pointer',
  },
  svgButton: {
    borderRadius: 100,
    height: 80,
    width: 80,
    margin: '0px 30px 0px 15px',
    '&:hover': {
      backgroundColor: 'rgba(0, 207, 110, .5) !important',
    },
  },
  avatarRow: {
    padding: 20,
    height: 205,
    overflowY: 'scroll',
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
  const [avatarOptionsArray, setAvatarOptionsArray] = useState()
  const [updatedAvatar, setUpdatedAvatar] = useState()
  const [selectedOptions, setSelectedOptions] = useState()
  const [colorOptions, setColorOptions] = useState()
  //  prevent legacy image file avatars from crapping out front end
  let defaultAvatar = {}

  if (updatedAvatar !== undefined) {
    defaultAvatar = updatedAvatar
  } else if (typeof user.avatar === 'object') {
    defaultAvatar = user.avatar
  }

  const dispatch = useDispatch()
  const classes = useStyles()

  const onSubmit = async (avatar) => {
    const newAvatar = await updateUserAvatar({ variables: { user_id: user._id, avatarQualities: avatar } })
    await updateAvatar(dispatch, newAvatar.data.updateUserAvatar.avatar)
    dispatch(SET_SNACKBAR({
      type: 'danger',
      message: 'Avatar has been updated',
      open: true,
    }))
  }

  const groupedAvatarOptions = _.groupBy(avatarOptions, 'name')

  const {
    topType, accessoriesType, facialHairType, clotheType, mouthType, eyebrowType, eyeType, facialHairColor, clotheColor, hairColor, hatColor, skinColor,
  } = groupedAvatarOptions

  topType.icon = Hat
  accessoriesType.icon = Glasses
  facialHairType.icon = Beard
  clotheType.icon = Shirt
  skinColor.icon = Silhouette
  mouthType.icon = Mouth
  eyeType.icon = Eyes
  eyebrowType.icon = Eyebrow

  const buttonOptions = []

  buttonOptions.push(eyebrowType, topType, accessoriesType, facialHairType, clotheType, skinColor, mouthType, eyeType)

  const displayAvatarOptions = []
  const displayColorOptions = []

  function handleIconClick(category) {
    const { name, options } = category
    switch (name) {
      case 'topType':
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = { ...defaultAvatar }
          avatarCategoryDisplay.topType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setSelectedOptions(name)
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case 'eyebrowType':
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = { ...defaultAvatar }
          avatarCategoryDisplay.eyebrowType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setSelectedOptions(null)
        setColorOptions(null)
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case 'eyeType':
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = { ...defaultAvatar }
          avatarCategoryDisplay.eyeType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setSelectedOptions(null)
        setColorOptions(null)
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case 'clotheType':
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = { ...defaultAvatar }
          avatarCategoryDisplay.clotheType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setSelectedOptions(name)
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case 'skinColor':
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = { ...defaultAvatar }
          avatarCategoryDisplay.skinColor = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setSelectedOptions(null)
        setColorOptions(null)
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case 'facialHairType':
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = { ...defaultAvatar }
          avatarCategoryDisplay.facialHairType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setSelectedOptions(name)
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case 'mouthType':
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = { ...defaultAvatar }
          avatarCategoryDisplay.mouthType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setSelectedOptions(null)
        setColorOptions(null)
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case 'accessoriesType':
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = { ...defaultAvatar }
          avatarCategoryDisplay.accessoriesType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setSelectedOptions(null)
        setColorOptions(null)
        setAvatarOptionsArray(displayAvatarOptions)
        break
      default:
        setSelectedOptions(null)
    }
  }

  function handleSelectAvatarOption(option) {
    setUpdatedAvatar(option)
    let colors
    switch (selectedOptions) {
      case 'topType':
        if (option.topType.includes('WinterHat') || option.topType === 'Hijab' || option.topType === 'Turban') {
          colors = hatColor[0].options
          for (let i = 0; i < colors.length; i++) {
            const avatarCategoryDisplay = { ...option }
            avatarCategoryDisplay.hatColor = colors[i]
            displayColorOptions.push(avatarCategoryDisplay)
          }
        } else if (option.topType === 'LongHairFrida' || option.topType === 'Eyepatch' || option.topType === 'NoHair' || option.topType === 'Hat' || option.topType === 'LongHairShavedSides') {
          const avatarCategoryDisplay = { ...option }
          displayColorOptions.push(avatarCategoryDisplay)
        } else {
          colors = hairColor[0].options
          for (let i = 0; i < colors.length; i++) {
            const avatarCategoryDisplay = { ...option }
            avatarCategoryDisplay.hairColor = colors[i]
            displayColorOptions.push(avatarCategoryDisplay)
          }
        }
        setColorOptions(displayColorOptions)
        break
      case 'facialHairType':
        if (option.facialHairType === 'Blank') {
          const avatarCategoryDisplay = { ...option }
          displayColorOptions.push(avatarCategoryDisplay)
        } else {
          colors = facialHairColor[0].options
          for (let i = 0; i < colors.length; i++) {
            const avatarCategoryDisplay = { ...option }
            avatarCategoryDisplay.facialHairColor = colors[i]
            displayColorOptions.push(avatarCategoryDisplay)
          }
        }
        setColorOptions(displayColorOptions)
        break
      case 'clotheType':
        if (option.clotheType.includes('Blazer')) {
          const avatarCategoryDisplay = { ...option }
          displayColorOptions.push(avatarCategoryDisplay)
        } else {
          colors = clotheColor[0].options
          for (let i = 0; i < colors.length; i++) {
            const avatarCategoryDisplay = { ...option }
            avatarCategoryDisplay.clotheColor = colors[i]
            displayColorOptions.push(avatarCategoryDisplay)
          }
        }
        setColorOptions(displayColorOptions)
        break
      default:
        setColorOptions(null)
    }
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
              className={classes.bingoButton}
              onClick={() => onSubmit(defaultAvatar)}
            >
              Bingo
            </Button>
            <Button
              className={classes.discardButton}
              onClick={() => setUpdatedAvatar(user.avatar)}
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
          <Grid container display="flex" direction="column" className={classes.buttonCard}>
            <Grid item container display="flex" direction="row" justify="space-evenly" className={classes.avatarRow}>
              {buttonOptions.map((category) => (
                <Button className={classes.svgButton} hover display="flex" justify="center" alignItems="center" onClick={() => handleIconClick(category[0])}>
                  <img src={category.icon} alt={category.name} />
                </Button>
              ))}
            </Grid>
          </Grid>
          <Grid container display="flex" direction="column" className={classes.optionCard}>
            <Grid item container display="flex" direction="row" justify="space-evenly" className={classes.avatarRow}>
              {avatarOptionsArray && avatarOptionsArray.map((option) => (
                <Avatar className={classes.size} onClick={() => handleSelectAvatarOption(option)}>
                  <AvatarPreview {...option} />
                </Avatar>
              ))}
            </Grid>
          </Grid>
          <Grid container display="flex" direction="column" className={classes.optionCard}>
            <Grid item container display="flex" direction="row" justify="space-evenly" className={classes.avatarRow}>
              {colorOptions && colorOptions.map((option) => (
                <Avatar className={classes.size} onClick={() => setUpdatedAvatar(option)}>
                  <AvatarPreview {...option} />
                </Avatar>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default ChangePhoto
