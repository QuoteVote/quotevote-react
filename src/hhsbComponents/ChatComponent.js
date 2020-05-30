import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

import BuddyList from './BuddyList'
import MessageContainer from './MessageContainer'

// eslint-disable-next-line react/prop-types
export default function ChatComponent({Display, ...props}) {
  const [Chat, setChat] = React.useState(false)
  const [selectedRoom, setSelectedRoom] = React.useState(null)
  const useStyles = makeStyles({
    chatContainer: {
      width: '280px',
      maxWidth: 360,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      wrap: 'wrapContent',
      zIndex: 2000,
      display: Display,
    },

  })
  const classes = useStyles(props)
  const toggleDisplay = (newSelectedRoom) => {
    const isChat = !Chat
    setChat(isChat)
    setSelectedRoom(newSelectedRoom)
  }

  const getDisplay = () => {
    if (Chat === true) {
      return <MessageContainer toggle={toggleDisplay} selectedRoom={selectedRoom}/>
    }
    return <BuddyList toggle={toggleDisplay}/>
  }

  return (
    <div className={classes.chatContainer}>
      {getDisplay()}
    </div>
  )
}
