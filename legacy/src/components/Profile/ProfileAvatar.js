import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'
import AvatarDisplay from '../Avatar'

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(7),
    height: theme.spacing(5),
  },
  avatar: {
    left: -5,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}))

function ProfileAvatar() {
  const classes = useStyles()
  const avatar = useSelector((state) => state.user.data.avatar)
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <AvatarDisplay height="35" width="35" {...avatar} />
      </Avatar>
    </div>
  )
}

export default ProfileAvatar
