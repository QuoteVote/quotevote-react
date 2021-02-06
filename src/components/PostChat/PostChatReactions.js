import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid, Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import moment from 'moment'

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 10,
  },
}))

function PostChatReactions(props) {
  const { created } = props
  const classes = useStyles()
  const time = moment(created).format('LT')

  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
    >
      <Grid item>
        <Typography className="timestamp">{time}</Typography>
      </Grid>
      <Grid item className={classes.root}>
        <FavoriteBorderOutlinedIcon onClick={(event) => { console.log('Love Love') }} />
      </Grid>
    </Grid>
  )
}

PostChatReactions.propTypes = {
  created: PropTypes.string,
}

export default PostChatReactions
