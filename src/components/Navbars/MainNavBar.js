import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import { NavLink } from 'react-router-dom'
import Tab from '@material-ui/core/Tab'
import SvgIcon from '@material-ui/core/SvgIcon'
import IconButton from '@material-ui/core/IconButton'
import { Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import withWidth from '@material-ui/core/withWidth'

import { SET_SELECTED_PAGE } from 'store/ui'
import { useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Avatar from '@material-ui/core/Avatar'
import { ReactComponent as HomeSvg } from '../../assets/svg/Home.svg'
import { ReactComponent as TrendingSvg } from '../../assets/svg/TrendingIcon.svg'
import { ReactComponent as AddPostSvg } from '../../assets/svg/AddPost.svg'
import voxPopIcon from '../../assets/img/voxPopIcon.jpg'
import AvatarDisplay from '../Avatar'
import ChatMenu from '../Chat/ChatMenu'
import NotificationMenu from '../Notifications/NotificationMenu'
import SettingsMenu from '../Settings/SettingsMenu'

function MainNavBar(props) {
  const {
    classes, width,
  } = props
  const selectedPage = useSelector((state) => state.ui.selectedPage)
  const avatar = useSelector((state) => state.user.data.avatar)
  const name = useSelector((state) => state.user.data.name)
  const fontSize = width === 'md' ? 'medium' : 'large'
  const dispatch = useDispatch()
  const client = useApolloClient()
  const handleMenu = (newSelectedMenu) => {
    client.stop()
    dispatch(SET_SELECTED_PAGE(newSelectedMenu))
  }
  const handleProfileClick = () => {
    dispatch(SET_SELECTED_PAGE(null))
  }

  const handleVoxPop = () => {
    dispatch(SET_SELECTED_PAGE(0))
  }
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item>
          <NavLink to="/hhsb/Home" onClick={handleVoxPop}>
            <img alt="voxPOP" src={voxPopIcon} className={classes.voxPop} />
          </NavLink>
        </Grid>
        <Grid item>
          <Tabs
            value={selectedPage === null ? 0 : selectedPage}
            onChange={handleMenu}
            indicatorColor={selectedPage === null ? 'primary' : 'secondary'}
            textColor="secondary"
          >
            <Grid item lg={4}>
              <NavLink to="/hhsb/Home">
                <Tab
                  icon={(
                    <SvgIcon
                      component={HomeSvg}
                      fontSize={fontSize}
                      viewBox="0 0 37 37"
                    />
                  )}
                  aria-label="Home"
                  onClick={() => {
                    handleMenu(0)
                  }}
                  wrapped
                  value="home"
                />
              </NavLink>
            </Grid>
            <Grid item lg={4}>
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
            </Grid>
            <Grid item lg={4}>
              <NavLink
                data-testid="submit-post-button"
                id="submit-post-button"
                to="/hhsb/SubmitPost"
              >
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
            </Grid>
          </Tabs>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item>
              <NavLink to="/hhsb/Profile">
                <Hidden mdDown>
                  <Button
                    aria-label="Profile"
                    color="inherit"
                    onClick={handleProfileClick}
                    className={classes.avatarRoundedButton}
                  >
                    <Avatar>
                      <AvatarDisplay height="50" width="50" {...avatar} />
                    </Avatar>
                    <Typography variant="h6" className={classes.profileBlockName}>
                      {name}
                    </Typography>
                  </Button>
                </Hidden>
                <Hidden lgUp>
                  <IconButton size="medium">
                    <Avatar height="35" width="35" {...avatar} />
                  </IconButton>
                </Hidden>
              </NavLink>
            </Grid>
            <Grid item>
              <ChatMenu fontSize={fontSize} />
            </Grid>
            <Grid item>
              <NotificationMenu fontSize={fontSize} />
            </Grid>
            <Grid item>
              <SettingsMenu fontSize={fontSize} />
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </AppBar>
  )
}

MainNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
}

export default withWidth()(MainNavBar)
