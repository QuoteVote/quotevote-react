/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom'
// creates a beautiful scrollbar
import 'perfect-scrollbar/css/perfect-scrollbar.css'
// Images
// @material-ui/core components
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles'
// core components
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import MenuIcon from '@material-ui/icons/Menu'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import appRoutes from 'routes'
import styles from 'assets/jss/material-dashboard-pro-react/layouts/adminStyle'
import { tokenValidator } from 'store/actions/login'
import { Typography } from '@material-ui/core'
import SvgIcon from '@material-ui/core/SvgIcon'
import IconButton from '@material-ui/core/IconButton'
import ChatDrawer from '../components/ChatComponents/ChatDrawer'

import voxPopIcon from '../assets/img/voxPopIcon.jpg'
import { ReactComponent as HomeSvg } from '../assets/svg/Home.svg'
import { ReactComponent as TrendingSvg } from '../assets/svg/TrendingIcon.svg'
import { ReactComponent as AddPostSvg } from '../assets/svg/AddPost.svg'
import { ReactComponent as ChatSvg } from '../assets/svg/Chat.svg'
import { ReactComponent as NotificationsSvg } from '../assets/svg/Notifications.svg'
import { ReactComponent as SettingsSvg } from '../assets/svg/Settings.svg'


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

  const currentRoute = () => {
    const {
      location: { pathname },
    } = props
    const currLocation = pathname.split('/')
    return currLocation[currLocation.length - 1]
  }
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
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

  const [selectedMenu, setSelectedMenu] = React.useState(0)

  const handleMenu = (event, newAlignment) => {
    setSelectedMenu(newAlignment)
  }


  const [chatOpen, setChatOpen] = React.useState(false)

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid>
                <img alt="voxPOP" src={voxPopIcon} className={classes.voxPop} />
              </Grid>

              <Grid>
                <Hidden only={['xs', 'sm']}>
                  <Tabs
                    value={selectedMenu}
                    onChange={handleMenu}
                    indicatorColor="secondary"
                    textColor="secondary"
                  >
                    <Tab
                      icon={<SvgIcon component={HomeSvg} fontSize="large" viewBox="0 0 37 37" />}
                      aria-label="Home"
                    />
                    <Tab
                      icon={(
                        <SvgIcon
                          component={TrendingSvg}
                          fontSize="large"
                          viewBox="0 0 50 50"
                        />
                      )}
                      aria-label="Trending"
                    />
                    <Tab
                      icon={(
                        <SvgIcon
                          component={AddPostSvg}
                          fontSize="large"
                          viewBox="0 0 32 32"
                        />
                      )}
                      aria-label="Post"
                    />
                  </Tabs>
                </Hidden>

                <Hidden only={['md', 'lg', 'xl']}>
                  <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                </Hidden>
              </Grid>
              <Grid>
                <Hidden only={['xs', 'sm', 'md']}>
                  <div className={classes.profileRow}>
                    <IconButton
                      aria-label="Profile"
                      color="inherit"
                    >
                      <AccountCircle fontSize="large" />
                    </IconButton>
                    <Typography variant="h6" className={classes.profileBlockName}>
                      John
                      Doe
                    </Typography>
                  </div>
                </Hidden>
                <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                  <IconButton
                    aria-label="Profile"
                    color="inherit"
                  >
                    <AccountCircle fontSize="large" />
                  </IconButton>
                </Hidden>
              </Grid>
            </Grid>

            <IconButton
              aria-label="Chat"
              color="inherit"
              className={classes.rightMenuButton}
            >
              <SvgIcon
                component={ChatSvg}
                fontSize="large"
                viewBox="0 0 37 37"
              />
            </IconButton>

            <IconButton
              aria-label="Notifications"
              color="inherit"
              className={classes.rightMenuButton}
            >
              <SvgIcon
                component={NotificationsSvg}
                fontSize="large"
                viewBox="0 0 49 46"
              />
            </IconButton>

            <IconButton
              aria-label="Settings"
              color="inherit"
              className={classes.rightMenuButton}
            >
              <SvgIcon
                component={SettingsSvg}
                fontSize="large"
                viewBox="0 0 49 46"
                className={classes.rightMenuButton}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
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
