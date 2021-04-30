import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import PostController from 'components/Post/PostController'

export default function PostRouter() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Route path="/post/:group/:title/:postId">
        <PostController />
      </Route>
    </>
  )
}
