import React, { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { GET_SEARCH_KEY } from 'components/SearchBar'
import PostsList from 'components/PostsList'

import { GET_TOP_POSTS } from 'graphql/query'
import SubHeader from 'components/SubHeader'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../mui-pro/Grid/GridContainer'
import GridItem from '../mui-pro/Grid/GridItem'
import FilterInputs from '../components/Filter/FilterInputs'
import ErrorBoundary from '../components/ErrorBoundary'

const useStyles = makeStyles(({
  root: {
    display: 'flex',
    flexBasis: '100%',
    flexGrow: 1,
    overflow: 'hidden',
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
      <GridContainer className={classes.root}>
        <GridItem xs={12}>
          <SubHeader
            headerName="Trending"
            setOffset={setOffset}
            showFilterIconButton={false}
          />
        </GridItem>

        {
          filterState.filter.visibility || filterState.date.visibility || filterState.search.visibility ? (
            <GridItem xs={12}>
              <FilterInputs
                classes={classes}
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
            </GridItem>
          ) : null
        }

        <GridItem xs={12}>
          <PostsList
            data={data}
            loading={loading}
            limit={limit}
            fetchMore={fetchMore}
            variables={variables}
          />
        </GridItem>
      </GridContainer>
    </ErrorBoundary>
  )
}
