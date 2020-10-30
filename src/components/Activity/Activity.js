import React, { useState } from 'react'
import { GET_SEARCH_KEY } from 'components/SearchBar'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import SubHeader from '../SubHeader'
import ActivityList from './ActivityList'
import { GET_USER_ACTIVITY } from '../../graphql/query'
import FilterInputs from '../Filter/FilterInputs'
import { FILTER_VALUE } from '../../store/filter'
import ErrorBoundary from '../ErrorBoundary'

const useStyles = makeStyles(({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
}))

export default function Activity({ showSubHeader = true }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const limit = 15
  const [offset, setOffset] = useState(1)
  const conditions = ['POSTED', 'VOTED', 'COMMENTED', 'QUOTED', 'LIKED']
  const [selectedEvent, setSelectedEvent] = useState(conditions)
  const [dateRangeFilter, setDateRangeFilter] = useState({ startDate: '', endDate: '' })
  const [selectAll, setSelectAll] = useState('ALL')
  const handleSelectAll = (event, newSelectAll) => {
    if (newSelectAll.length) {
      setSelectedEvent(conditions)
      dispatch(FILTER_VALUE(conditions))
    }
    setSelectAll(newSelectAll)
  }
  const handleActivityEvent = (event, newActivityEvent) => {
    if (!newActivityEvent.length) {
      setSelectAll(['ALL'])
      setSelectedEvent(conditions)
      dispatch(FILTER_VALUE(conditions))
    } else {
      const isAllToggled = newActivityEvent.length === 4
      setSelectAll(isAllToggled ? ['ALL'] : [])
      setSelectedEvent(newActivityEvent)
      dispatch(FILTER_VALUE(newActivityEvent))
    }
  }

  const user = useSelector((state) => state.user.data)
  const { data: { searchKey } } = useQuery(GET_SEARCH_KEY)
  const variables = {
    limit,
    offset,
    searchKey,
    activityEvent: selectedEvent,
    user_id: user._id,
    startDateRange: dateRangeFilter.startDate,
    endDateRange: dateRangeFilter.endDate,
  }
  const { loading, data, fetchMore } = useQuery(GET_USER_ACTIVITY, {
    variables,
  })

  const filterState = useSelector((state) => state.filter)
  return (
    <ErrorBoundary>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        className={classes.root}
      >
        {showSubHeader && (
          <Grid item xs={12}>
            <SubHeader
              headerName="Activity Feed"
              setOffset={setOffset}
              showSubHeader={showSubHeader}
            />
          </Grid>
        )}

        {
          filterState.filter.visibility || filterState.date.visibility || filterState.search.visibility ? (
            <Grid item xs={12}>
              <FilterInputs
                classes={classes}
                filterState={filterState}
                setOffset={setOffset}
                selectAll={selectAll}
                handleSelectAll={handleSelectAll}
                handleActivityEvent={handleActivityEvent}
                selectedEvent={selectedEvent}
                setDateRangeFilter={setDateRangeFilter}
                dateRangeFilter={dateRangeFilter}
                showFilterIconButton
              />
            </Grid>
          ) : null
        }

        <Grid item xs={12}>
          <ActivityList
            data={data}
            loading={loading}
            limit={limit}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            handleActivityEvent={handleActivityEvent}
            fetchMore={fetchMore}
            variables={variables}
          />
        </Grid>
      </Grid>
    </ErrorBoundary>
  )
}

Activity.propTypes = {
  showSubHeader: PropTypes.bool.isRequired,
}
