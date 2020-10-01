import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from 'mui-pro/Card/Card'

import AppBar from 'components/Navbars/ProfileHeader'
import LoadingSpinner from 'components/LoadingSpinner'
import Activity from '../../components/Activity/Activity'

const useStyles = makeStyles((theme) => ({
  activityListCard: {
    [theme.breakpoints.up('lg')]: {
      padding: 100,
      paddingTop: 10,
    },
    [theme.breakpoints.down('md')]: {
      padding: 10,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}))

function ProfileView({
  handleActivityEvent,
  handleSelectAll,
  selectAll,
  loggedInUser,
  filterState,
  dispatch,
  setOffset,
  profileUser,
  loading,
}) {
  const classes = useStyles()

  if (loading) return <LoadingSpinner />

  return (
    <Card className={classes.activityListCard}>
      <AppBar
        handleActivityEvent={handleActivityEvent}
        handleSelectAll={handleSelectAll}
        selectAll={selectAll}
        loggedInUser={loggedInUser}
        filterState={filterState}
        dispatch={dispatch}
        setOffset={setOffset}
        profileUser={profileUser}
      />
      <Activity showSubHeader={false} />

    </Card>
  )
}

ProfileView.propTypes = {
  handleActivityEvent: PropTypes.func.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  filterState: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  setOffset: PropTypes.number.isRequired,
  profileUser: PropTypes.object.isRequired,
  loading: PropTypes.bool,
}

export default ProfileView
