import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import ChatSearchInput from './ChatSearchInput'
import BuddyList from '../BuddyList'
import MessageBox from './MessageBox'

const useStyles = makeStyles(() => ({
  title: {
    color: 'white',
  },
  root: {
    width: 380,
  },
}))

function ChatContent() {
  const classes = useStyles()
  const selectedRoom = useSelector((state) => state.chat.selectedRoom)

  if (!selectedRoom || !selectedRoom.room) {
    return (
      <div className={classes.root}>
        <Typography className={classes.title} variant="h6">Chat</Typography>
        <ChatSearchInput />
        <BuddyList />
      </div>
    )
  }

  return (
    <div className={classes.root}><MessageBox /></div>
  )
}

export default ChatContent
