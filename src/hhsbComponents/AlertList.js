import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import Alert from "./Alert.js"
import GridContainer from "mui-pro/Grid/GridContainer.js"
import GridItem from "mui-pro/Grid/GridItem.js"

export default function AlertList(props){

  let Alerts=props.Data
  return(
    
    <GridContainer
      direction="column"
      justify="space-between"
      alignItems="center">
        
      {Alerts.map((item,key)=>
        // console.log(item.AlertTitle)
        (
          <div style={{width:"90%"}}>
            <Alert
              color={item.color} AlertTitle={item.AlertTitle}
              AlertBody={item.AlertBody}
              time={item.time}
              points={item.points}/>
            <br></br>
          
          </div>
        )
      )}
    </GridContainer>  


  )




}