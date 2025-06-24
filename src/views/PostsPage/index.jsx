import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import PostController from 'components/Post/PostController'
import { useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { tokenValidator } from 'store/user'
import SubmitPost from '../../components/SubmitPost/SubmitPost'

export default function PostRouter() {
  const [, setOpen] = React.useState(true)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/post' && !tokenValidator(dispatch)) {
      history.push('/Home')
    }
  }, [location.pathname, dispatch, history])

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
