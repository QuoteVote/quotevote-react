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
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { makeStyles } from '@material-ui/core/styles'

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
  UPVOTED: '#55B559',
  DOWNVOTED: '#FF1100',
  COMMENTED: '#FF9E0F',
  HEARTED: '#E91E63',
  POSTED: '#020202',
}

const ACTIVITIES_QUERY = gql`
{
  Activities {
    userId
    activityType
    postId
    content
  }
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
  const classes = useStyles()

  const { loading, data } = useQuery(ACTIVITIES_QUERY)
  console.log('got data', data)

  const { Activities } = data ? data: []
  console.log(Activities)

  
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
                <ToggleButtonGroup value={''} onChange={() => console.log('yoo')} aria-label="All Event">
                  <ToggleButton
                    value="ALL"
                    aria-label="All"
                    className={classes.headerToggle}
                  >
                    All
                  </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup value={''} onChange={() => console.log('yooo')} aria-label="Event">
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
              defaultValue={0}
              value={1}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              max={10}
              min={1}
              onChange={() => console.log('yooo')}
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
              <CustomizedInputBase setOffset={0} />
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
        <AlertList Data={Activities} loading={false} limit={10} />
      </CardBody>
      <Pagination
        style={{ margin: 'auto' }}
        limit={10}
        offset={0}
        total={10}
        onClick={() => console.log('yooo')}
      />
    </Card>


  )
}
