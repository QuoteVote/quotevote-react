import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Tabs from '@material-ui/core/Tabs'
import { NavLink } from 'react-router-dom'
import Tab from '@material-ui/core/Tab'
import SvgIcon from '@material-ui/core/SvgIcon'
import IconButton from '@material-ui/core/IconButton'
import { Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import withWidth from '@material-ui/core/withWidth'
import { ReactComponent as HomeSvg } from '../../assets/svg/Home.svg'
import { ReactComponent as TrendingSvg } from '../../assets/svg/TrendingIcon.svg'
import { ReactComponent as AddPostSvg } from '../../assets/svg/AddPost.svg'
import { ReactComponent as ChatSvg } from '../../assets/svg/Chat.svg'
import { ReactComponent as NotificationsSvg } from '../../assets/svg/Notifications.svg'
import { ReactComponent as SettingsSvg } from '../../assets/svg/Settings.svg'
import voxPopIcon from '../../assets/img/voxPopIcon.jpg'
import { SET_SELECTED_PAGE } from '../../store/actions/types'

function MainNavBar(props) {
  const {
    classes, setChatOpen, chatOpen, width,
  } = props
  const { selectedPage } = useSelector((state) => state.appReducer)
  const { avatar, name, username } = useSelector((state) => state.loginReducer.user)
  const fontSize = width === 'md' ? 'medium' : 'large'
  const dispatch = useDispatch()
  const handleMenu = (newSelectedMenu) => {
    dispatch({
      type: SET_SELECTED_PAGE,
      payload: newSelectedMenu,
    })
  }
  return (
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
            <Tabs
              value={selectedPage}
              onChange={handleMenu}
              indicatorColor="secondary"
              textColor="secondary"
            >

              <NavLink to="/hhsb/Home">
                <Tab
                  icon={(
                    <SvgIcon component={HomeSvg} fontSize={fontSize} viewBox="0 0 37 37" />
                  )}
                  aria-label="Home"
                  onClick={() => {
                    handleMenu(0)
                  }}
                  wrapped
                  value="home"
                />
              </NavLink>
              <NavLink to="/hhsb/TrendingContent">
                <Tab
                  icon={(
                    <SvgIcon
                      component={TrendingSvg}
                      fontSize={fontSize}
                      viewBox="0 0 50 50"
                    />
                  )}
                  aria-label="Trending"
                  onClick={() => {
                    handleMenu(1)
                  }}
                  value="trending"
                />
              </NavLink>
              <NavLink to="/hhsb/SubmitPost">
                <Tab
                  icon={(
                    <SvgIcon
                      component={AddPostSvg}
                      fontSize={fontSize}
                      viewBox="0 0 32 32"
                    />
                  )}
                  aria-label="Post"
                  onClick={() => {
                    handleMenu(2)
                  }}
                  value="post"
                />
              </NavLink>
            </Tabs>
          </Grid>
          <Grid>
            <Hidden only={['xs', 'sm', 'md']}>
              <div className={classes.profileRow}>
                <IconButton
                  aria-label="Profile"
                  color="inherit"
                >
                  <Avatar alt={username} src={avatar} />
                  <Typography variant="h6" className={classes.profileBlockName}>
                    {name}
                  </Typography>
                </IconButton>
              </div>
            </Hidden>
            <Hidden only={['xs', 'sm', 'lg', 'xl']}>
              <IconButton
                aria-label="Profile"
                color="inherit"
              >
                <Avatar alt={username} src={avatar} />
              </IconButton>
            </Hidden>
          </Grid>
        </Grid>

        <Hidden only={['xs', 'sm']}>
          <IconButton
            aria-label="Chat"
            color="inherit"
            className={classes.rightMenuButton}
            onClick={() => setChatOpen(!chatOpen)}
          >
            <SvgIcon
              component={ChatSvg}
              fontSize={fontSize}
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
              fontSize={fontSize}
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
              fontSize={fontSize}
              viewBox="0 0 49 46"
              className={classes.rightMenuButton}
            />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

MainNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  setChatOpen: PropTypes.func.isRequired,
  chatOpen: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
}

export default withWidth()(MainNavBar)
