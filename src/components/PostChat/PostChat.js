import React, { useState } from 'react'
import { Grid, InputBase, SvgIcon, Icon, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import Typography from '@material-ui/core/Typography'
import SendIcon from 'assets/svg/SendIcon.svg'
import AvatarDisplay from '../Avatar'

const useStyles = makeStyles(() => ({
  chatRoot: {
    display: 'flex',
    padding: 10,
  },
  chat: {
    width: 59,
    height: 30,
    fontSize: 24,
    lineHeight: 1.25,
    letterSpacing: 0.25,
    fontFamily: 'Montserrat',
  },
  input: {
    borderRadius: 6,
    background: '#ffffff',
    width: 400,
    height: 39,
    paddingLeft: 10,
  },
  bubble: {
    position: 'relative',
    background: '#ffffff',
    minHeight: 30,
    minWidth: 250,
    width: 450,
    marginLeft: '10px',
    borderRadius: '6px',
    padding: 5,
    '&::after': {
      content: "''",
      position: 'absolute',
      border: '10px solid transparent',
      borderTop: '10px solid #ffffff',
      top: '0px',
      left: '-10px',
    },
  },
  bubbleReverse: {
    position: 'relative',
    background: '#00cf6e',
    minHeight: 30,
    minWidth: 250,
    color: 'white',
    marginRight: '10px',
    borderRadius: '6px',
    padding: 5,
    '&::after': {
      content: "''",
      position: 'absolute',
      border: '10px solid transparent',
      borderTop: '10px solid #00cf6e',
      top: '0px',
      right: '-10px',
    },
  },
}))

function PostChat() {
  const [message, setMessage] = useState()
  const classes = useStyles()
  const avatar = useSelector((state) => state.user.data.avatar)
  const user = useSelector((state) => state.user.data)

  console.log(user.avatar, user._id, user.username)
  // const isDefaultDirection = message.userId !== userId
  // const direction = isDefaultDirection ? 'row' : 'row-reverse'

  function handleSubmit() {
    console.log(message)
  }

  return (
    <Grid container>
      <Grid
        item
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.chatRoot}
        style={{ width: '100%' }}
      >
        <Grid item md={2} xs={2}>
          <Typography className={classes.chat}>Chat</Typography>
        </Grid>
        <Grid item md={10} xs={10}>
          <Paper>
            <InputBase
              placeholder="type a message..."
              className={classes.input}
              onChange={(event) => {
                const { value } = event.target
                setMessage(value)
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleSubmit()
                }
              }}
            />
            <IconButton
              onClick={(event) => {
                handleSubmit()
              }}
            >
                <img src={SendIcon}></img>
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.chatRoot}
      >
        <Grid item xs={2} md={2}>
            <Avatar>
            <AvatarDisplay height={70} width={70} {...avatar} />
            </Avatar>
        </Grid>
        <Grid item xs={10} md={10}>
            <Paper className={classes.bubble}>
                <Typography variant="p">
                Message will go here
                </Typography>
                <Grid container direction="row" justify="flex-end">
                <Grid item md={3} xs={3}>
                    <Typography className="timestamp">[TimeStamp]</Typography>
                </Grid>
                <Grid item md={1} xs={1}>
                    <FavoriteBorderOutlinedIcon onClick={(event) => { console.log('Love Love') }} />
                </Grid>
                </Grid>
            </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PostChat
