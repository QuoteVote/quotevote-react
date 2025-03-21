import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import PostPage from 'views/PostsPage/PostPage'
import { SET_SELECTED_PAGE } from 'store/ui'

function PostController() {
  const { postId } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(SET_SELECTED_PAGE(null))
  }, [dispatch])

  return (
    <PostPage
      dispatch={dispatch}
      postId={postId}
    />
  )
}

export default PostController
