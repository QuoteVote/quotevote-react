import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import Post from '../../components/Post/Post'
import PostActionList from '../../components/PostActions/PostActionList'
import PostSkeleton from '../../components/Post/PostSkeleton'
import PostChat from '../../components/PostChat/PostChat'
import { GET_ROOM_MESSAGES, GET_POST } from '../../graphql/query'
import { NEW_MESSAGE_SUBSCRIPTION } from '../../graphql/subscription'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 10,
  },
}))

function PostPage() {
  const classes = useStyles()

  // To reset the scroll when the selected post changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const postId = useSelector((state) => state.ui.selectedPost.id)

  const { loading: loadingPost, error: postError, data: postData } = useQuery(GET_POST, {
    variables: { postId },
    fetchPolicy: 'cache-and-network',
  })

  const user = useSelector((state) => state.user.data)

  if (postError) return 'Something went wrong!'
  const { post } = !loadingPost && postData
  console.log(post)

  let messageRoomId
  let title
  if (post) {
    title = post.title
    messageRoomId = post.messageRoom._id
  }

  const {
    loading: loadingMessages, error: messageError, data: messageData, refetch,
  } = useQuery(GET_ROOM_MESSAGES, {
    variables: { messageRoomId },
  })

  console.log(messageData)

  useSubscription(
    NEW_MESSAGE_SUBSCRIPTION,
    {
      variables: { messageRoomId },
      onSubscriptionData: async () => {
        await refetch()
      },
    },
  )

  const {
    comments, votes, quotes, url,
  } = post || { comments: [], votes: [], quotes: [] }
  let postActions = []

  //add messages here
  // get messages associated with the messageRoomId
  //if messages exist - copy display them with the rest of the data. 
  //If not, yada yada

  if (!isEmpty(comments)) {
    postActions = postActions.concat(comments)
  }

  if (!isEmpty(votes)) {
    postActions = postActions.concat(votes)
  }

  if (!isEmpty(quotes)) {
    postActions = postActions.concat(quotes)
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
      <Grid item xs={12} md={6}>
        {loadingPost ? <PostSkeleton /> : <Post post={post} loading={loadingPost} user={user} />}
      </Grid>
      <Grid item className={classes.root} xs={12} md={6}>
        <PostChat messageRoomId={messageRoomId} title={title} />
        <PostActionList loading={loadingPost} postActions={postActions} postUrl={url} />
      </Grid>
    </Grid>
  )
}

export default PostPage
