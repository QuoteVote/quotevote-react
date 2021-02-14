import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Grid, Typography, IconButton, Popover,
} from '@material-ui/core'
import { InsertEmoticon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Picker } from 'emoji-mart'
import Emoji from 'a11y-react-emoji'
import _ from 'lodash'
import 'emoji-mart/css/emoji-mart.css'
import moment from 'moment'
import { ADD_MESSAGE_REACTION } from '../../graphql/mutations'
import { GET_MESSAGE_REACTIONS } from '../../graphql/query'
import { UPDATE_MESSAGE_REACTION } from '../../graphql/mutations'

function PostChatReactions(props) {
  const userId = useSelector((state) => state.user.data._id)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { created, messageId, reactions } = props
  const parsedTime = moment(created).format('LLL')
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

  function handleClick(event) {
    setAnchorEl(event.target)
    setOpen(true)
  }

  async function handleEmojiSelect(emoji) {
    const userReaction = await _.find(reactions, { userId: userId }) || null
    const newEmoji = emoji.native
    const reaction = {
      userId,
      messageId,
      emoji: newEmoji,
    }

    if (userReaction !== null) {
      console.log(userReaction)
      await updateReaction({
        variables: { _id: userReaction._id, emoji: reaction.emoji },
      })
    } else {
      await addReaction({
        variables: { reaction },
      })
    }
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
        <IconButton onClick={(event) => { handleClick(event) }}>
          <InsertEmoticon />
        </IconButton>
        <>
          {reactions ? reactions.map((reaction) => <Emoji symbol={reaction.emoji} key={reaction._id} />) : null}
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
      </Grid>
    </Grid>
  )
}

PostChatReactions.propTypes = {
  created: PropTypes.string,
  messageId: PropTypes.string,
  reactions: PropTypes.array,
}

export default PostChatReactions
