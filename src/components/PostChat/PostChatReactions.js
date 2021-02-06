import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid, Typography,
} from '@material-ui/core'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import moment from 'moment'

function PostChatReactions(props) {
  const { created } = props
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
      <Grid item>
        <FavoriteBorderOutlinedIcon onClick={(event) => { console.log('Love Love') }} />
      </Grid>
    </Grid>
  )
}

PostChatReactions.propTypes = {
  created: PropTypes.string,
}

export default PostChatReactions
