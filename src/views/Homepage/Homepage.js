/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { GET_SEARCH_KEY } from 'components/searchBar'
import Pagination from 'material-ui-flat-pagination'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { ACTIVITIES_QUERY } from './HomepageGQL'
import SubHeader from '../../components/SubHeader'
import ActivityList from '../../components/Activity/ActivityList'
import GridContainer from '../../mui-pro/Grid/GridContainer'
import GridItem from '../../mui-pro/Grid/GridItem'

const useStyles = makeStyles(({
  root: {
    display: 'flex',
    flexBasis: '100%',
    flexGrow: 1,
    overflow: 'hidden',
  },
}))

export default function Homepage() {
  const classes = useStyles()
  const limit = 5
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

  const { data: { searchKey } } = useQuery(GET_SEARCH_KEY)
  const { loading, data } = useQuery(ACTIVITIES_QUERY, {
    variables: {
      limit, offset, searchKey, activityEvent: selectedEvent,
    },
  })

  React.useEffect(() => {
    if (data) {
      setTotal(data.activities.total)
    }
  }, [data])

  return (
    <GridContainer className={classes.root}>
      <GridItem xs={12}>
        <SubHeader headerName="Activity Page" />
      </GridItem>
      <GridItem xs={12}>
        <ActivityList
          Data={data}
          loading={loading}
          limit={limit}
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          handleActivityEvent={handleActivityEvent}
          handleSlider={handleSlider}
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
