import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SendIcon from 'assets/svg/SendIcon.svg'
import PostChatMessage from './PostChatMessage'

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

function PostChat(props) {
  const { postId } = props
  const [text, setText] = useState()
  const classes = useStyles()
  const avatar = useSelector((state) => state.user.data.avatar)
  const messages = []

  function handleSubmit() {
    console.log('click')
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
                setText(value)
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
              <img src={SendIcon} alt="send"></img>
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <PostChatMessage messages={messages} />
    </Grid>
  )
}

PostChat.propTypes = {
  postId: PropTypes.string,
}

export default PostChat
