/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ScrollableFeed from 'react-scrollable-feed'

import Message from 'components/ChatComponents/Message'
import MessageSend from 'components/ChatComponents/MessageSend'

import { useQuery, useSubscription } from '@apollo/react-hooks'
import BuddyListLoader from './BuddyList/BuddyListLoader'
import GridContainer from '../mui-pro/Grid/GridContainer'
import { GET_ROOM_MESSAGES } from '../graphql/query'
import { NEW_MESSAGE_SUBSCRIPTION } from '../graphql/subscription'

// Testing purposes
// import {testMessageData} from "./ChatComponents/ChatConstants"
// const messageData = testMessageData
// const loading = false
// const error = null

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#191919',
    color: 'white',
    maxWidth: 360,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    wrap: 'wrapContent',
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  header: {
    width: '100%',
    backgroundColor: '#615B5B',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: '8%',
  },
  messages: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    wrap: 'wrapContent',
    height: '88%',
    maxHeight: '88%',
    margin: theme.spacing(1),
    maxWidth: '360px',
    width: '300px',
  },
  messageLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    wrap: 'wrapContent',
    height: '80%',
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  sendMessage: {
    position: 'absolute',
    bottom: 0,
    top: 'auto',
    margin: theme.spacing(1),
  },
  headerText: {
    fontSize: 'x-large',
    fontWeight: 900,
    overflow: 'hidden',
  },
}))

export default function MessageContainer(props) {
  const classes = useStyles(props)
  const { selectedRoom, toggle } = props
  const { messageType, title, _id: messageRoomId } = selectedRoom.room
  const {
    loading, error, data, refetch,
  } = useQuery(GET_ROOM_MESSAGES, {
    variables: { messageRoomId },
  })

  useSubscription(
    NEW_MESSAGE_SUBSCRIPTION,
    {
      variables: { messageRoomId },
      onSubscriptionData: async () => {
        await refetch()
      },
    },
  )

  if (error) return 'Something went wrong!'

  const messageData = (!loading && data.messages.map((message) => ({
    messageData: message,
    Content: message.text,
    Color: 'green',
    Username: message.userName,
  }))) || []

  return (
    <GridContainer className={classes.root}>
      <GridContainer className={classes.header} onClick={() => toggle(null)}>
        <p className={classes.headerText}>Back</p>
      </GridContainer>
      <GridContainer className={loading ? classes.messageLoading : classes.messages}>
        {loading ? <BuddyListLoader /> : (
          <ScrollableFeed className={classes.messages}>
            {
              messageData.map((message) => (
                <Message content={message.Content} color={message.Color} username={message.Username} />
              ))
            }
          </ScrollableFeed>
        )}
      </GridContainer>
      <GridContainer className={classes.sendMessage}>
        <MessageSend messageRoomId={messageRoomId} type={messageType} title={title} />
      </GridContainer>
    </GridContainer>
  )
}
