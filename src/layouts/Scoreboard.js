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
import { tokenValidator } from 'store/user'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SNACKBAR } from 'store/ui'
import Snackbar from 'mui-pro/Snackbar/Snackbar'
import MainNavBar from '../components/Navbars/MainNavBar'
import Sidebar from '../mui-pro/Sidebar/Sidebar'
import withUser from '../hoc/withUser'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#35a511',
    },
    background: {
      default: '#EEF4F9',
    },
  },
  typography: {
    useNextVariants: true,
  },
})
const useStyles = makeStyles(styles)

function Scoreboard(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const snackbar = useSelector((state) => state.ui.snackbar)
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

  // TODO: Abstract validation into custom hook
  useEffect(() => {
    if (!tokenValidator(dispatch)) history.push('/unauth')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            page={page}
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
            dispatch={dispatch}
          />
        </Hidden>
        <main className={classes.content}>
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
          {
            snackbar ? (
              <Snackbar
                place="bc"
                color={snackbar.type}
                message={snackbar.message}
                open={snackbar.open}
                closeNotification={() => dispatch(SET_SNACKBAR({ open: false, message: '', type: '' }))}
                close
              />
            ) : null
          }
        </main>
      </div>
    </MuiThemeProvider>
  )
}

export default withUser(Scoreboard)
