/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom'
// creates a beautiful scrollbar
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import appRoutes from 'routes'
import styles from 'assets/jss/material-dashboard-pro-react/layouts/adminStyle'
import { tokenValidator } from 'store/actions/login'
import ChatDrawer from '../components/ChatComponents/ChatDrawer'
import MainNavBar from '../components/Navbars/MainNavBar'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#35a511',
    },
  },
  typography: {
    useNextVariants: true,
  },
})
const useStyles = makeStyles(styles)

export default function Scoreboard(props) {
  const history = useHistory()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [page, setPage] = React.useState('Home')
  // styles
  const classes = useStyles()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const getRoute = () => window.location.pathname !== '/admin/full-screen-maps'
  const getRoutes = (routes) => routes.map((prop, key) => {
    if (prop.collapse) {
      return getRoutes(prop.views)
    }
    if (prop.layout) {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      )
    }
    return null
  })

  const routes = getRoutes(appRoutes)
  useEffect(() => {
    const {
      location: { pathname },
    } = props
    const currLocation = pathname.split('/')
    const currentPage = appRoutes.filter(
      (appRoute) => appRoute.layout === `/${currLocation[1]}` && appRoute.path === `/${currLocation[2]}`,
    )
    setPage(currentPage[0].name)
  }, [props])

  const [chatOpen, setChatOpen] = React.useState(false)

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <MainNavBar classes={classes} />
        {!tokenValidator() && history.push('/unauth')}
        <main className={chatOpen ? classes.contentChat : classes.content}>
          {getRoute() ? (
            <Switch>
              {routes}
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
          ) : (
            <Switch>
              {routes}
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
          )}
          {chatOpen && <ChatDrawer />}
        </main>
      </div>
    </MuiThemeProvider>
  )
}
