import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'
import LoadingSpinner from 'components/LoadingSpinner'
import { useQuery, useSubscription, useLazyQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
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

function PostPage({ postId }) {
  const classes = useStyles()
  const [postHeight, setPostHeight] = useState()
  const selectedPostId = useSelector((state) => state.ui.selectedPost.id)
  console.log(selectedPostId)

  // To reset the scroll when the selected post changes
  useEffect(() => {
    window.scrollTo(0, 0)
    // if (postId) {
    //   getPost({variables: { postId: postId }})
    // }
    if (post) {
      setPostHeight(document.getElementById('post').clientHeight)
    }
  }, [postId])

  const user = useSelector((state) => state.user.data)

  const { loading: loadingPost, error: postError, data: postData } = useQuery(GET_POST, {
    variables: { postId: postId || selectedPostId },
    fetchPolicy: 'cache-and-network',
  })

  //const [getPost, { loading: loadingPost, error: postError, data: postData }] = useLazyQuery(GET_POST)

  console.log(postData, loadingPost)
  // const { post } = !loadingPost && postData
  // console.log(post)

  let messageRoomId
  let title
  if (postData) {
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
    comments, votes, quotes, url,
  } = postData || { comments: [], votes: [], quotes: [] }
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
        {loadingPost ? <PostSkeleton /> : <Post post={postData.post} loading={loadingPost} user={user} />}
      </Grid>
      <Grid item className={classes.root} xs={12} md={6}>
        <PostChatSend messageRoomId={messageRoomId} title={title} />
        <PostActionList loading={loadingPost} postActions={postActions} postUrl={url} postHeight={postHeight} />
      </Grid>
    </Grid>
  )
}

export default PostPage
