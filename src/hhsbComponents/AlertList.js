import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Alert from "./Alert.js"
import GridItem from "components/Grid/GridItem.js";
import moment from 'moment';

export default function AlertList(props){

let Alerts=props.Data;
 console.log(Alerts)
return(
    
    <GridContainer  direction="column"
    justify="space-between"
    alignItems="center">
        
    {Alerts.map((item,key)=>{
        return(
            <div style={{width:"90%"}}>
            <Alert color={'green'} AlertTitle={item.event}
            AlertBody={item.event}
            time={moment(item.created).format()}/>
            <br></br>
          
            </div>
             
           


        )

    })}
   

    </GridContainer>  


)




}