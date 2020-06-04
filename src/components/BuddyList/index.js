import React from 'react'
import { isEmpty } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'mui-pro/Grid/GridContainer'
import { useQuery } from '@apollo/react-hooks'
import BuddyListPanel from './BuddyListPanel'
import { GET_CHAT_ROOMS } from '../../graphql/query'
import BuddyListLoader from './BuddyListLoader'

// For testing purposes
// const data = require('./chatRooms.json')
// const loading = false
// const error = null

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    backgroundColor: '#191919',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    wrap: 'wrapContent',
    flexGrow: 1,
    overflow: 'auto',
    overflowX: 'hidden',
  },
  header: {
    backgroundColor: '#615B5B',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: '8%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  headerText: {
    fontSize: 'x-large',
    fontWeight: 900,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    maxHeight: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
    margin: theme.spacing(1),
  },
}))

export default function BuddyList(props) {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS)

  const Data =
    (!error && !loading && !isEmpty(data.messageRooms) &&
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
      {loading ? (
        <GridContainer className={classes.loader}>
          <BuddyListLoader />
        </GridContainer>
      ) : <BuddyListPanel {...props} data={Data} />}
    </GridContainer>
  )
}
