import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "mui-pro/Grid/GridContainer.js";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FaceIcon from "@material-ui/icons/Face";
import Button from "@material-ui/core/Button";

import Message from "hhsbComponents/ChatComponents/chatMessage.js"

import ListDividers from 'hhsbComponents/ChatComponents/List.js'
import Alert from '../hhsbAssets/Alerts.png'

export default function BuddyList(props){
    const useStyles = makeStyles({
        chatContainer: {
          
          maxWidth:"300px",
          backgroundColor:'#191919',
          flexDirection:"column",
          justifyContent:"flex-start",
          alignItems:"center",
          height:"800px",
          wrap:"wrapContent"
        },
        bullet: {
          display: "inline-block",
          margin: "0 2px",
          transform: "scale(0.8)"
        },
        margin:{
          width:"95%"
        },
        header:{
          width:"100%",
          backgroundColor:"#615B5B",
          color:"white",
          alignItems:"center",
          justifyContent:"center",
          height:"8%"
        },
        headerText:{
          fontSize:"x-large",
          fontWeight:900
        }
        
      });
      const classes = useStyles();
      let Data=[{Text:"Following",Color:'gray',icon:Alert},{Text:"options2",Color:'#191919'},{Text:"option3",Color:'#191919'},{Text:"Content Posts",Color:'gray'},{Text:"option3",Color:'#191919'}]
      let Data2=["following"]
      let Data3=["content post"]
    return(
        <GridContainer className={classes.chatContainer}>
          
            <GridContainer className={classes.header} onClick={props.toggle}>
            <p className={classes.headerText}> Buddy List</p>
            
            </GridContainer>
            
            <ListDividers List={Data}/>
         </GridContainer>   
             
    )




}