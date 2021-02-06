import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { Grid } from '@material-ui/core'
import PostChatMessage from './PostChatMessage'
import { GET_ROOM_MESSAGES } from '../../graphql/query'
import PostChatSend from './PostChatSend'
import { NEW_MESSAGE_SUBSCRIPTION } from '../../graphql/subscription'

function PostChat(props) {
  const { messageRoomId, title } = props
  const {
    loading, error, data, refetch,
  } = useQuery(GET_ROOM_MESSAGES, {
    variables: { messageRoomId },
  })

  useSubscription(
    NEW_MESSAGE_SUBSCRIPTION,
    {
      variables: { messageRoomId },
      onSubscriptionData: async () => {
        await refetch()
      },
    },
  )

  if (error) return 'Loading'

  const messages = (!loading && data.messages) || []
  const orderedMessages = _.orderBy(messages, ['created'], ['desc'])

  return (
    <Grid container>
      <PostChatSend messageRoomId={messageRoomId} title={title} />
      {orderedMessages.map((message) => (
        <PostChatMessage message={message} key={message._id} />
      ))}
    </Grid>
  )
}

PostChat.propTypes = {
  messageRoomId: PropTypes.string,
  title: PropTypes.string,
}

export default PostChat
