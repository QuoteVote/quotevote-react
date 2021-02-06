import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  Grid, Paper, Typography, Avatar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AvatarDisplay from '../Avatar'
import PostChatReactions from './PostChatReactions'

const useStyles = makeStyles(() => ({
  root: {
    padding: 10,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  bubble: {
    position: 'relative',
    background: '#ffffff',
    minHeight: 30,
    borderRadius: '6px',
    padding: 14,
    '&::after': {
      content: "''",
      position: 'absolute',
      border: '10px solid transparent',
      borderTop: '10px solid #ffffff',
      top: '0px',
      left: '-10px',
    },
    color: 'var(--subsection-title-muted-black)',
  },
  bubbleReverse: {
    position: 'relative',
    background: '#00cf6e',
    minHeight: 30,
    color: 'white',
    borderRadius: '6px',
    padding: 14,
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

function PostChatMessage(props) {
  const { message } = props
  const classes = useStyles()
  const userId = useSelector((state) => state.user.data._id)
  const isDefaultDirection = message.userId !== userId
  const direction = isDefaultDirection ? 'row' : 'row-reverse'

  return (
    <Grid
      container
      spacing={1}
      direction={direction}
      justify="space-around"
      alignItems="center"
      className={classes.root}
    >
      <Grid item sm={1}>
        <Avatar>
          <AvatarDisplay {...message.user.avatar} />
        </Avatar>
      </Grid>
      <Grid item sm={10}>
        <Paper className={isDefaultDirection ? classes.bubble : classes.bubbleReverse}>
          <Typography className={classes.text}>
            {message.text}
          </Typography>
          <PostChatReactions created={message.created} />
        </Paper>
      </Grid>
    </Grid>
  )
}

PostChatMessage.propTypes = {
  message: PropTypes.object,
}

export default PostChatMessage
