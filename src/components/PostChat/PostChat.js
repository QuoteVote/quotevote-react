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
}))

function PostChat(props) {
  const { postId } = props
  const [text, setText] = useState()
  const classes = useStyles()
  const avatar = useSelector((state) => state.user.data.avatar)
  const userId = useSelector((state) => state.user.data._id)
  const messages = [{ text: 'HEYYYYYY', timestamp: 'TIME', avatar: avatar }, { text: 'HEYYYYYY', timestamp: 'TIME', avatar: avatar, userId: userId } ]

  function handleSubmit() {
    const dateSubmitted = new Date()
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
      {messages.map((message) => (
      <PostChatMessage message={message} />
      ))}
    </Grid>
  )
}

PostChat.propTypes = {
  postId: PropTypes.string,
}

export default PostChat
