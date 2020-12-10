import React from 'react'
import Grid from '@material-ui/core/Grid'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import PropTypes from 'prop-types'
import DateSearchBar from '../DateSearchBar'

export default function FilterInputs({
  filterState,
  selectAll,
  setOffset,
  handleSelectAll,
  handleActivityEvent,
  showFilterIconButton,
  setDateRangeFilter,
  dateRangeFilter,
}) {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      {showFilterIconButton && filterState.filter.visibility ? (
        <Grid item xs={12}>
          <ToggleButtonGroup
            value={selectAll}
            onChange={handleSelectAll}
            aria-label="All Event"
          >
            <ToggleButton value="ALL" aria-label="All" size="small">
              All
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={filterState.filter.value}
            onChange={handleActivityEvent}
            aria-label="Event"
          >
            <ToggleButton value="POSTED" aria-label="POSTED" size="small">
              Content
            </ToggleButton>
            <ToggleButton value="VOTED" aria-label="VOTED" size="small">
              Votes
            </ToggleButton>
            <ToggleButton value="COMMENTED" aria-label="COMMENTED" size="small">
              Comments
            </ToggleButton>
            <ToggleButton value="QUOTED" aria-label="QUOTED" size="small">
              Quotes
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      ) : null}
      {filterState.date.visibility ? (
        <Grid item xs={12}>
          <DateSearchBar
            setOffset={setOffset}
            setDateRangeFilter={setDateRangeFilter}
            dateRangeFilter={dateRangeFilter}
          />
        </Grid>
      ) : null}
    </Grid>
  )
}

FilterInputs.propTypes = {
  filterState: PropTypes.object,
  selectAll: PropTypes.bool,
  setOffset: PropTypes.func,
  handleSelectAll: PropTypes.func,
  handleActivityEvent: PropTypes.func,
  setDateRangeFilter: PropTypes.func,
  showFilterIconButton: PropTypes.bool,
  dateRangeFilter: PropTypes.object,
}
