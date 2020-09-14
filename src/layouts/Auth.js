/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// core components
import AuthNavbar from 'mui-pro/Navbars/AuthNavbar'
import Footer from 'mui-pro/Footer/Footer'

import routes from 'mui-pro/mui-routes'

import styles from 'assets/jss/material-dashboard-pro-react/layouts/authStyle'

import register from 'assets/img/register.jpeg'
import login from 'assets/img/login.jpeg'
import lock from 'assets/img/lock.jpeg'
import error from 'assets/img/clint-mckoy.jpg'
import pricing from 'assets/img/bg-pricing.jpeg'
import requestAccess from 'assets/img/RequestAccess/bg.png'
import buildingsBG from 'assets/img/BuildingsBG.png'

const useStyles = makeStyles(styles)

export default function Pages(props) {
  const isRequestAccess = window.location.pathname.indexOf('/auth/request-access') !== -1
  const { ...rest } = props
  // ref for the wrapper div
  const wrapper = React.createRef()
  // styles
  const classes = useStyles()
  React.useEffect(() => {
    document.body.style.overflow = 'unset'
    // Specify how to clean up after this effect:
    return function cleanup() {}
  })
  const getRoutes = (routesParameter) => routesParameter.map((prop, key) => {
    if (prop.collapse) {
      return getRoutes(prop.views)
    }
    if (prop.layout === '/auth') {
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
  const getBgImage = () => {
    if (window.location.pathname.indexOf('/auth/register-page') !== -1) {
      return register
    } if (window.location.pathname.indexOf('/auth/login-page') !== -1) {
      return login
    } if (window.location.pathname.indexOf('/auth/pricing-page') !== -1) {
      return pricing
    } if (
      window.location.pathname.indexOf('/auth/lock-screen-page') !== -1
    ) {
      return lock
    } if (isRequestAccess) {
      return requestAccess
    } if (
      window.location.pathname.indexOf('/auth/landing-page') !== -1
    ) {
      return buildingsBG
    } if (
      window.location.pathname.indexOf('/auth/investor-thanks') !== -1
    ) {
      return buildingsBG
    } if (window.location.pathname.indexOf('/auth/error-page') !== -1) {
      return error
    }
  }
  const getActiveRoute = (routesParameter) => {
    const activeRoute = 'Default Brand Text'
    for (let i = 0; i < routesParameter.length; i++) {
      if (routesParameter[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routesParameter[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else if (
        window.location.href.indexOf(routesParameter[i].layout + routesParameter[i].path) !== -1
      ) {
        return routesParameter[i].name
      }
    }
    return activeRoute
  }
  return (
    <div>
      <AuthNavbar brandText={getActiveRoute(routes)} {...rest} />
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={isRequestAccess ? classes.requestAccessFullPage : classes.fullPage}
          style={{ backgroundImage: `url(${getBgImage()})` }}
        >
          <Switch>
            {getRoutes(routes)}
            <Redirect from="/auth" to="/auth/landing-page" />
          </Switch>
          <Footer white />
        </div>
      </div>
    </div>
  )
}
