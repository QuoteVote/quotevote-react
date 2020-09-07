import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Avatar from 'avataaars'

//  MUI
import { fade, makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import {
  Search as SearchIcon,
  Filter as FilterIcon,
  Calendar as CalendarIcon,
} from 'components/Icons'

//  MUI-pro
import GridContainer from 'mui-pro/Grid/GridContainer'
import CustomizedInputBase from 'components/searchBar'
import DateSearchBar from 'components/DateSearchBar'

import FollowButton from 'components/FollowButton'

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

const AvatarDisplay = () => (
  <Avatar
    style={{ width: '75px', height: '75px' }}
    avatarStyle="Circle"
    topType="LongHairMiaWallace"
    accessoriesType="Kurt"
    hairColor="Platinum"
    facialHairType="BeardLight"
    facialHairColor="BrownDark"
    clotheType="CollarSweater"
    clotheColor="Gray01"
    eyeType="Default"
    eyebrowType="SadConcernedNatural"
    mouthType="Vomit"
    skinColor="DarkBrown"
  />
)

export default function ProfileHeader(props) {
  const classes = useStyles()
  const history = useHistory()
  const {
    loggedInUser,
    handleSelectAll,
    handleActivityEvent,
    selectAll,
    filterState,
    dispatch,
    setOffset,
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
              <AvatarDisplay />
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
              <Grid item>
                <Typography className={classes.title} variant="overline" noWrap>
                  {`${_followersId ? _followersId.length : 0} Followers ${_followingId ? _followingId.length : 0} Following`}
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
                    color="secondary"
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
              <IconButton
                onClick={() => dispatch({ type: 'FILTER_VISIBILITY', payload: !filterState.filter.visibility })}
                aria-label="Filter list icons"
                color="inherit"
                className={filterState.filter.visibility ? classes.iconActive : classes.iconNonActive}
              >
                <FilterIcon
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                />
              </IconButton>
              <IconButton
                onClick={() => dispatch({ type: 'DATE_VISIBILITY', payload: !filterState.date.visibility })}
                aria-label="date range icons"
                color="inherit"
                className={filterState.date.visibility ? classes.iconActive : classes.iconNonActive}
              >
                <CalendarIcon
                  width="37"
                  height="36"
                  viewBox="0 0 37 36"
                />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                onClick={() => dispatch({ type: 'SEARCH_VISIBILITY', payload: !filterState.search.visibility })}
                className={filterState.search.visibility ? classes.iconActive : classes.iconNonActive}
              >
                <SearchIcon
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        {
          filterState.filter.visibility || filterState.date.visibility || filterState.search.visibility ? (
            <Grid item container>
              <GridContainer
                direction="row"
                justify="center"
                alignItems="center"
              >
                <GridContainer alignItems="center" direction="row">
                  <Grid item container md={5} justify="center" wrap="nowrap" direction="row">
                    {
                      filterState.filter.visibility ? (
                        <>
                          <ToggleButtonGroup value={selectAll} onChange={handleSelectAll} aria-label="All Event">
                            <ToggleButton
                              value="ALL"
                              aria-label="All"
                              className={classes.headerToggle}
                            >
                              All
                            </ToggleButton>
                          </ToggleButtonGroup>
                          <ToggleButtonGroup value={filterState.filter.value} onChange={handleActivityEvent} aria-label="Event">
                            <ToggleButton
                              value="POSTED"
                              aria-label="POSTED"
                              className={classes.headerToggle}
                            >
                              Content
                            </ToggleButton>
                            <ToggleButton
                              value="VOTED"
                              aria-label="VOTED"
                              className={classes.headerToggle}
                            >
                              Votes
                            </ToggleButton>
                            <ToggleButton
                              value="COMMENTED"
                              aria-label="COMMENTED"
                              className={classes.headerToggle}
                            >
                              Comments
                            </ToggleButton>
                            <ToggleButton
                              value="QUOTED"
                              aria-label="QUOTED"
                              className={classes.headerToggle}
                            >
                              Quotes
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </>
                      ) : null
                    }
                  </Grid>
                  <Grid item md={4}>
                    {
                      filterState.date.visibility ? (
                        <DateSearchBar setOffset={setOffset} />
                      ) : null
                    }
                  </Grid>
                  <Grid item md={3}>
                    {
                      filterState.search.visibility ? (
                        <CustomizedInputBase setOffset={setOffset} />
                      ) : null
                    }
                  </Grid>
                </GridContainer>
              </GridContainer>
            </Grid>
          ) : null
        }
      </Grid>
    </div>
  )
}

ProfileHeader.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  profileUser: PropTypes.object.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  handleActivityEvent: PropTypes.func.isRequired,
  selectAll: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  filterState: {
    filter: PropTypes.object.isRequired,
    date: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
  },
  setOffset: PropTypes.number.isRequired,
}
