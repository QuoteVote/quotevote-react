import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Grid, Typography, IconButton, Popover,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { InsertEmoticon } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Picker } from 'emoji-mart'
import Emoji from 'a11y-react-emoji'
import _ from 'lodash'
import 'emoji-mart/css/emoji-mart.css'
import { parseCommentDate } from '../../utils/momentUtils'
import { ADD_MESSAGE_REACTION, UPDATE_MESSAGE_REACTION } from '../../graphql/mutations'
import { GET_MESSAGE_REACTIONS } from '../../graphql/query'

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: 4,
    fontSize: 12,
  },
  time: {
    paddingRight: 10,
  },
  emoji: {
    padding: 3,
    display: 'flex',
  },
  bubble: {
    borderRadius: 8,
    backgroundColor: '#F6F1F1',
    padding: '2px 6px',
    marginLeft: 4,
  },
  bubbleReverse: {
    borderRadius: 8,
    backgroundColor: '#56DA9C',
    padding: '2px 6px',
    marginLeft: 4,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
}))

function PostChatReactions(props) {
  const userId = useSelector((state) => state.user.data._id)
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const {
    created, messageId, reactions, isDefaultDirection,
  } = props
  const parsedTime = parseCommentDate(created)
  const [addReaction] = useMutation(ADD_MESSAGE_REACTION, {
    onError: (err) => {
      console.log(err)
    },
    refetchQueries: [{
      query: GET_MESSAGE_REACTIONS,
      variables: {
        messageId,
      },
    }],
  })

  const [updateReaction] = useMutation(UPDATE_MESSAGE_REACTION, {
    onError: (err) => {
      console.log(err)
    },
    refetchQueries: [{
      query: GET_MESSAGE_REACTIONS,
      variables: {
        messageId,
      },
    }],
  })

  const userReaction = _.find(reactions, { userId: userId }) || null

  const groupedReactions = _.groupBy(reactions, 'emoji')

  function handleClick(event) {
    setAnchorEl(event.target)
    setOpen(true)
  }

  async function handleEmojiSelect(emoji) {
    const newEmoji = emoji.native
    const reaction = {
      userId,
      messageId,
      emoji: newEmoji,
    }

    if (userReaction !== null) {
      await updateReaction({
        variables: { _id: userReaction._id, emoji: reaction.emoji },
      })
    } else {
      await addReaction({
        variables: { reaction },
      })
    }

    setOpen(false)
  }

  const emojiElements = []

  Object.keys(groupedReactions).map((emoji) => {
    emojiElements.push(
      <div className={isDefaultDirection ? classes.bubble : classes.bubbleReverse}>
        <Emoji symbol={emoji} />
        <span>{groupedReactions[emoji].length}</span>
      </div>
    )
  })

  console.log(groupedReactions)

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid item className={classes.time}>
        <Typography>{parsedTime}</Typography>
      </Grid>
      <Grid item className={classes.container}>
        <div className={classes.emoji}>
          {emojiElements}
        </div>
        <IconButton onClick={(event) => { handleClick(event) }}>
          <InsertEmoticon />
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
            <Picker showPreview={false} showSkinTones={false} onSelect={handleEmojiSelect} />
          </div>
        </Popover>
      </Grid>
    </Grid>
  )
}

PostChatReactions.propTypes = {
  created: PropTypes.string,
  messageId: PropTypes.string,
  reactions: PropTypes.array,
  isDefaultDirection: PropTypes.bool,
}

export default PostChatReactions
