import React from 'react'
import { isEmpty } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import CircularProgress from '@material-ui/core/CircularProgress'
import GridContainer from 'mui-pro/Grid/GridContainer'
import ListDividers from 'hhsbComponents/ChatComponents/List'
import { GET_CHAT_ROOMS } from '../graphql/query'

const useStyles = makeStyles({
  chatContainer: {
    maxWidth: '300px',
    backgroundColor: '#191919',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '800px',
    wrap: 'wrapContent',
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
})

export default function BuddyList(props) {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS)

  if (loading) {
    return (
      <CircularProgress color="secondary" />
    )
  }

  if (error) return `Something went wrong: ${error}`

  const Data = (!isEmpty(data.messageRooms) && data.messageRooms.map((item) => ({
    Text: item.title,
    color: '#191919',
  }))) || []

  return (
    <GridContainer className={classes.chatContainer}>
      <GridContainer className={classes.header} onClick={props.toggle}>
        <p className={classes.headerText}>Buddy Lists</p>
      </GridContainer>
      <ListDividers List={Data} />
    </GridContainer>
  )
}
