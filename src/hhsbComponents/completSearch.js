import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'mui-pro/Grid/GridContainer.js'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Alert from './Alert.js'
import CustomizedInputBase from './searchBar.js'

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
            <img src={Calendar} style={{ height: '40px', paddingLeft: '15px' }} />
            <img src={Filter} style={{ height: '40px', paddingLeft: '15px' }} />
            <img src={Emoji} style={{ height: '40px', paddingLeft: '15px' }} />
          </div>


        </GridContainer>
      </Box>
    </GridContainer>
  )
}
