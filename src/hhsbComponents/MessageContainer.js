/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import Message from 'hhsbComponents/ChatComponents/ChatMessage'
import MessageSend from 'hhsbComponents/ChatComponents/MessageSend'

import { useQuery } from '@apollo/react-hooks'
import BuddyListLoader from './BuddyList/BuddyListLoader'
import GridContainer from '../mui-pro/Grid/GridContainer'
import { GET_ROOM_MESSAGES } from '../graphql/query'
// import {testMessageData} from "./ChatComponents/ChatConstants"

export default function MessageContainer(props) {
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
      alignItems: 'center',
      wrap: 'wrapContent',
      height: '80%',
      maxHeight: '80%',
      overflowY: 'scroll',
      overflowX: 'hidden',
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
  const classes = useStyles(props)
  const { selectedRoom, toggle } = props
  const { messageType, title, _id: messageRoomId } = selectedRoom.room
  const { loading, error, data } = useQuery(GET_ROOM_MESSAGES, {
    variables: { messageRomId: messageRoomId },
  })

  // Testing purposes
  // const messageData = testMessageData
  // const loading = false
  // const error = null

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
        <List>
          <ListItem>
            {loading ? <BuddyListLoader /> : (
              <GridList cols={1}>
                {
                  messageData.map((message) => (
                    <GridListTile>
                      <Message content={message.Content} color={message.Color} username={message.Username} />
                    </GridListTile>
                  ))
                }
              </GridList>
            )}
          </ListItem>
        </List>
      </GridContainer>
      <GridContainer className={classes.sendMessage}>
        <MessageSend messageRoomId={messageRoomId} type={messageType} title={title} />
      </GridContainer>
    </GridContainer>
  )
}
