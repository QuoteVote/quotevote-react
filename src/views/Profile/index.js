import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import ChangePhoto from './ChangePhoto'
import Followers from './Followers'
import Following from './Following'

export default function ProfileRouter() {
  //  Route to main Profile routes
  //  My Profile vs Different Profile?  / Change avatar / followers / following

  return (
    <Switch>
      <Route exact path="/hhsb/Profile">
        <Home />
      </Route>
      <Route exact path="/hhsb/Profile/:userId/">
        <Home />
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
    </Switch>
  )
}
