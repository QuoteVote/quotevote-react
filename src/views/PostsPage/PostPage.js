import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import Link from '@material-ui/core/Link'
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
  link: {
    color: '#00bcd4',
  },
}))

function PostPage({ postId }) {
  const classes = useStyles()
  const [postHeight, setPostHeight] = useState()

  const idSelector = useSelector((state) => state.ui.selectedPost.id)
  const user = useSelector((state) => state.user.data)

  const {
    loading: loadingPost,
    error: postError,
    data: postData,
    refetch: refetchPost,
  } = useQuery(GET_POST, {
    variables: { postId },
  })

  const { post } = !loadingPost && postData

  // To reset the scroll when the selected post changes
  useEffect(() => {
    window.scrollTo(0, 0)
    if (post) {
      setPostHeight(document.getElementById('post').clientHeight)
    }
  }, [post])

  useEffect(() => {
    refetchPost({ postId: idSelector })
  }, [idSelector, refetchPost])

  let messageRoomId
  let title
  if (post) {
    messageRoomId = postData.post.messageRoom._id
    title = postData.post.title
  }

  const {
    loading: loadingMessages, data: messageData, refetch: refetchMessages,
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
        await refetchMessages()
      },
    },
  )

  if (postError) return 'Something went wrong!'

  const { messages } = (!loadingMessages && messageData) || []

  const {
    comments, votes, quotes, postUrl,
  } = post || {
    comments: [], votes: [], quotes: [], postUrl: '',
  }
  let postActions = []

  const { url } = !loadingPost && postUrl

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

  if (!loadingPost && !post) {
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
        <Grid item xs={12}>
          <Typography>
            Invalid post.
            {' '}
            <Link href="/home" className={classes.link}>
              Return to homepage.
            </Link>
          </Typography>
        </Grid>
      </Grid>
    )
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
        {loadingPost ? <PostSkeleton /> : <Post post={post} loading={loadingPost} user={user} postHeight={postHeight} postActions={postActions} />}
      </Grid>
      <Grid item className={classes.root} xs={12} md={6}>
        <PostChatSend messageRoomId={messageRoomId} title={title} />
        <PostActionList loading={loadingPost} postActions={postActions} postUrl={url} />
      </Grid>
    </Grid>
  )
}

PostPage.propTypes = {
  postId: PropTypes.string,
}

export default PostPage
