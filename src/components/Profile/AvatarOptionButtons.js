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

const useStyles = makeStyles({
  card: {
    backgroundColor: 'rgba(255, 255, 255, .6)',
    borderRadius: 5,
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
  avatarRow: {
    padding: 20,
    height: 205,
    overflowY: 'scroll',
  },
  backbtn: {
    backgroundColor: '#146998',
    width: 163,
    height: 88,
    fontSize: 30,
    color: 'white',
    textTransform: 'none',
    fontWeight: 'normal',
    borderRadius: 5,
  }
})

function ArticleOptions(props) {
    const { avatarOptionsArray, handleSelectAvatarOption } = props
    const classes = useStyles()
    return (
        <Grid item container display="flex" direction="row" justify="space-evenly" className={classes.avatarRow}>
        {avatarOptionsArray && avatarOptionsArray.map((option) => (
          <Avatar className={classes.size} onClick={() => handleSelectAvatarOption(option)}>
            <AvatarPreview {...option} />
          </Avatar>
        ))}
      </Grid>
    )
}

function ArticleColorOptions(props) {
    const { colorOptions, setUpdatedAvatar } = props
    console.log(props)
    const classes = useStyles()
    return (
        <Grid item container display="flex" direction="row" justify="space-evenly" className={classes.avatarRow}>
        {colorOptions && colorOptions.map((option) => (
          <Avatar className={classes.size} onClick={() => setUpdatedAvatar(option)}>
            <AvatarPreview {...option} />
          </Avatar>
        ))}
      </Grid>
    )
}

function AvatarOptionButtons(props) {
    console.log(props)
  const { avatarOptionsArray, setSelectedOptions, setUpdatedAvatar, selectedOptions } = props
  console.log(setSelectedOptions)
  const user = useSelector((state) => state.user.data)
  const [colorOptions, setColorOptions] = useState()

  const dispatch = useDispatch()
  const classes = useStyles()

  const groupedAvatarOptions = _.groupBy(avatarOptions, 'name')

  const {
    facialHairColor, clotheColor, hairColor, hatColor,
  } = groupedAvatarOptions

  const displayColorOptions = []

  function handleBackButtonClick() {
    if (colorOptions) {
        setColorOptions(null)
    }
    if (!colorOptions) {
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
      <Grid container item display="flex" direction="column" alignItems="center" justify="center" >
        <Grid container item display="flex" direction="column" className={classes.card}>
          <Grid container display="flex" direction="column" className={classes.optionCard}>
            {colorOptions ? <ArticleColorOptions colorOptions={colorOptions} setUpdatedAvatar={setUpdatedAvatar}/> : <ArticleOptions avatarOptionsArray={avatarOptionsArray} handleSelectAvatarOption={handleSelectAvatarOption} setUpdatedAvatar={setUpdatedAvatar}/>}
          </Grid>
          </Grid>
          <Button type="submit" class={classes.backbtn} onClick={() => handleBackButtonClick()}>Back</Button>
    </Grid>
    </ThemeProvider>
  )
}

export default AvatarOptionButtons