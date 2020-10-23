import React from 'react'
import { Route } from 'react-router-dom'
import Profile from 'components/Profile/ProfileController'
import ChangePhoto from 'components/Profile/ChangePhoto'
import FollowInfo from 'components/Profile/FollowInfo'

export default function ProfileRouter() {
  return (
    <>
      <Route exact path="/hhsb/Profile">
        <Profile />
      </Route>
      <Route exact path="/hhsb/Profile/:userId/">
        <Profile />
      </Route>
      <Route exact path="/hhsb/Profile/:userId/avatar">
        <ChangePhoto />
      </Route>
      <Route exact path="/hhsb/Profile/:userId/following">
        <FollowInfo filter="following" />
      </Route>
      <Route exact path="/hhsb/Profile/:userId/followers">
        <FollowInfo filter="followers" />
      </Route>
    </>
  )
}
