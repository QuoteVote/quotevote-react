import React from 'react'

import GridContainer from 'mui-pro/Grid/GridContainer'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'
import Button from 'mui-pro/CustomButtons/Button'
import CustomizedInputBase from 'hhsbComponents/searchBar'
import Pagination from 'material-ui-flat-pagination'
import Slider from '@material-ui/core/Slider'
import Calendar from 'hhsbAssets/Calendar.svg'
import Filter from 'hhsbAssets/Filter.svg'
import Emoji from 'hhsbAssets/FollowingEmoji.svg'
import AlertList from 'hhsbComponents/AlertList'

export default function Profile() {
  const NotificationData =
   [{
     AlertTitle: 'Quoted', color: '#00CAE3', AlertBody: 'There’s no time like the present, so present your time as if it only one in the world”', time: 'Today @ 10pm', points: '+100W',
   }, {
     AlertTitle: 'Upvoted', color: '#55B559', AlertBody: '', time: '', points: '',
   },
   {
     AlertTitle: 'Commented', color: '#FF9E0F', AlertBody: '', time: '', points: '',
   }, {
     AlertTitle: 'Downvoted', color: '#FF1100', AlertBody: '', time: '', points: '',
   },
   {
     AlertTitle: 'Submitted', color: '#000000', AlertBody: '', time: '', points: '',
   }, {
     AlertTitle: 'Heared', color: '#E91E63', AlertBody: '', time: '', points: '',
   }]

  // const handleClick = (x) => {
  //   // console.log(x)
  // }

  return (
    <Card style={{ display: 'flex', flexBasis: '800px' }}>
      <CardBody>
        <GridContainer
          direction="row"
          justify="center"
          alignItems="center"
        >
          <GridContainer justify="center" wrap="nowrap" direction="column" style={{ width: '50%' }}>
            <GridContainer justify="center" wrap="nowrap" direction="row">
              <p
                style={{
                  fontSize: '20px', color: 'gray', font: 'League Spartan', fontWeight: '900', textDecoration: 'underline', textShadow: '1px 1px gray',
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
              backgroundColor: '#424556', boxShadow: '0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', width: '75%', wrap: 'nowrap',
            }}
          >
            <GridContainer justify="center" wrap="nowrap" direction="row" style={{ width: '25%' }}>
              <h3
                style={{
                  color: 'white', font: 'League Spartan', fontWeight: 'bold', paddingLeft: '20px', paddingBottom: '5px', marginRight: '10px',
                }}
              >
                Jane Doe
              </h3>
              <Button style={{ backgroundColor: '#9C27B0' }}>Follow</Button>
            </GridContainer>
            <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <CustomizedInputBase></CustomizedInputBase>
              <img alt="Calendar Icon" src={Calendar} style={{ display: 'flex', maxHeight: '40px', paddingLeft: '15px' }} />
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
        <AlertList Data={NotificationData} />
      </CardBody>
      <Pagination
        limit={10}
        offset={0}
        total={100}
        // onClick={(e, offset) => this.handleClick(offset)}
      />
    </Card>
  )
}
