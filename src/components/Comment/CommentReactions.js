import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  IconButton, Popover,
} from '@material-ui/core'
import { InsertEmoticon } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Picker } from 'emoji-mart'
import Emoji from 'a11y-react-emoji'
import _ from 'lodash'
import 'emoji-mart/css/emoji-mart.css'
import { ADD_ACTION_REACTION, UPDATE_ACTION_REACTION } from '../../graphql/mutations'
import { GET_ACTION_REACTIONS } from '../../graphql/query'

function CommentReactions(props) {
  const userId = useSelector((state) => state.user.data._id)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { actionId, reactions } = props
  const [addReaction] = useMutation(ADD_ACTION_REACTION, {
    onError: (err) => {
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
      console.log(err)
    },
    refetchQueries: [{
      query: GET_ACTION_REACTIONS,
      variables: {
        actionId,
      },
    }],
  })

  const userReaction = _.find(reactions, { userId: userId }) || null

  const mostFrequentReaction = _.head(_(reactions)
    .countBy('emoji')
    .entries()
    .maxBy(_.last))

  const displayReaction = userReaction ? userReaction : mostFrequentReaction

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

  return (
    <div>
      <IconButton onClick={(event) => { handleClick(event) }}>
        <InsertEmoticon />
      </IconButton>
      <>
        {userReaction && userReaction.emoji !== displayReaction.emoji ? <Emoji symbol={userReaction.emoji} /> : null}
        {displayReaction ? <Emoji symbol={displayReaction.emoji} /> : null}
        {reactions && reactions.length > 0 ? <span>{reactions.length}</span> : null}
      </>
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
