import React from 'react'
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'

const ActivityBar = () => (

  <GridContainer
    direction="row"
    justify="center"
    alignItems="center"
    style={{ height: '200px', backgroundColor: 'FF7A00' }}
  >
    <GridItem xs={6} sm={3} />
    <GridItem xs={6}>
      <h4>Activity Feed</h4>
    </GridItem>
    <GridItem xs={6} sm={3} />
  </GridContainer>
)

export default ActivityBar
