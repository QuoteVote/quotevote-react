/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import GridContainer from 'mui-pro/Grid/GridContainer'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'
import CustomizedInputBase, { GET_SEARCH_KEY } from 'components/searchBar'
import Pagination from 'material-ui-flat-pagination'
import Slider from '@material-ui/core/Slider'
import Calendar from 'assets/img/Calendar.svg'
import Filter from 'assets/img/Filter.svg'
import Emoji from 'assets/img/FollowingEmoji.svg'
import AlertList from 'components/AlertList'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import { ACTIVITIES_QUERY } from './HomepageGQL'

const useStyles = makeStyles({
  headerToggle: {
    fontSize: '20px',
    color: 'gray',
    font: 'League Spartan',
    fontWeight: '900',
    textDecoration: 'underline',
    textShadow: '1px 1px gray',
  },
})

const ACTIVITY_COLORS = {
  QOUTED: '#00CAE3',
  UP: '#55B559',
  DOWN: '#FF1100',
  COMMENTED: '#FF9E0F',
  HEARTED: '#E91E63',
  POSTED: '#020202',
}


function formatContentDate(sDate) {
  const a = moment.utc()
  const b = moment.utc(sDate)
  const dateDiff = a.diff(b, 'days')
  if (dateDiff <= 1) {
    return moment(sDate)
      .calendar()
      .toString()
      .replace('at', '@')
  }

  return moment(sDate).format('MMM Do')
}

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

  const { activities } = (!loading && data && data.activities) || { activities: { activities: [], total: 0 } }
  React.useEffect(() => {
    if (data) {
      setTotal(data.activities.total)
    }
  }, [data])

  const activitiesData = !loading && activities && activities.length && activities.map((activity) => {
    const time = activity && formatContentDate(activity.data.created)
    switch (activity.event) {
      case 'VOTED':
        return {
          id: activity.data._id,
          AlertTitle: `${activity.data.type.toUpperCase()}VOTED`,
          color: ACTIVITY_COLORS[`${activity.data.type.toUpperCase()}`],
          AlertBody: activity.data.content.title,
          time,
          points: activity.data.type === 'up' ? `+${activity.data.points}` : `-${activity.data.points}`,
          creator: activity.data.creator,
        }
      case 'POSTED':
        return {
          id: activity.data._id,
          AlertTitle: 'CONTENT',
          color: ACTIVITY_COLORS.POSTED,
          AlertBody: activity.data.title,
          time,
          points: '',
          creator: activity.data.creator,
        }
      case 'QUOTED':
        return {
          id: activity.data._id,
          AlertTitle: activity.event,
          color: ACTIVITY_COLORS.QOUTED,
          AlertBody: `"${activity.data.quote}"`,
          time,
          points: '',
          creator: activity.data.creator,
        }
      case 'COMMENTED':
        return {
          id: activity.data._id,
          AlertTitle: activity.event,
          color: ACTIVITY_COLORS.COMMENTED,
          AlertBody: `"${activity.data.content}"`,
          time,
          points: '',
          creator: activity.data.creator,
        }
      case 'HEARTED':
        return {
          id: activity.data._id,
          AlertTitle: activity.event,
          color: ACTIVITY_COLORS.HEARTED,
          AlertBody: activity.data.content.title,
          time,
          points: '',
          creator: activity.data.creator,
        }
      default:
        break
    }
    return null
  })

  return (
    <Card style={{ display: 'flex', flexBasis: '800px' }}>
      <CardBody>
        <GridContainer
          direction="row"
          justify="center"
          alignItems="center"

        >
          <GridContainer alignItems="center" direction="row" style={{ width: '50%' }}>
            <GridContainer justify="center" wrap="nowrap" direction="row">
              <p>
                <ToggleButtonGroup value={selectAll} onChange={handleSelectAll} aria-label="All Event">
                  <ToggleButton
                    value="ALL"
                    aria-label="All"
                    className={classes.headerToggle}
                  >
                    All
                  </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup value={selectedEvent} onChange={handleActivityEvent} aria-label="Event">
                  <ToggleButton
                    value="POSTED"
                    aria-label="Content"
                    className={classes.headerToggle}
                  >
                    Content
                  </ToggleButton>
                  <ToggleButton
                    value="VOTED"
                    aria-label="phone"
                    className={classes.headerToggle}
                  >
                    Votes
                  </ToggleButton>
                  <ToggleButton
                    value="COMMENTED"
                    aria-label="phone"
                    className={classes.headerToggle}
                  >
                    Comments
                  </ToggleButton>
                  <ToggleButton
                    value="QUOTED"
                    aria-label="phone"
                    className={classes.headerToggle}
                  >
                    Quotes
                  </ToggleButton>
                </ToggleButtonGroup>
              </p>

            </GridContainer>
            <Slider
              defaultValue={limit}
              value={offset}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              max={total}
              min={1}
              onChange={handleSlider}
            />

          </GridContainer>
          <br></br>
          <br></br>

          <GridContainer
            alignItems="center"
            direction="row"
            justify="space-between"
            style={{
              backgroundColor: '#FF7A00',
              boxShadow: '0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              width: '75%',
              wrap: 'nowrap',
            }}
          >
            <h3
              style={{
                color: 'white',
                font: 'League Spartan',
                fontWeight: 'bold',
                paddingLeft: '20px',
                paddingBottom: '5px',
              }}
            >
              Activity Feed
            </h3>

            <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <CustomizedInputBase setOffset={setOffset} />
              <img
                alt="Calendar Icon"
                src={Calendar}
                style={{ display: 'flex', maxHeight: '40px', paddingLeft: '15px' }}
              />
              <img alt="Filter Icon" src={Filter} style={{ display: 'flex', maxHeight: '40px', paddingLeft: '15px' }} />
              <img
                alt="Emoji Icon"
                src={Emoji}
                style={{
                  display: 'flex', maxHeight: '40px', paddingLeft: '15px', paddingRight: '15px',
                }}
              />
            </div>

          </GridContainer>

        </GridContainer>
        <br></br>
        <br></br>
        <AlertList Data={activitiesData} loading={loading} limit={limit} />
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
