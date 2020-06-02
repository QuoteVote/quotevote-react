/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'mui-pro/Grid/GridContainer'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FaceIcon from '@material-ui/icons/Face'
import Button from '@material-ui/core/Button'

import Message from 'components/ChatComponents/chatMessage'

export default function MessageContainer(props) {
  const useStyles = makeStyles({
    chatContainer: {
      width: '100%',
      maxWidth: '300px',
      backgroundColor: '#191919',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '800px',
      wrap: 'wrapContent',
      paddingBottom: '5px',
      zIndex: 2000,
      display: props.Display,
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
  const classes = useStyles(props)
  const messageData = [{ Content: 'src/components/MessageContainer', Color: 'green', Username: 'steve' }, { Content: 'well I say this other thing', Color: 'red', Username: 'alice' }, { Content: 'I sadi it much louder', Color: 'red', Username: 'bolb' }]
  return (
    <GridContainer className={classes.chatContainer}>
      <GridContainer className={classes.header} onClick={props.toggle}>
        <p className={classes.headerText}> Back</p>
      </GridContainer>
      <br></br>
      {messageData.map((message) => (<Message content={message.Content} color={message.Color} username={message.Username} />))}
      <div className={classes.margin}>
        <Card>
          <Grid container spacing={1} alignItems="flex-end" justifyContent="space-between" wrap="nowrap">
            <Grid style={{ paddingBottom: '20px' }}>
              <FaceIcon
                style={{
                  backgroundColor: '#E91E63', width: '25px', padding: '5px', margin: '5px',
                }}
              />
            </Grid>

            <Grid item>
              <TextField id="input-with-icon-grid" label="type here" />
            </Grid>
            <Grid item>
              <Button style={{ backgroundColor: '#E91E63', color: 'white', margin: '2px' }}>SEND</Button>
            </Grid>

          </Grid>

        </Card>
      </div>

    </GridContainer>
  )
}
