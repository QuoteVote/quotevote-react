import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

//  MUI
import { fade, makeStyles, MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

//  Local
import FollowButton from 'components/CustomButtons/FollowButton'
import mainTheme from '../../themes/MainTheme'
import FilterIconButtons from '../Filter/FilterIconButtons'
import AvatarDisplay from '../Avatar'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  iconActive: {
    color: theme.subHeader.activeIcon.color,
  },
  iconNonActive: {
    color: theme.subHeader.default.color,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export default function ProfileHeader(props) {
  const classes = useStyles()
  const history = useHistory()
  const {
    loggedInUser,
    profileUser,
  } = props
  const { _id: loggedInUserId } = loggedInUser
  const {
    username,
    _id,
    _followersId,
    _followingId,
  } = profileUser

  return (
    <ThemeProvider theme={mainTheme}>
      <div className={classes.grow}>
        <Grid
          container
          alignItems="center"
          direction="row"
        >
          <Grid alignItems="center" container>
            <Grid
              alignItems="center"
              item
              container
              md={6}
            >
              <Grid item md={3}>
                <AvatarDisplay height={75} width={75} {...loggedInUser.avatar} />
              </Grid>
              <Grid
                container
                item
                md={5}
                direction="column"
              >
                <Grid item>
                  <Typography className={classes.title} variant="h6" noWrap>
                    { username }
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                >
                  <Typography onClick={() => history.push(`/hhsb/Profile/${loggedInUserId}/followers`)} className={classes.title} variant="overline" noWrap>
                    {`${_followersId ? _followersId.length : 0} Followers`}
                  </Typography>
                  <Typography onClick={() => history.push(`/hhsb/Profile/${loggedInUserId}/following`)} className={classes.title} variant="overline" noWrap>
                    {`${_followingId ? _followingId.length : 0} Following`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item md={4}>
                {
                  //  Are we viewing our own profile?
                  //  If viewing another user, do we follow them already?
                  profileUser._id === loggedInUser._id ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push(`/hhsb/Profile/${loggedInUserId}/avatar`)}
                    >
                      Change Photo
                    </Button>
                  ) : (
                    <FollowButton
                      isFollowing={_followersId ? _followersId.find((id) => loggedInUserId === id) : null}
                      profileUserId={_id}
                    />
                  )
                }
              </Grid>
            </Grid>
            <Grid
              alignItems="center"
              container
              item
              justify="flex-end"
              md={6}
            >
              <div className={classes.sectionDesktop}>
                <FilterIconButtons showFilterIconButton />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

ProfileHeader.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  profileUser: PropTypes.object.isRequired,
}
