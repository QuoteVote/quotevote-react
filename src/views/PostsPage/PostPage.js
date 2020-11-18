import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import Post from '../../components/Post/Post'
import PostActionList from '../../components/PostActions/PostActionList'
import { GET_POST } from '../../graphql/query'
import PostSkeleton from '../../components/Post/PostSkeleton'

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
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
    fetchPolicy: 'cache-and-network',
  })
  const user = useSelector((state) => state.user.data)

  if (error) return 'Something went wrong!'
  const { post } = !loading && data
  const { comments } = post || { comments: [] }
  const { votes } = post || { votes: [] }
  const { quotes } = post || { quotes: [] }
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
        {loading ? <PostSkeleton /> : <Post post={post} loading={loading} user={user} />}
      </Grid>
      <Grid item xs={12} md={6}>
        <PostActionList loading={loading} postActions={postActions} />
      </Grid>
    </Grid>
  )
}

export default PostPage
