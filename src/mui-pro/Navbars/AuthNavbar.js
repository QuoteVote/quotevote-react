import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton';

// @material-ui/icons
import Menu from '@material-ui/icons/Menu'

// core components
import Button from 'mui-pro/CustomButtons/Button'

import styles from 'assets/jss/material-dashboard-pro-react/components/authNavbarStyle'
import voxPopIcon from "../../assets/img/VoxPopLogo.svg";

const useStyles = makeStyles(styles)

export default function AuthNavbar(props) {
    const [open, setOpen] = React.useState(false)
    const [openLogin, setOpenLogin] = React.useState(false)
    const handleDrawerToggle = () => {
        setOpen(!open)
    }
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => window.location.href.indexOf(routeName) > -1
    console.log('activeRoute: ', activeRoute('/auth/request-access'));
    const classes = useStyles()
    const {color, brandText} = props
    console.log('AuthNavbarprops: ', props, openLogin, brandText);
    const appBarClasses = cx({
        [` ${classes[color]}`]: color,
    })

    const list = (
        <List className={classes.list}>
            {activeRoute('/auth/request-access') && (
                <ListItem className={classes.listItem}>
                    <NavLink
                        to="/auth/landing-page"
                        className={cx(classes.navLink, {
                            [classes.navLinkActive]: activeRoute('/auth/login-page'),
                        })}
                    >
                        <ListItemText
                            primary="Go Back"
                            disableTypography
                            className={classes.listItemText}
                        />
                    </NavLink>
                </ListItem>
            )}
            {activeRoute('/auth/login-page') && (
                <React.Fragment>
                    <ListItem className={classes.listItem}>
                        <NavLink
                            to="/auth/request-access"
                            className={cx(classes.navLinkAccess, {
                                [classes.navLinkActiveAccess]: activeRoute('/auth/login-page'),
                            })}
                        >
                            <ListItemText
                                primary="Get Access"
                                disableTypography
                                className={classes.listItemTextAccess}
                            />
                        </NavLink>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={() => setOpenLogin(true)}>
                        <NavLink
                            to="/auth/login-page"
                            className={cx(classes.navLink, {
                                [classes.navLinkActive]: activeRoute('/auth/login-page'),
                            })}
                        >
                            <ListItemText
                                primary="Login"
                                disableTypography
                                className={classes.listItemText}
                            />
                        </NavLink>
                    </ListItem>
                </React.Fragment>
            )}

            {activeRoute('/auth/landing-page') && (
                <React.Fragment>
                    <ListItem className={classes.listItem} onClick={() => setOpenLogin(true)}>
                        <NavLink
                            to="/auth/login-page"
                            className={cx(classes.navLink, {
                                [classes.navLinkActive]: activeRoute('/auth/login-page'),
                            })}
                        >
                            <ListItemText
                                primary="Login"
                                disableTypography
                                className={classes.listItemText}
                            />
                        </NavLink>
                    </ListItem>
                </React.Fragment>
            )}

            {activeRoute('/auth/investor-thanks') && (
                <React.Fragment>
                    <ListItem className={classes.listItem}>
                        <NavLink
                            to="/auth/landing-page"
                            className={cx(classes.navLinkInvestNow, {
                                [classes.navLinkActiveAccess]: activeRoute('/auth/investor-thanks'),
                            })}
                        >
                            <ListItemText
                                primary="Invest Now"
                                disableTypography
                                className={classes.listItemTextAccess}
                            />
                        </NavLink>
                    </ListItem>

                    <ListItem className={classes.listItem} onClick={() => setOpenLogin(true)}>
                        <NavLink
                            to="/auth/login-page"
                            className={cx(classes.navLink, {
                                [classes.navLinkActive]: activeRoute('/auth/investor-thanks'),
                            })}
                        >
                            <ListItemText
                                primary="Login"
                                disableTypography
                                className={classes.listItemText}
                            />
                        </NavLink>
                    </ListItem>
                </React.Fragment>
            )}
        </List>
    )
    return (
        <AppBar position="static" className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <Hidden smDown>
                    <div className={classes.flex}>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <img alt="voxPOP" src={voxPopIcon} className={classes.voxPop}/>
                        </IconButton>
                    </div>
                </Hidden>
                <Hidden mdUp>
                    <div className={classes.flex}>
                        <IconButton color="primary" aria-label="upload picture" component="span" className={classes.title}>
                        <img alt="voxPOP" src={voxPopIcon} className={classes.voxPop}/>
                    </IconButton>
                    </div>
                </Hidden>
                <Hidden smDown>{list}</Hidden>
                <Hidden mdUp>
                    <Button
                        className={classes.sidebarButton}
                        color="transparent"
                        justIcon
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <Menu/>
                    </Button>
                </Hidden>
                <Hidden mdUp>
                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            anchor="right"
                            open={open}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {list}
                        </Drawer>
                    </Hidden>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
}

AuthNavbar.propTypes = {
    color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
    brandText: PropTypes.string,
}
