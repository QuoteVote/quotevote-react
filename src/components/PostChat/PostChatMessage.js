import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  Grid, Paper, Typography, Avatar,
} from '@material-ui/core'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import { makeStyles } from '@material-ui/core/styles'
import AvatarDisplay from '../Avatar'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: 10,
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
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={2} md={2}>
        <Avatar>
          <AvatarDisplay height={70} width={70} {...message.user.avatar} />
        </Avatar>
      </Grid>
      <Grid item xs={10} md={10}>
        <Grid item xs={10} md={10}>
          <Paper className={isDefaultDirection ? classes.bubble : classes.bubbleReverse}>
            <Typography variant="p">
              {message.text}
            </Typography>
            <Grid container direction="row" justify="flex-end">
              <Grid item md={3} xs={3}>
                <Typography className="timestamp">{message.timestamp}</Typography>
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

PostChatMessage.propTypes = {
  message: PropTypes.object,
}

export default PostChatMessage
