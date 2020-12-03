import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import Profile from 'components/Profile/ProfileController'
import ChangePhoto from 'components/Profile/ChangePhoto'
import FollowInfo from 'components/Profile/FollowInfo'

export default function ProfileRouter() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Route exact path="/hhsb/Profile">
        <Profile />
      </Route>
      <Route exact path="/hhsb/Profile/:username/">
        <Profile />
      </Route>
      <Route exact path="/hhsb/Profile/:username/avatar">
        <ChangePhoto />
      </Route>
      <Route exact path="/hhsb/Profile/:username/following">
        <FollowInfo filter="following" />
      </Route>
      <Route exact path="/hhsb/Profile/:username/followers">
        <FollowInfo filter="followers" />
      </Route>
    </>
  )
}
