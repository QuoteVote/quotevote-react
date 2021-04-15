import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import PostController from 'components/Post/PostController'
import PostPage from './PostPage'

export default function PostRouter() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Route path="/hhsb/post/:group/:title/:id">
        <PostController />
      </Route>
    </>
  )
}
