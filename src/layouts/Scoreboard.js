/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom'
// creates a beautiful scrollbar
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import logoWhite from 'assets/img/logo-white.svg'

import Hidden from '@material-ui/core/Hidden'
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import appRoutes from 'routes'
import styles from 'assets/jss/material-dashboard-pro-react/layouts/adminStyle'
import { tokenValidator } from 'store/actions/login'
import ChatDrawer from '../components/ChatComponents/ChatDrawer'
import MainNavBar from '../components/Navbars/MainNavBar'
import Sidebar from '../mui-pro/Sidebar/Sidebar'


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

  const [color] = React.useState('blue')
  const [bgColor] = React.useState('black')
  const [logo] = React.useState(logoWhite)
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

  const currentRoute = () => {
    const {
      location: { pathname },
    } = props
    const currLocation = pathname.split('/')
    return currLocation[currLocation.length - 1]
  }


  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Hidden only={['xs', 'sm']}>
          <MainNavBar
            classes={classes}
            setChatOpen={setChatOpen}
            page={page}
            chatOpen={chatOpen}
          />
        </Hidden>
        <Hidden only={['md', 'lg', 'xl']}>
          <Sidebar
            routes={appRoutes}
            logo={logo}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color={color}
            bgColor={bgColor}
            currentRoute={currentRoute()}
            {...props}
            miniActive
          />
        </Hidden>
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
