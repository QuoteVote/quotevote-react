import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { Grid, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SubHeader from 'components/SubHeader'
import FilterInputs from 'components/Filter/FilterInputs'
import { GET_SEARCH_KEY } from 'components/SearchBar'
import LatestQuotesStream from '../../components/Quote/LatestQuotesStream'
import ErrorBoundary from '../../components/ErrorBoundary'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  list: {
    marginRight: 10,
    maxWidth: '70%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      marginRight: 2,
      marginLeft: 2,
    },
  },
}))

export default function SearchView() {
  const classes = useStyles()
  const filterState = useSelector((state) => state.filter)
  const [offset, setOffset] = useState(0)
  const [dateRangeFilter, setDateRangeFilter] = useState({ startDate: '', endDate: '' })
  const [paused, setPaused] = useState(false)

  useQuery(GET_SEARCH_KEY)

  const handleToggle = () => {
    setPaused((prev) => !prev)
  }

  return (
    <ErrorBoundary>
      <Grid container direction="row" justify="center" alignItems="center" className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <SubHeader headerName="Search" setOffset={setOffset} showFilterIconButton={false} />
        </Grid>
        {filterState.filter.visibility || filterState.date.visibility || filterState.search.visibility ? (
          <Grid item xs={12}>
            <FilterInputs
              filterState={filterState}
              setOffset={setOffset}
              selectAll={null}
              handleSelectAll={() => {}}
              handleActivityEvent={() => {}}
              selectedEvent={null}
              setDateRangeFilter={setDateRangeFilter}
              dateRangeFilter={dateRangeFilter}
              showFilterIconButton={false}
            />
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <IconButton onClick={handleToggle} aria-label="toggle-stream">
            {paused ? <PlayArrowIcon /> : <PauseIcon />}
          </IconButton>
        </Grid>
        <Grid item xs={12} className={classes.list}>
          <LatestQuotesStream paused={paused} />
        </Grid>
      </Grid>
    </ErrorBoundary>
  )
}
