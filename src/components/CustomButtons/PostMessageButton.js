import React from 'react'
import { Comment } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { SELECTED_CHAT_ROOM, SET_CHAT_OPEN } from '../../store/chat'
import { CREATE_POST_MESSAGE_ROOM } from '../../graphql/mutations'

function PostMessageButton(props) {
  const {
    post: { title, _id },
  } = props
  const [createPostMessageRoom] = useMutation(CREATE_POST_MESSAGE_ROOM)
  const dispatch = useDispatch()
  const handlePostMessage = async () => {
    const { data } = await createPostMessageRoom({
      variables: { postId: _id },
    })
    dispatch(
      SELECTED_CHAT_ROOM({
        room: data.createPostMessageRoom,
        Text: title,
        type: 'POST',
        avatar: title,
      }),
    )
    dispatch(SET_CHAT_OPEN(true))
  }
  return (
    <IconButton {...props} onClick={handlePostMessage}>
      <Comment />
    </IconButton>
  )
}

PostMessageButton.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostMessageButton
