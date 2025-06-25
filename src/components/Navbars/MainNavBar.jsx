import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Dialog from '@material-ui/core/Dialog'
import { NavLink, useHistory } from 'react-router-dom'
import Tab from '@material-ui/core/Tab'
import { Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import withWidth from '@material-ui/core/withWidth'

import { SET_SELECTED_PAGE } from 'store/ui'
import { useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Avatar from '@material-ui/core/Avatar'
import AvatarPreview from '../Avatar'
import ChatMenu from '../Chat/ChatMenu'
import NotificationMenu from '../Notifications/NotificationMenu'
import SettingsMenu from '../Settings/SettingsMenu'
import SubmitPost from '../SubmitPost/SubmitPost'
import SearchIcon from '@material-ui/icons/Search'

function MainNavBar(props) {
  const {
    classes, width,
  } = props
  const selectedPage = useSelector((state) => state.ui.selectedPage)
  const avatar = useSelector((state) => state.user.data.avatar)
  const name = useSelector((state) => state.user.data.name)
  const [open, setOpen] = React.useState(false)
  const fontSize = width === 'md' ? 'medium' : 'large'
  const dispatch = useDispatch()
  const client = useApolloClient()
  const history = useHistory()
  const loggedIn = useSelector((state) => !!state.user.data._id)
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
        justify="flex-start"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item>
          <NavLink to="/Home" onClick={handleVoxPop}>
            <img alt="Quote" src="/assets/QuoteIcon.png" className={classes.quote} />
          </NavLink>
        </Grid>
        <Grid item>
          <Tabs
            value={selectedPage === null ? 0 : selectedPage}
            onChange={handleMenu}
            indicatorColor={selectedPage === null ? 'primary' : 'secondary'}
            textColor="secondary"
          >
            {/* Home tab removed for all users */}
            <Grid item lg={4}>
              <NavLink to="/search">
                <Tab
                  icon={<SearchIcon />}
                  aria-label="Trending"
                  onClick={() => {
                    handleMenu(1)
                  }}
                  value="trending"
                />
              </NavLink>
            </Grid>
          </Tabs>
        </Grid>
        <div className={classes.grow} />
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              if (loggedIn) {
                handleMenu(2)
                setOpen(true)
              } else {
                history.push('/auth/request-access')
              }
            }}
            className={classes.rightMenuButton}
          >
            Create Quote
          </Button>
        </Grid>
        {loggedIn ? (
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item>
                <NavLink to="/Profile">
                  <Hidden mdDown>
                    <Button
                      aria-label="Profile"
                      color="inherit"
                      onClick={handleProfileClick}
                      className={classes.avatarRoundedButton}
                    >
                      <Avatar>
                        <AvatarPreview height="50" width="50" {...avatar} />
                      </Avatar>
                      <Typography variant="h6" className={classes.profileBlockName}>
                        {name}
                      </Typography>
                    </Button>
                  </Hidden>
                  <Hidden lgUp>
                    <Avatar height="35" width="35">
                      <AvatarPreview {...avatar} />
                    </Avatar>
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
        ) : (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push('/auth/request-access')}
              className={classes.rightMenuButton}
            >
              Request Invite
            </Button>
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <SubmitPost setOpen={setOpen} />
      </Dialog>
    </AppBar>
  )
}

MainNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
}

export default withWidth()(MainNavBar)
