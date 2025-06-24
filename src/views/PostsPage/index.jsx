import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import PostController from 'components/Post/PostController'
import { useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { tokenValidator } from 'store/user'
import SubmitPost from '../../components/SubmitPost/SubmitPost'
import RequestInviteDialog from '../../components/RequestInviteDialog'

export default function PostRouter() {
  const [, setOpen] = useState(true)
  const [openInvite, setOpenInvite] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/post' && !tokenValidator(dispatch)) {
      setOpenInvite(true)
    }
  }, [location.pathname, dispatch])

  if (location.pathname === '/post') {
    if (!tokenValidator(dispatch)) {
      return (
        <RequestInviteDialog open={openInvite} onClose={() => setOpenInvite(false)} />
      )
    }
    return <SubmitPost setOpen={setOpen} />
  }

  return (
    <>
      <Route path="/post/:group/:title/:postId">
        <PostController />
      </Route>
    </>
  )
}
