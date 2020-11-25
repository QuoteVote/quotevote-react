import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import AppBar from 'components/Navbars/ProfileHeader'
import LoadingSpinner from 'components/LoadingSpinner'
import { Grid } from '@material-ui/core'
import Activity from '../../components/Activity/Activity'

const useStyles = makeStyles(({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
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
        <Activity showSubHeader={false} />
      </Grid>
    </Grid>
  )
}

ProfileView.propTypes = {
  handleActivityEvent: PropTypes.func.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  filterState: PropTypes.string.isRequired,
  setOffset: PropTypes.number.isRequired,
  profileUser: PropTypes.object.isRequired,
  loading: PropTypes.bool,
}

export default ProfileView
