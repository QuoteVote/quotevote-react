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
import BuddyList from './BuddyList.js'
import MessageContainer from './MessageContainer.js'
export default function ChatComponent(){
    const [Chat, setChat] = React.useState(true);
    
      const toggleDisplay=()=>{
          console.log('setting chat')
        setChat(!Chat)
      }

      const getDisplay = ()=>{
          console.log(Chat)
        if(Chat===true){
            return <MessageContainer toggle={toggleDisplay}/>
            console.log('chat is true')
        }else{
             return <BuddyList toggle={toggleDisplay}/>
             console.log('chat is false')
        }
      }
      
    return(
        <GridContainer >
            
          {getDisplay() }
           
         </GridContainer>   
             
    )




}