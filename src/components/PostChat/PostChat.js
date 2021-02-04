import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { CHAT_SUBMITTING } from 'store/chat'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Grid, InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SendIcon from 'assets/svg/SendIcon.svg'
import PostChatMessage from './PostChatMessage'
import { SEND_MESSAGE } from '../../graphql/mutations'
import { GET_ROOM_MESSAGES } from '../../graphql/query'
import PostChatSend from './PostChatSend'

function PostChat(props) {
  console.log(props)
  const dispatch = useDispatch()
  const { messageRoomId } = props
  const [text, setText] = useState()
  const avatar = useSelector((state) => state.user.data.avatar)
  const user = useSelector((state) => state.user.data)
  const userId = useSelector((state) => state.user.data._id)
  const {
    loading, error, data, refetch,
  } = useQuery(GET_ROOM_MESSAGES, {
    variables: { messageRoomId },
  })

  const messages = (!loading && data.messages) || []
  console.log(messages)

  async function handleSubmit() {
    // const dateSubmitted = new Date()
    // await createMessage({
    //   variables: { message },
    //   optimisticResponse: {
    //     __typename: 'Mutation',
    //     createMessage: {
    //       __typename: 'Message',
    //       _id: dateSubmitted, // dummy
    //       messageRoomId,
    //       userName: user.name,
    //       userId: user._id,
    //       title,
    //       text,
    //       type,
    //       created: dateSubmitted,
    //       user: {
    //         __typename: 'User',
    //         name: user.name,
    //         username: user.username,
    //         avatar: user.avatar,
    //       },
    //     },
    //   },
    //   // eslint-disable-next-line no-shadow
    //   update: (proxy, { data: { createMessage } }) => {
    //     // Read the data from our cache for this query.
    //     const data = proxy.readQuery({ query: GET_ROOM_MESSAGES, variables: { messageRoomId } })
    //     if (data) {
    //       // Write our data back to the cache with the new message in it
    //       proxy.writeQuery({
    //         query: GET_ROOM_MESSAGES,
    //         variables: { messageRoomId },
    //         data: {
    //           ...data,
    //           messages: [...data.messages, createMessage],
    //         },
    //       })
    //     }
    //   },
    // })
  }

  return (
    <Grid container>
     <PostChatSend messageRoomId={messageRoomId} />
      {messages.map((message) => (
        <PostChatMessage message={message} />
      ))} 
    </Grid>
  )
}

PostChat.propTypes = {
  postId: PropTypes.string,
}

export default PostChat
