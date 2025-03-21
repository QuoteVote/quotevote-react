import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import PostController from 'components/Post/PostController'
import { useLocation } from 'react-router'
import SubmitPost from '../../components/SubmitPost/SubmitPost'

export default function PostRouter() {
  const [open, setOpen] = React.useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const location = useLocation()

  if (location.pathname === '/post') {
    return (
      <SubmitPost setOpen={setOpen} />
    )
  }

  return (
    <>
      <Route path="/post/:group/:title/:postId">
        <PostController />
      </Route>
    </>
  )
}
