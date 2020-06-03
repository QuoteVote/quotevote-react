/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom'
// creates a beautiful scrollbar
import 'perfect-scrollbar/css/perfect-scrollbar.css'
// Images
import logoWhite from 'assets/img/logo-white.svg'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components
import MenuSidebar from 'components/MenuSidebar'

import appRoutes from 'routes'

import styles from 'assets/jss/material-dashboard-pro-react/layouts/adminStyle'
import { tokenValidator } from 'store/actions/login'
import PopoverMenu from '../components/PopoverMenu'
import ChatDrawer from '../components/ChatComponents/ChatDrawer'

const useStyles = makeStyles(styles)

export default function Scoreboard(props) {
  const { ...rest } = props
  const history = useHistory()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [color] = React.useState('blue')
  const [bgColor] = React.useState('black')
  const [logo] = React.useState(logoWhite)
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

  return (
    <div className={classes.wrapper}>
      {!tokenValidator() && history.push('/unauth')}
      <MenuSidebar
        routes={appRoutes}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen} // true for development. mobileOpen for prod
        color={color}
        bgColor={bgColor}
        currentRoute={currentRoute()}
        {...rest}
      />

      <main className={classes.content}>
        <PopoverMenu
          classes={classes}
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
          appRoutes={appRoutes}
          page={page}
        />
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
        <ChatDrawer />
      </main>
    </div>
  )
}
