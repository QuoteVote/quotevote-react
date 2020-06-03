import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import BuddyList from '../BuddyList'
import MessageContainer from '../MessageContainer'

const useStyles = makeStyles(() => ({
  chatContainer: {
    width: '300px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    wrap: 'wrapContent',
    zIndex: 2000,
    display: true,
    overflow: 'hidden',
  },
  drawer: {
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
}))


// eslint-disable-next-line react/prop-types
export default function ChatDrawer() {
  const [Chat, setChat] = React.useState(false)
  const [selectedRoom, setSelectedRoom] = React.useState(null)
  const classes = useStyles()
  const toggleDisplay = (newSelectedRoom) => {
    const isChat = !Chat
    setChat(isChat)
    setSelectedRoom(newSelectedRoom)
  }

  const getDisplay = () => {
    if (Chat === true) {
      return <MessageContainer toggle={toggleDisplay} selectedRoom={selectedRoom} />
    }
    return <BuddyList toggle={toggleDisplay} />
  }

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      open
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      classes={{
        paper: classes.drawer,
      }}
    >
      <div className={classes.chatContainer}>
        {getDisplay()}
      </div>
    </Drawer>
  )
}
