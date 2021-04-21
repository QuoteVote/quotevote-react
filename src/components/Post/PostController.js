import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/react-hooks'
import { GET_POST } from 'graphql/query'
import PostPage from 'views/PostsPage/PostPage'
import { SET_SELECTED_PAGE } from 'store/ui'

function PostController() {
  const { postId } = useParams()
  console.log(postId)
  const [postData, setPostData] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(SET_SELECTED_PAGE(null))
  }, [dispatch])

//   useEffect(() => {
//     if (data) {
//       setPostData(data.post)
//     }
//   }, [data])

  return (
    <PostPage
      dispatch={dispatch}
      postId={postId}
    />
  )
}

export default PostController
