import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AvatarDisplay from '../Avatar'
import { avatarOptions } from '../../utils/display'
import { UPDATE_USER_AVATAR } from '../../graphql/mutations'
import { updateAvatar } from '../../store/user'

const useStyles = makeStyles({
  editor: { marginTop: 20 },
  avatar: { marginBottom: 20 },
  select: { minWidth: 160 },
  buttonRow: { marginTop: 20 },
})

function getRandomAvatar() {
  const randomAvatar = {}
  avatarOptions.forEach((opt) => {
    const idx = Math.floor(Math.random() * opt.options.length)
    randomAvatar[opt.name] = opt.options[idx]
  })
  return randomAvatar
}

function SimpleAvatarEditor() {
  const classes = useStyles()
  const user = useSelector((state) => state.user.data)
  const dispatch = useDispatch()
  const history = useHistory()
  const [avatar, setAvatar] = useState(user.avatar || getRandomAvatar())
  const [updateUserAvatar] = useMutation(UPDATE_USER_AVATAR)

  const handleChange = (name) => (event) => {
    setAvatar({ ...avatar, [name]: event.target.value })
  }

  const handleRandomize = () => {
    setAvatar(getRandomAvatar())
  }

  const handleSave = async () => {
    const result = await updateUserAvatar({
      variables: { user_id: user._id, avatarQualities: avatar },
    })
    updateAvatar(dispatch, result.data.updateUserAvatar.avatar)
    history.push('/Profile')
  }

  return (
    <Grid container className={classes.editor} direction="column" alignItems="center">
      <Grid item className={classes.avatar}>
        <AvatarDisplay height={180} width={180} {...avatar} />
      </Grid>
      <Grid item container spacing={2} justify="center">
        {avatarOptions.map((opt) => (
          <Grid item key={opt.name}>
            <FormControl className={classes.select}>
              <InputLabel>{opt.displayName}</InputLabel>
              <Select value={avatar[opt.name] || ''} onChange={handleChange(opt.name)}>
                {opt.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>
      <Grid item container className={classes.buttonRow} spacing={2} justify="center">
        <Grid item>
          <Button variant="outlined" color="primary" onClick={handleRandomize}>
            Randomize
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Avatar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SimpleAvatarEditor
