import React, { useState } from 'react'
import GridContainer from 'mui-pro/Grid/GridContainer'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'
import CustomizedInputBase, { GET_SEARCH_KEY } from 'hhsbComponents/searchBar'
import Pagination from 'material-ui-flat-pagination'
import Slider from '@material-ui/core/Slider'
import Calendar from 'hhsbAssets/Calendar.svg'
import Filter from 'hhsbAssets/Filter.svg'
import Emoji from 'hhsbAssets/FollowingEmoji.svg'
import AlertList from 'hhsbComponents/AlertList'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

const ACTIVITY_COLORS = {
  QOUTED: '#00CAE3',
  UPVOTED: '#55B559',
  DOWNVOTED: '#FF1100',
  COMMENTED: '#FF9E0F',
  HEARTED: '#E91E63',
  POSTED: '#020202',
}

const ACTIVITIES_QUERY = gql`
  query activities($limit: Int!, $offset: Int!, $searchKey: String!) {
    activities(limit: $limit, offset: $offset, searchKey: $searchKey)
  }
`

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

export default function HomePage() {
  const limit = 5
  const [offset, setOffset] = useState(1)
  const [total, setTotal] = useState(0)
  const { data: { searchKey } } = useQuery(GET_SEARCH_KEY)
  const { loading, data } = useQuery(ACTIVITIES_QUERY, {
    variables: { limit, offset, searchKey },
  })

  const { activities } = (!loading && data.activities) || { activities: { activities: [], total: 0 } }
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
          AlertTitle: `${activity.data.type.toUpperCase()}D`,
          color: ACTIVITY_COLORS[`${activity.data.type.toUpperCase()}D`],
          AlertBody: activity.data.content.title,
          time,
          points: activity.data.type === 'upvote' ? `+${activity.data.points}` : `-${activity.data.points}`,
        }
      case 'POSTED':
        return {
          id: activity.data._id,
          AlertTitle: 'SUBMITTED',
          color: ACTIVITY_COLORS.POSTED,
          AlertBody: activity.data.title,
          time,
          points: '',
        }
      case 'QUOTED':
        return {
          id: activity.data._id,
          AlertTitle: activity.event,
          color: ACTIVITY_COLORS.QOUTED,
          AlertBody: activity.data.quote,
          time,
          points: '',
        }
      case 'COMMENTED':
        return {
          id: activity.data._id,
          AlertTitle: activity.event,
          color: ACTIVITY_COLORS.COMMENTED,
          AlertBody: activity.data.text,
          time,
          points: '',
        }
      case 'HEARTED':
        return {
          id: activity.data._id,
          AlertTitle: activity.event,
          color: ACTIVITY_COLORS.HEARTED,
          AlertBody: activity.data.content.title,
          time,
          points: '',
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
              <p
                style={{
                  fontSize: '20px',
                  color: 'gray',
                  font: 'League Spartan',
                  fontWeight: '900',
                  textDecoration: 'underline',
                  textShadow: '1px 1px gray',
                }}
              >
                All | Content | Votes | Comments | Quotes
              </p>
            </GridContainer>
            <Slider
              value={30}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
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
              <img src={Calendar} style={{ display: 'flex', maxHeight: '40px', paddingLeft: '15px' }} />
              <img src={Filter} style={{ display: 'flex', maxHeight: '40px', paddingLeft: '15px' }} />
              <img
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
        onClick={(e, offset) => setOffset(offset)}
      />
    </Card>


  )
}
