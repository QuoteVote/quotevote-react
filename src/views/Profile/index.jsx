import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import Profile from 'components/Profile/ProfileController'
import SimpleAvatarEditor from 'components/Profile/SimpleAvatarEditor'
import FollowInfo from 'components/Profile/FollowInfo'

export default function ProfileRouter() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Route exact path="/Profile">
        <Profile />
      </Route>
      <Route exact path="/Profile/:username/">
        <Profile />
      </Route>
      <Route exact path="/Profile/:username/avatar">
        <SimpleAvatarEditor />
      </Route>
      <Route exact path="/Profile/:username/following">
        <FollowInfo filter="following" />
      </Route>
      <Route exact path="/Profile/:username/followers">
        <FollowInfo filter="followers" />
      </Route>
    </>
  )
}
