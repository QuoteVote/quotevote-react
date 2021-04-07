import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { isEmpty, get } from 'lodash'
import Post from '../../components/Post/Post'
import PostActionList from '../../components/PostActions/PostActionList'
import PostSkeleton from '../../components/Post/PostSkeleton'
import { GET_ROOM_MESSAGES, GET_POST } from '../../graphql/query'
import { NEW_MESSAGE_SUBSCRIPTION } from '../../graphql/subscription'
import PostChatSend from '../../components/PostChat/PostChatSend'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 10,
  },
}))

function PostPage() {
  const classes = useStyles()
  const [postHeight, setPostHeight] = useState()

  // To reset the scroll when the selected post changes
  useEffect(() => {
    window.scrollTo(0, 0)
    setPostHeight(document.getElementById('post').clientHeight)
  }, [])

  const postId = useSelector((state) => state.ui.selectedPost.id)

  const { loading: loadingPost, error: postError, data: postData } = useQuery(GET_POST, {
    variables: { postId },
    fetchPolicy: 'cache-and-network',
  })

  const user = useSelector((state) => state.user.data)

  const post = !loadingPost && get(postData, 'post', false)

  let messageRoomId
  let title
  if (post) {
    messageRoomId = post.messageRoom._id
    title = post.title
  }

  const {
    loading: loadingMessages, data: messageData, refetch,
  } = useQuery(GET_ROOM_MESSAGES, {
    skip: !messageRoomId,
    variables: { messageRoomId },
  })

  useSubscription(
    NEW_MESSAGE_SUBSCRIPTION,
    {
      skip: !messageRoomId,
      variables: { messageRoomId },
      onSubscriptionData: async () => {
        await refetch()
      },
    },
  )

  if (postError) return 'Something went wrong!'

  const { messages } = (!loadingMessages && messageData) || []

  const {
    comments, votes, quotes, url,
  } = post || { comments: [], votes: [], quotes: [] }
  let postActions = []

  if (!isEmpty(comments)) {
    postActions = postActions.concat(comments)
  }

  if (!isEmpty(votes)) {
    postActions = postActions.concat(votes)
  }

  if (!isEmpty(quotes)) {
    postActions = postActions.concat(quotes)
  }

  if (!isEmpty(messages)) {
    postActions = postActions.concat(messages)
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="flex-start"
      spacing={4}
      className={classes.root}
      style={{ position: 'relative' }}
    >
      <Grid item xs={12} md={6} id="post">
        {loadingPost ? <PostSkeleton /> : <Post post={post} loading={loadingPost} user={user} />}
      </Grid>
      <Grid item className={classes.root} xs={12} md={6}>
        <PostChatSend messageRoomId={messageRoomId} title={title} />
        <PostActionList loading={loadingPost} postActions={postActions} postUrl={url} postHeight={postHeight} />
      </Grid>
    </Grid>
  )
}

export default PostPage
