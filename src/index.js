/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Timls

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { ApolloProvider } from '@apollo/react-hooks'
import { createBrowserHistory } from 'history'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom'
import AdminLayout from 'layouts/Admin'
import AuthLayout from 'layouts/Auth'
import client from 'config/apollo'
import React from 'react'
import ReactDOM from 'react-dom'
import RtlLayout from 'layouts/RTL'
import Scoreboard from 'layouts/Scoreboard'
import TokenExpired from 'layouts/TokenExpired'
import store, { persistor } from 'store/store'

import 'assets/scss/material-dashboard-pro-react.scss'

const hist = createBrowserHistory()

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={hist}>
          <Switch>
            <Route path="/rtl" component={RtlLayout} />
            <Route path="/auth" component={AuthLayout} />
            <Route path="/admin" component={AdminLayout} />
            <Route path="/hhsb" component={Scoreboard} />
            <Route path="/unauth" component={TokenExpired} />
            <Redirect from="/" to="/auth" />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
