/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'

import Message from 'hhsbComponents/ChatComponents/ChatMessage'
import MessageSend from 'hhsbComponents/ChatComponents/MessageSend'
import { useQuery } from '@apollo/react-hooks'
import { GET_ROOM_MESSAGES } from '../graphql/query'
import ChatLoader from './BuddyList/ChatLoader'
import GridContainer from '../mui-pro/Grid/GridContainer'

export default function MessageContainer(props) {
  const useStyles = makeStyles({
    chatContainer: {
      maxWidth: '300px',
      display: 'flex',
      backgroundColor: '#191919',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      wrap: 'wrapContent',
      paddingBottom: '5px',
      height: '100%',
      maxHeight: '100%',
      overflow: 'auto',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    margin: {
      width: '95%',
    },
    header: {
      height: '50px',
      backgroundColor: '#615B5B',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 'x-large',
      fontWeight: 900,
    },
    testChat: {
      height: '40%',
      textAlign: 'center',
      display: 'table - cell',
      verticalAlign: 'middle',
      flexGrow: 1,
    },
    sendMessage: {
      margin: '5px',
      flexGrow: 1,
    },
  })
  const classes = useStyles(props)
  const { selectedRoom, toggle } = props
  const { messageType, title, _id: messageRoomId } = selectedRoom.room
  const { loading, error, data } = useQuery(GET_ROOM_MESSAGES, {
    variables: { messageRomId: messageRoomId },
  })
  if (error) return 'Something went wrong!'

  const messageData = (!loading && data.messages.map((message) => ({
    messageData: message,
    Content: message.text,
    Color: 'green',
    Username: message.userName,
  }))) || []

  return (
    <GridContainer className={classes.chatContainer}>
      <List
        subheader={(
          <ListSubheader component="div" className={classes.header} onClick={() => toggle(null)}>
            <p className={classes.headerText}> Back</p>
          </ListSubheader>
        )}
      >
        <ListItem>
          {loading ? <ChatLoader /> : (
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
        <ListItem>
          <GridContainer className={classes.sendMessage}>
            <MessageSend messageRoomId={messageRoomId} type={messageType} title={title} />
          </GridContainer>
        </ListItem>
      </List>
    </GridContainer>
  )
}
