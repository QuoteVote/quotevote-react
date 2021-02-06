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
  bubble: {
    position: 'relative',
    background: '#ffffff',
    minHeight: 30,
    width: 500,
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
    width: 500,
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

function PostChatMessage(props) {
  const { message } = props
  const classes = useStyles()
  const userId = useSelector((state) => state.user.data._id)
  const isDefaultDirection = message.userId !== userId
  const direction = isDefaultDirection ? 'row' : 'row-reverse'

  return (
    <Grid
      container
      direction={direction}
      justify="space-evenly"
      alignItems="center"
      className={classes.root}
    >
      <Grid item className={classes.root}>
        <Avatar>
          <AvatarDisplay height={70} width={70} {...message.user.avatar} />
        </Avatar>
      </Grid>
      <Grid item>
        <Paper className={isDefaultDirection ? classes.bubble : classes.bubbleReverse}>
          <Typography variant="p">
            {message.text}
          </Typography>
          <PostChatReactions created={message.created}/>
        </Paper>
      </Grid>
    </Grid>
  )
}

PostChatMessage.propTypes = {
  message: PropTypes.object,
}

export default PostChatMessage
