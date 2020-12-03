/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { ApolloProvider } from '@apollo/react-hooks'
import { createBrowserHistory } from 'history'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import {
  Redirect, Route, Router, Switch,
} from 'react-router-dom'
import AdminLayout from 'layouts/Admin'
import AuthLayout from 'layouts/Auth'
import client from 'config/apollo'
import React from 'react'
import ReactDOM from 'react-dom'
import Scoreboard from 'layouts/Scoreboard'
import TokenExpired from 'layouts/TokenExpired'
import store, { persistor } from 'store/store'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import customTheme from './theme'
import 'assets/scss/material-dashboard-pro-react.scss'
import LogoutPage from './components/LogoutPage'

import 'fontsource-montserrat'
import ErrorPage from './mui-pro/views/Pages/ErrorPage'

const hist = createBrowserHistory()
hist.listen(() => {
  window.scrollTo(0, 0)
})

const theme = createMuiTheme(customTheme)

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router history={hist}>
            <Switch>
              <Route path="/auth" component={AuthLayout} />
              <Route path="/admin" component={AdminLayout} />
              <Route path="/hhsb" component={Scoreboard} />
              <Route path="/unauth" component={TokenExpired} />
              <Route path="/logout" component={LogoutPage} />
              <Route path="/error" component={ErrorPage} />
              <Redirect from="/" to="/auth" />
            </Switch>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
