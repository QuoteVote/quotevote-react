import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ChatSearchInput from './ChatSearchInput'
import BuddyList from '../BuddyList'

const useStyles = makeStyles(() => ({
  title: {
    color: 'white',
  },
}))
function ChatContent() {
  const classes = useStyles()
  return (
    <div>
      <Typography className={classes.title} variant="h6">Chat</Typography>
      <ChatSearchInput />
      <BuddyList />
    </div>
  )
}

export default ChatContent
