import React from 'react'
import { isEmpty } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'mui-pro/Grid/GridContainer'
import { useQuery } from '@apollo/react-hooks'
import ChatListPanel from './ChatListPanel'
import { GET_CHAT_ROOMS } from '../../graphql/query'
import ChatLoader from './ChatLoader'

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    maxWidth: '300px',
    backgroundColor: '#191919',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    wrap: 'wrapContent',
    flexGrow: 1,
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
    width: '100%',
    backgroundColor: '#615B5B',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: '8%',
  },
  headerText: {
    fontSize: 'x-large',
    fontWeight: 900,
  },
}))

export default function BuddyList(props) {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS)

  if (error) return `Something went wrong: ${error}`

  const Data =
    (!loading && !isEmpty(data.messageRooms) &&
      data.messageRooms.map((item) => ({
        room: item,
        Text: item.title,
        color: '#191919',
        type: item.messageType,
        avatar: item.avatar,
      }))) ||
    []
  return (
    <GridContainer className={classes.chatContainer}>
      <GridContainer className={classes.header}>
        <p className={classes.headerText}>Buddy Lists</p>
      </GridContainer>
      {loading ? <ChatLoader /> : <ChatListPanel {...props} data={Data} />}
    </GridContainer>
  )
}
