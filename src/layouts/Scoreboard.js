import { Switch, Route, Redirect, useHistory } from "react-router-dom"
import cx from "classnames"
import React from "react"

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar"
import "perfect-scrollbar/css/perfect-scrollbar.css"

// import GridContainer from "mui-pro/Grid/GridContainer.js";
// import GridItem from "mui-pro/Grid/GridItem.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"

// core components
// import AdminNavbar from "mui-pro/Navbars/AdminNavbar.js";
// import Footer from "mui-pro/Footer/Footer.js";
import Sidebar from "hhsbComponents/hhsbSidebar.js"
// import FixedPlugin from "mui-pro/FixedPlugin/FixedPlugin.js";

import hhsbRoutes from "hhsbroutes.js"

import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js"
// import ContentFeed from "../hhsbviews/topcontent.js";
import { tokenValidator } from "../actions/login"

var ps

const useStyles = makeStyles(styles)

export default function Scoreboard(props) {
  const { ...rest } = props
  const history = useHistory()
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [miniActive, setMiniActive] = React.useState(true)
  // const [image, setImage] = React.useState(require("assets/img/sidebar-2.jpg"));
  const [color, setColor] = React.useState("blue")
  const [bgColor, setBgColor] = React.useState("black")
  // const [hasImage, setHasImage] = React.useState(true);
  // const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [logo, setLogo] = React.useState(require("assets/img/logo-white.svg"))
  // styles
  const classes = useStyles()
  const mainPanelClasses =
    `${classes.mainPanel 
    } ${ 
      cx({
        [classes.mainPanelSidebarMini]: miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1,
      })}`
  // ref for main panel div
  const mainPanel = React.createRef()
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
      document.body.style.overflow = "hidden"
    }
    window.addEventListener("resize", resizeFunction)

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy()
      }
      window.removeEventListener("resize", resizeFunction)
    }
  })
  // functions for changeing the states from components
  // const handleImageClick = image => {
  //   setImage(image);
  // };
  // const handleColorClick = color => {
  //   setColor(color);
  // };
  // const handleBgColorClick = bgColor => {
  //   switch (bgColor) {
  //     case "white":
  //       setLogo(require("assets/img/logo.svg"));
  //       break;
  //     default:
  //       setLogo(require("assets/img/logo-white.svg"));
  //       break;
  //   }
  //   setBgColor(bgColor);
  // };
  // const handleFixedClick = () => {
  //   if (fixedClasses === "dropdown") {
  //     setFixedClasses("dropdown show");
  //   } else {
  //     setFixedClasses("dropdown");
  //   }
  // };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const getRoute = () => window.location.pathname !== "/admin/full-screen-maps"
  // const getActiveRoute = routes => {
  //   let activeRoute = "Default Brand Text";
  //    for (let i = 0; i < routes.length; i++) {
  //     if (routes[i].collapse) {
  //       let collapseActiveRoute = getActiveRoute(routes[i].views);
  //       if (collapseActiveRoute !== activeRoute) {
  //         return collapseActiveRoute;
  //       }
  //     } else {
  //       if (
  //         window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
  //       ) {
  //         console.log(routes[i].name)
  //         return routes[i].name;
  //       }
  //     }
  //   }
  //   return activeRoute;
  // };
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
    } else {
      return null
    }
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
    let currLocation = pathname.split("/")
    return currLocation[currLocation.length - 1]
  }
  return (
    <div className={classes.wrapper}>
      {!tokenValidator() && history.push("/unauth")}
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