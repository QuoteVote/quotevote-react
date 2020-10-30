import React, { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { GET_SEARCH_KEY } from 'components/SearchBar'
import PostsList from 'components/Post/PostsList'

import { GET_TOP_POSTS } from 'graphql/query'
import SubHeader from 'components/SubHeader'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import FilterInputs from '../../components/Filter/FilterInputs'
import ErrorBoundary from '../../components/ErrorBoundary'

const useStyles = makeStyles(({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  test: {
    marginRight: 10,
  },
}))
export default function TrendingPosts() {
  const classes = useStyles()
  const hiddenPosts = useSelector((state) => state.ui.hiddenPosts) || []
  const limit = 12 + hiddenPosts.length
  const [offset, setOffset] = useState(0)
  const [dateRangeFilter, setDateRangeFilter] = useState({ startDate: '', endDate: '' })
  const { data: { searchKey } } = useQuery(GET_SEARCH_KEY)
  const variables = {
    limit,
    offset,
    searchKey,
    startDateRange: dateRangeFilter.startDate,
    endDateRange: dateRangeFilter.endDate,
  }
  const {
    loading, error, data, fetchMore,
  } = useQuery(GET_TOP_POSTS, {
    variables,
  })
  const filterState = useSelector((state) => state.filter)

  if (error) return `Something went wrong: ${error}`

  return (
    <ErrorBoundary>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={classes.root}
      >
        <Grid item xs={12}>
          <SubHeader
            headerName="Trending"
            setOffset={setOffset}
            showFilterIconButton={false}
          />
        </Grid>

        {
          filterState.filter.visibility || filterState.date.visibility || filterState.search.visibility ? (
            <Grid item xs={12}>
              <FilterInputs
                filterState={filterState}
                setOffset={setOffset}
                selectAll={null}
                handleSelectAll={() => {}}
                handleActivityEvent={() => {}}
                selectedEvent={null}
                showFilterIconButton={false}
                setDateRangeFilter={setDateRangeFilter}
                dateRangeFilter={dateRangeFilter}
              />
            </Grid>
          ) : null
        }

        <Grid item xs={12} className={classes.test}>
          <PostsList
            data={data}
            loading={loading}
            limit={limit}
            fetchMore={fetchMore}
            variables={variables}
          />
        </Grid>
      </Grid>
    </ErrorBoundary>
  )
}
