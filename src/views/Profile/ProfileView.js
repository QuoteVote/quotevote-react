import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'

import AppBar from 'components/Navbars/ProfileHeader'
import AlertList from 'components/AlertList'
import LoadingSpinner from 'components/LoadingSpinner'
import Pagination from 'material-ui-flat-pagination'

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
  selectedEvent,
  setOffset,
  profileUser,
  activitiesData,
  loading,
  limit,
  offset,
  total,
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
      <CardBody>
        <AlertList selectedEvent={selectedEvent} Data={activitiesData} loading={loading} limit={limit} />
      </CardBody>
      <Pagination
        style={{ margin: 'auto' }}
        limit={limit}
        offset={offset}
        total={total}
        onClick={(e, offsetVal) => setOffset(offsetVal)}
      />
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
  selectedEvent: PropTypes.func.isRequired,
  profileUser: PropTypes.object.isRequired,
  activitiesData: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

export default ProfileView
