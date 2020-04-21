import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import ListDividers from 'hhsbComponents/ChatComponents/List'

import GridContainer from 'mui-pro/Grid/GridContainer'

import Alert from '../hhsbAssets/Alerts.png'

// eslint-disable-next-line react/prop-types
export default function BuddyList({ toggle }) {
  const useStyles = makeStyles({
    chatContainer: {
      width: '33%',
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
  const classes = useStyles()
  const Data = [{ Text: 'Following', Color: 'gray', icon: Alert }, { Text: 'options2', Color: '#191919' }, { Text: 'option3', Color: '#191919' }, { Text: 'Content Posts', Color: 'gray' }, { Text: 'option3', Color: '#191919' }]
  return (
    <GridContainer className={classes.chatContainer}>

      <GridContainer className={classes.header} onClick={toggle}>
        <p className={classes.headerText}> Buddy List</p>

      </GridContainer>

      <ListDividers List={Data} />
    </GridContainer>

  )
}
