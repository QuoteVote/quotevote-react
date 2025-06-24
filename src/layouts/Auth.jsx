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

import { Grid } from '@material-ui/core'

const useStyles = makeStyles(styles)

export default function Pages(props) {
  // const isRequestAccess = window.location.pathname.indexOf('/auth/request-access') !== -1
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
  const getRoutes = (routesParameter) =>
    routesParameter.map((prop, key) => {
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

  const getActiveRoute = (routesParameter) => {
    const activeRoute = { name: 'Default Brand Text' }
    for (let i = 0; i < routesParameter.length; i++) {
      if (routesParameter[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routesParameter[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else if (
        window.location.href.indexOf(
          routesParameter[i].layout + routesParameter[i].path,
        ) !== -1
      ) {
        return routesParameter[i]
      }
    }
    return activeRoute
  }
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
      >
        {getActiveRoute(routes)?.hideNavbar ? null : (
          <Grid item>
            <AuthNavbar brandText={getActiveRoute(routes)?.name} {...rest} />
          </Grid>
        )}
        <Grid item>
          <div className={classes.wrapper} ref={wrapper}>
            <div className={classes.fullPage}>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/auth" to="/auth/landing-page" />
              </Switch>
            </div>
          </div>
        </Grid>
        {getActiveRoute(routes)?.hideNavbar ? null : (
          <Grid item>
            <Footer white />
          </Grid>
        )}
      </Grid>
    </div>
  )
}
