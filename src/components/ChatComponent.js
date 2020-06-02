import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import BuddyList from './BuddyList'
import MessageContainer from './MessageContainer'

// eslint-disable-next-line react/prop-types
export default function ChatComponent({ Display, ...props }) {
  const [Chat, setChat] = React.useState(true)
  const useStyles = makeStyles({
    chatContainer: {
      width: '100%%',
      maxWidth: '300px',

      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '800px',
      wrap: 'wrapContent',
      paddingBottom: '5px',
      zIndex: 2000,
      display: Display,
    },

  })
  const classes = useStyles(props)
  const toggleDisplay = () => {
    // console.log('setting chat')
    setChat(!Chat)
  }

  const getDisplay = () => {
    // console.log(Chat)
    if (Chat === true) {
      return <MessageContainer toggle={toggleDisplay} />
      // console.log('chat is true')
    }
    return <BuddyList toggle={toggleDisplay} />
    // console.log('chat is false')
  }

  return (
    <div className={classes.chatContainer}>
      {getDisplay() }
    </div>
  )
}
