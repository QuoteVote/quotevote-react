import React, { useState } from 'react'
import { GET_SEARCH_KEY } from 'components/searchBar'
import Pagination from 'material-ui-flat-pagination'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import SubHeader from '../SubHeader'
import ActivityList from './ActivityList'
import GridContainer from '../../mui-pro/Grid/GridContainer'
import GridItem from '../../mui-pro/Grid/GridItem'
import { GET_USER_ACTIVITY } from '../../graphql/query'

const useStyles = makeStyles(({
  root: {
    display: 'flex',
    flexBasis: '100%',
    flexGrow: 1,
    overflow: 'hidden',
  },
}))

export default function Activity({ showHeader = true }) {
  const classes = useStyles()
  const limit = 15
  const [offset, setOffset] = useState(1)
  const conditions = ['POSTED', 'VOTED', 'COMMENTED', 'QUOTED']
  const [selectedEvent, setSelectedEvent] = useState(conditions)
  const [selectAll, setSelectAll] = useState('ALL')
  const handleSelectAll = (event, newSelectAll) => {
    if (newSelectAll.length) {
      setSelectedEvent(conditions)
    }
    setSelectAll(newSelectAll)
  }
  const handleActivityEvent = (event, newActivityEvent) => {
    if (!newActivityEvent.length) {
      setSelectAll(['ALL'])
      setSelectedEvent(conditions)
    } else {
      const isAllToggled = newActivityEvent.length === 4
      setSelectAll(isAllToggled ? ['ALL'] : [])
      setSelectedEvent(newActivityEvent)
    }
  }
  const [total, setTotal] = useState(1)

  const handleSlider = (event, newValue) => {
    setOffset(newValue)
  }

  const user = useSelector((state) => state.user.data)
  const { data: { searchKey } } = useQuery(GET_SEARCH_KEY)
  const variables = {
    limit,
    offset,
    searchKey,
    activityEvent: selectedEvent,
    user_id: user._id,
  }
  const { loading, data, fetchMore } = useQuery(GET_USER_ACTIVITY, {
    variables,
  })

  React.useEffect(() => {
    if (data) {
      setTotal(data.activities.total)
    }
  }, [data])

  return (
    <GridContainer className={classes.root}>
      {showHeader && (
        <GridItem xs={12}>
          <SubHeader headerName="Activity Feed" />
        </GridItem>
      )}

      <GridItem xs={12}>
        <ActivityList
          data={data}
          loading={loading}
          limit={limit}
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          handleActivityEvent={handleActivityEvent}
          handleSlider={handleSlider}
          fetchMore={fetchMore}
          variables={variables}
        />
      </GridItem>
      <GridItem xs={12}>
        {!data && !loading && (
          <Pagination
            style={{ margin: 'auto' }}
            limit={limit}
            offset={offset}
            total={total}
            // eslint-disable-next-line
            onClick={(e, offset) => setOffset(offset)}
          />
        )}
      </GridItem>
    </GridContainer>
  )
}

Activity.propTypes = {
  showHeader: PropTypes.bool.isRequired,
}
