import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Grid, Typography, IconButton, Popover,
} from '@material-ui/core'
import { InsertEmoticon } from '@material-ui/icons'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { parseCommentDate } from '../../utils/momentUtils'

function PostChatReactions(props) {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { created } = props
  const parsedTime = parseCommentDate(created)

  function handleClick(event) {
    setAnchorEl(event.target)
    setOpen(true)
  }

  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
    >
      <Grid item>
        <Typography>{parsedTime}</Typography>
      </Grid>
      <Grid item>
        <IconButton fontSize="small">
          <FavoriteBorderOutlinedIcon onClick={(event) => { handleClick(event) }} />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={() => setOpen(false)}
        >
          <div className="reactions">
            <Picker showPreview={false} showSkinTones={false}/>
          </div>
        </Popover>
      </Grid>
    </Grid>
  )
}

PostChatReactions.propTypes = {
  created: PropTypes.string,
}

export default PostChatReactions
