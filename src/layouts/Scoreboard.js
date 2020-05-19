/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Switch, Route, Redirect, useHistory,
} from 'react-router-dom'
import cx from 'classnames'
import React from 'react'

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

// Images
import logoWhite from 'assets/img/logo-white.svg'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// core components
import Sidebar from 'hhsbComponents/hhsbSidebar'

import hhsbRoutes from 'hhsbroutes'

import styles from 'assets/jss/material-dashboard-pro-react/layouts/adminStyle'
import { tokenValidator } from '../actions/login'

let ps

const useStyles = makeStyles(styles)

export default function Scoreboard(props) {
  const { ...rest } = props
  const history = useHistory()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [miniActive] = React.useState(true)
  const [color] = React.useState('blue')
  const [bgColor] = React.useState('black')
  const [logo] = React.useState(logoWhite)
  // styles
  const classes = useStyles()
  const mainPanelClasses =
    `${classes.mainPanel
    } ${
      cx({
        [classes.mainPanelSidebarMini]: miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf('Win') > -1,
      })}`
  // ref for main panel div
  const mainPanel = React.createRef()
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
      document.body.style.overflow = 'hidden'
    }
    window.addEventListener('resize', resizeFunction)

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
      window.removeEventListener('resize', resizeFunction)
    }
  })

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
  // const sidebarMinimize = () => {
  //   setMiniActive(!miniActive);
  //   console.log('minimize *****************************************')
  // };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false)
    }
  }
  const currentRoute = () => {
    const {
      location: { pathname },
    } = props
    const currLocation = pathname.split('/')
    return currLocation[currLocation.length - 1]
  }
  return (
    <div className={classes.wrapper}>
      {!tokenValidator() && history.push('/unauth')}
      <Sidebar
        routes={hhsbRoutes}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen} // true for development. mobileOpen for prod
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        currentRoute={currentRoute()}

        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {getRoutes(hhsbRoutes)}
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Switch>
              {getRoutes(hhsbRoutes)}
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
          </div>
        )}
      </div>
    </div>
  )
}
