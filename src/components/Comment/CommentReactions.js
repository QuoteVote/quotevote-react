import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
   IconButton, Popover,
} from '@material-ui/core'
import { InsertEmoticon } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Picker } from 'emoji-mart'
import Emoji from 'a11y-react-emoji'
import _ from 'lodash'
import 'emoji-mart/css/emoji-mart.css'
import moment from 'moment'
import { ADD_ACTION_REACTION } from '../../graphql/mutations'
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

  const userReaction = _.find(reactions, { userId: userId }) || null

  function handleClick(event) {
    setAnchorEl(event.target)
    setOpen(true)
  }

  async function handleEmojiSelect(emoji) {
    console.log(emoji)
    const newEmoji = emoji.native
    const reaction = {
      userId,
      actionId,
      emoji: newEmoji,
    }

    await addReaction({
      variables: { reaction },
    })
  }

  return (
    <div>
      <IconButton onClick={(event) => { handleClick(event) }}>
        <InsertEmoticon />
      </IconButton>
      <Fragment>
          {reactions ? reactions.map((reaction) => <Emoji symbol={reaction.emoji} key={reaction._id}/>) : null}
          {reactions && reactions.length > 0 ? <span>{reactions.length}</span> : null}
        </Fragment>
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
}

export default CommentReactions
