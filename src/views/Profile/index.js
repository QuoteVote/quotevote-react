import React from 'react'
import { Route } from 'react-router-dom'
import Profile from 'components/Profile'
import ChangePhoto from './ChangePhoto'
import Followers from './Followers'
import Following from './Following'

export default function ProfileRouter() {
  //  Route to main Profile routes
  //  My Profile vs Different Profile?  / Change avatar / followers / following

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
        <Followers />
      </Route>
      <Route exact path="/hhsb/Profile/:userId/followers">
        <Following />
      </Route>
    </>
  )
}
