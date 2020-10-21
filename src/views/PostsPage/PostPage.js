import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import Post from '../../components/Post/Post'
import CommentList from '../../components/Comment/CommentList'
import { GET_POST } from '../../graphql/query'
import PostSkeleton from '../../components/Post/PostSkeleton'

const comment = {
  user: {
    name: 'John Doe',
    username: 'jdoe',
  },
  avatar: 'J',
  created: '11/06/2018 11:00 AM',
  text: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
}
// eslint-disable-next-line no-unused-vars
const comments = Array.from({ length: 5 }).map((i) => comment)

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 10,
  },
}))

function PostPage() {
  const classes = useStyles()

  const postId = useSelector((state) => state.ui.selectedPost.id)
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  })
  const user = useSelector((state) => state.user.data)

  if (error) return 'Something went wrong!'
  const { post } = !loading && data
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="flex-start"
      spacing={4}
      className={classes.root}
    >
      <Grid item xs={12} md={6}>
        {loading ? <PostSkeleton /> : <Post post={post} loading={loading} user={user} />}
      </Grid>
      <Grid item xs={12} md={6}>
        <CommentList comments={comments} />
      </Grid>
    </Grid>
  )
}

export default PostPage
