import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  IconButton, Popover,
} from '@material-ui/core'
import { InsertEmoticon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Picker } from 'emoji-mart'
import Emoji from 'a11y-react-emoji'
import _ from 'lodash'
import 'emoji-mart/css/emoji-mart.css'
import { ADD_ACTION_REACTION, UPDATE_ACTION_REACTION } from '../../graphql/mutations'
import { GET_ACTION_REACTIONS } from '../../graphql/query'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  emoji: {
    padding: 3,
    display: 'flex',
  },
  reactions: {
    borderRadius: 8,
    backgroundColor: '#F6F1F1',
    padding: '2px 6px',
    marginLeft: 4,
  },
}))

function CommentReactions(props) {
  const userId = useSelector((state) => state.user.data._id)
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { actionId, reactions } = props
  const [addReaction] = useMutation(ADD_ACTION_REACTION, {
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.log(err)
    },
    refetchQueries: [{
      query: GET_ACTION_REACTIONS,
      variables: {
        actionId,
      },
    }],
  })

  const [updateReaction] = useMutation(UPDATE_ACTION_REACTION, {
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.log(err)
    },
    refetchQueries: [{
      query: GET_ACTION_REACTIONS,
      variables: {
        actionId,
      },
    }],
  })

  const groupedReactions = _.groupBy(reactions, 'emoji')

  const userReaction = _.find(reactions, { userId }) || null

  // Handle emoji button interaction
  function handleClick(event) {
    setAnchorEl(event.target)
    setOpen(true)
  }

  async function handleEmojiSelect(emoji) {
    const newEmoji = emoji.native
    const reaction = {
      userId,
      actionId,
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

  Object.keys(groupedReactions).map((emoji, _id) => emojiElements.push(
    <div className={classes.reactions} key={_id}>
      <Emoji symbol={emoji} />
      <span>{groupedReactions[emoji].length}</span>
    </div>
  ))

  return (
    <div className={classes.container}>
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
    </div>
  )
}

CommentReactions.propTypes = {
  actionId: PropTypes.string,
  reactions: PropTypes.array,
}

export default CommentReactions
