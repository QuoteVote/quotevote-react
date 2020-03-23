import React from 'react'

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Accordion from "components/Accordion/Accordion.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js"
import { getThemeProps } from '@material-ui/styles';
import Badge from "components/Badge/Badge.js";
 
 const ActivityBar=()=> {
        
      return(
       
         <GridContainer  
         direction="row"
         justify="center"
         alignItems="center"
         style={{"height":"200px","backgroundColor":"FF7A00"}}    
        >
          <Grid item xs={6} sm={3}>
             
          </Grid>
          <Grid item xs={6} >
           <h4>Activity Feed</h4>    
          </Grid>
          <Grid item xs={6} sm={3}>
              
          </Grid>

        </GridContainer>
  
      )
  }    
     

}    
export default Content