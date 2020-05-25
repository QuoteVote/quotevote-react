import React from 'react'
import GridContainer from 'mui-pro/Grid/GridContainer'
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'

import Calendar from 'assets/img/Calendar.svg'
import Filter from 'assets/img/Filter.svg'
import Emoji from 'assets/img/FollowingEmoji.svg'

import CustomizedInputBase from './searchBar'

export default function CompleteSearch() {
  return (
    <GridContainer
      direction="row"
      justify="center"
      alignItems="center"
    >
      <GridContainer alignItems="center" direction="row" style={{ width: '50%' }}>
        <Slider
          value={30}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />

      </GridContainer>
      <br></br>
      <br></br>
      <Box boxShadow={3} style={{ display: 'flex', backgroundColor: '#2A6797', width: '75%' }}>
        <GridContainer
          alignItems="center"
          justify="space-between"
          direction="row"
        >

          <h3
            style={{
              color: 'white', font: 'League Spartan', fontWeight: 'bold', paddingLeft: '20px', paddingBottom: '5px',
            }}
          >
            Trending
          </h3>


          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <CustomizedInputBase></CustomizedInputBase>
            <img alt="Calender Icon" src={Calendar} style={{ height: '40px', paddingLeft: '15px' }} />
            <img alt="Filter icon" src={Filter} style={{ height: '40px', paddingLeft: '15px' }} />
            <img alt="Emoji icon" src={Emoji} style={{ height: '40px', paddingLeft: '15px' }} />
          </div>


        </GridContainer>
      </Box>
    </GridContainer>
  )
}
