/*eslint-disable*/
import React from "react"
import PropTypes from "prop-types"
// javascript plugin used to create scrollbars on windows
import {NavLink, withRouter} from "react-router-dom"
import cx from "classnames"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Hidden from "@material-ui/core/Hidden"
import Collapse from "@material-ui/core/Collapse"
import Grid from "@material-ui/core/Grid"
// core components

import sidebarStyle from "assets/jss/material-dashboard-pro-react/components/sidebarStyle"

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.

class SidebarWrapper extends React.Component {
  sidebarWrapper = React.createRef()

  render() {
    const {className, user, headerLinks, links} = this.props
    return (
      <Grid container direction="row">

        <div className={className}>
          {user}
          {headerLinks}
          {links}
        </div>
      </Grid>
    )
  }
}

class MenuSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openAvatar: false,
      miniActive: false,
      MessageDisplay: null,
      ...this.getCollapseStates(props.routes),
    }
  }

  mainPanel = React.createRef()
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {}
    routes.map(prop => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState,
        }
      }
      return null
    })
    return initialState
  }
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularFormsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true
      }
    }
    return false
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? "active" : ""
  }


  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    const {classes, color, rtlActive} = this.props
    return routes.map((prop, key) => {
      if (prop.path === "/post") return null
      if (prop.redirect) {
        return null
      }
      if (prop.collapse) {
        return (
          <ListItem
            key={key}
            className={cx(
              {[classes.item]: prop.icon !== undefined},
              {[classes.collapseItem]: prop.icon === undefined},
            )}
          >

            <Collapse in={this.state[prop.state]} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                {this.createLinks(prop.views)}
              </List>
            </Collapse>
          </ListItem>
        )
      }
      const innerNavLinkClasses =
        classes.collapseItemLink +
        " " +
        cx({
          [" " + classes[color]]: this.activeRoute(prop.path),
        })
      const collapseItemMini =
        classes.collapseItemMini +
        " " +
        cx({
          [classes.collapseItemMiniRTL]: rtlActive,
        })
      const navLinkClasses =
        classes.itemLink +
        " " +
        cx({
          [" " + classes[color]]: this.activeRoute(prop.path),
        })
      const itemText =
        classes.itemText +
        " " +
        cx({
          [classes.itemTextMini]:
          this.props.miniActive && this.state.miniActive,
          [classes.itemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
          [classes.itemTextRTL]: rtlActive,
        })
      const collapseItemText =
        classes.collapseItemText +
        " " +
        cx({
          [classes.collapseItemTextMini]:
          this.props.miniActive && this.state.miniActive,
          [classes.collapseItemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
          [classes.collapseItemTextRTL]: rtlActive,
        })
      const itemIcon =
        classes.itemIcon +
        " " +
        cx({
          [classes.itemIconRTL]: rtlActive,
        })
      return (
        <ListItem
          key={key}
          className={cx(
            {[classes.item]: prop.icon !== undefined},
            {[classes.collapseItem]: prop.icon === undefined},
          )}
        >
          <NavLink
            to={prop.layout + prop.path}
            className={cx(
              {[navLinkClasses]: prop.icon !== undefined},
              {[innerNavLinkClasses]: prop.icon === undefined},
            )}
          >
            {prop.icon !== undefined ? (
              typeof prop.icon === "string" ? (
                <img alt='' src={prop.icon} className={itemIcon} style={{height: "30px"}}/>
                /** <Icon className={itemIcon}>{prop.icon}</Icon>*/
              ) : (
                <prop.icon className={itemIcon}/>
              )
            ) : (
              <span className={collapseItemMini}>
                  {rtlActive ? prop.rtlMini : prop.mini}
                </span>
            )}
            <ListItemText
              primary={rtlActive ? prop.rtlName : prop.name}
              disableTypography={true}
              className={cx(
                {[itemText]: prop.icon !== undefined},
                {[collapseItemText]: prop.icon === undefined},
              )}
            />
          </NavLink>
        </ListItem>
      )
    })
  }

  render() {
    const {
      classes,
      image,
      routes,
      bgColor,
      rtlActive,
      currentRoute,
      open,
      handleDrawerToggle,
    } = this.props

    const links = (
      <List className={classes.list}>{this.createLinks(routes)}</List>
    )

    const drawerPaper =
      classes.drawerPaper +
      " " +
      cx({
        [classes.drawerPaperMini]:
        this.props.miniActive && this.state.miniActive,
        [classes.drawerPaperRTL]: rtlActive,
      })
    const sidebarWrapper =
      classes.sidebarWrapper +
      " " +
      cx({
        [classes.drawerPaperMini]:
        this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1,
      })

    return (
      <>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={rtlActive ? "left" : "right"}
            open={open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"],
            }}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Grid container direction="row">
              <SidebarWrapper
                className={sidebarWrapper}
                MiniActive={this.state.MessageDisplay}
                links={links}
                currentRoute={currentRoute}
              />
            </Grid>
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({miniActive: false, MessageDisplay: null})}
            onMouseOut={() => this.setState({miniActive: true, MessageDisplay: "none"})}
            anchor={rtlActive ? "right" : "left"}
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"],
            }}
          >

            <SidebarWrapper
              className={sidebarWrapper}
              MiniActive={this.state.MessageDisplay}
              links={links}
              currentRoute={currentRoute}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{backgroundImage: "url(" + image + ")"}}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </>
    )
  }
}

MenuSidebar.defaultProps = {
  bgColor: "blue",
}

MenuSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose",
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  miniActive: PropTypes.bool,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
}

SidebarWrapper.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  headerLinks: PropTypes.object,
  links: PropTypes.object,
}

export default withRouter(withStyles(sidebarStyle)(MenuSidebar))
