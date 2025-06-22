import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import AppBar from 'components/Navbars/ProfileHeader'
import LoadingSpinner from 'components/LoadingSpinner'
import { Grid, Link, Typography } from '@material-ui/core'
import Activity from '../../components/Activity/Activity'

const useStyles = makeStyles(({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
  },
  emptyProfile: {
    marginTop: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: '#00bcd4',
  },
}))

function ProfileView({
  handleActivityEvent,
  handleSelectAll,
  selectAll,
  filterState,
  setOffset,
  profileUser,
  loading,
}) {
  const classes = useStyles()

  if (loading) return <LoadingSpinner />

  if (Object.keys(profileUser).length === 0) {
    return (
      <Grid container>
        <Grid item xs={12} className={classes.emptyProfile}>
          <Typography variant="h6" align="center">
            Invalid user
          </Typography>
          <Link href="/home" className={classes.link}>
            Return to homepage.
          </Link>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      className={classes.root}
      spacing={4}
    >
      <Grid item xs={12} className={classes.header}>
        <AppBar
          handleActivityEvent={handleActivityEvent}
          handleSelectAll={handleSelectAll}
          selectAll={selectAll}
          filterState={filterState}
          setOffset={setOffset}
          profileUser={profileUser}
        />
      </Grid>

      <Grid item xs={12}>
        <Activity showSubHeader={false} userId={profileUser._id} />
      </Grid>
    </Grid>
  )
}

ProfileView.propTypes = {
  handleActivityEvent: PropTypes.func.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  selectAll: PropTypes.string.isRequired,
  filterState: PropTypes.object.isRequired,
  setOffset: PropTypes.func.isRequired,
  profileUser: PropTypes.object,
  loading: PropTypes.bool,
}

export default ProfileView
