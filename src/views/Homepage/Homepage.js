/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'
import { GET_SEARCH_KEY } from 'components/searchBar'
import Pagination from 'material-ui-flat-pagination'
import { useQuery } from '@apollo/react-hooks'
import { ACTIVITIES_QUERY } from './HomepageGQL'
import SubHeader from '../../components/SubHeader'
import ActivityList from '../../components/ActivityList'

export default function Homepage() {
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
    <Card style={{ display: 'flex', flexBasis: '800px' }}>
      <CardBody>
        <SubHeader headerName="Activity Page" />
        <ActivityList
          Data={data}
          loading={loading}
          limit={limit}
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          handleActivityEvent={handleActivityEvent}
          handleSlider={handleSlider}
        />
      </CardBody>

      <Pagination
        style={{ margin: 'auto' }}
        limit={limit}
        offset={offset}
        total={total}
        // eslint-disable-next-line
        onClick={(e, offset) => setOffset(offset)}
      />
    </Card>

  )
}
