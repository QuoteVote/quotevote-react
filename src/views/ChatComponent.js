import React from 'react'

import GridContainer from 'mui-pro/Grid/GridContainer'

import BuddyList from './BuddyList'
import MessageContainer from './MessageContainer'

export default function ChatComponent() {
  const [Chat, setChat] = React.useState(true)

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
    <GridContainer>
      {getDisplay()}
    </GridContainer>
  )
}
