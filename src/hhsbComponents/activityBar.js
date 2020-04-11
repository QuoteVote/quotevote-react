import React from 'react'
import GridContainer from "mui-pro/Grid/GridContainer.js"

const ActivityBar = () => (
             
  <GridContainer  
    direction="row"
    justify="center"
    alignItems="center"
    style={{"height":"200px","backgroundColor":"FF7A00"}}    
  >
    <Grid item xs={6} sm={3} />
    <Grid item xs={6} >
      <h4>Activity Feed</h4>    
    </Grid>
    <Grid item xs={6} sm={3} />
  </GridContainer>        
)    
     
export default Content