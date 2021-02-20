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
import AvatarIconButtons from './AvatarIconButtons'
import AvatarOptionButtons from './AvatarOptionButtons'
import { avatarOptions } from '../../utils/display'
import theme from '../../themes/MainTheme'
import { SET_SNACKBAR } from '../../store/ui'

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
})

/**
 * Creating a Users Avataaar
 * @function
 * @returns {JSX.Element}
 */
function ChangePhoto() {
  const user = useSelector((state) => state.user.data)
  const [avatarOptionsArray, setAvatarOptionsArray] = useState()
  const [updatedAvatar, setUpdatedAvatar] = useState()
  const [colorOptions, setColorOptions] = useState()
  const [selectedOptions, setSelectedOptions] = useState()
  //  prevent legacy image file avatars from crapping out front end
  let defaultAvatar = {}

  if (updatedAvatar !== undefined) {
    defaultAvatar = updatedAvatar
  } else if (typeof user.avatar === 'object') {
    defaultAvatar = user.avatar
  }

  const classes = useStyles()

  const displayAvatarOptions = []

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
        setSelectedOptions(name)
        setColorOptions(null)
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case 'eyeType':
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = { ...defaultAvatar }
          avatarCategoryDisplay.eyeType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setSelectedOptions(name)
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
        setSelectedOptions(name)
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
        setSelectedOptions(name)
        setColorOptions(null)
        setAvatarOptionsArray(displayAvatarOptions)
        break
      case 'accessoriesType':
        for (let i = 0; i < options.length; i++) {
          const avatarCategoryDisplay = { ...defaultAvatar }
          avatarCategoryDisplay.accessoriesType = options[i]
          displayAvatarOptions.push(avatarCategoryDisplay)
        }
        setSelectedOptions(name)
        setColorOptions(null)
        setAvatarOptionsArray(displayAvatarOptions)
        break
      default:
        setSelectedOptions(null)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container display="flex" direction="row" alignItems="center" className={classes.fullCard} xs={6}>
        <Grid container item display="flex" direction="column" alignItems="center" justify="flex-start">
        <Grid item>
            <Typography className={classes.heading}>
              Create your avatar
            </Typography>
          </Grid>
          {!selectedOptions ? 
          <AvatarIconButtons setSelectedOptions={setSelectedOptions} defaultAvatar={defaultAvatar} updatedAvatar={updatedAvatar} handleIconClick={handleIconClick}/> 
          : 
          <AvatarOptionButtons avatarOptionsArray={avatarOptionsArray} setUpdatedAvatar={setUpdatedAvatar} updatedAvatar={updatedAvatar} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>
          }
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default ChangePhoto
