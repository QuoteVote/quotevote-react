import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import GridContainer from "material-ui/components/Grid/GridContainer.js"
import Paper from "@material-ui/core/Paper"
import Card from "@material-ui/core/Card"

import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import FaceIcon from "@material-ui/icons/Face"
import Button from "@material-ui/core/Button"

import Message from "./ChatComponents/chatMessage.js"
import ChatSideBar from "components/Chat/ChatSide.js"
import ListDividers from "./ChatComponents/List.js"
import Alert from "../hhsbAssets/Alerts.png"
import BuddyList from "./BuddyList.js"
import MessageContainer from "./MessageContainer.js"

export default function ChatComponent(props) {
  const [Chat, setChat] = useState(true)

  console.log(props)
  const useStyles = makeStyles({
    chatContainer: {
      width: "100%",
      maxWidth: "300px",

      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      height: "800px",
      wrap: "wrapContent",
      paddingBottom: "5px",
      zIndex: 2000,
      display: props.Display
    }
  })
  const classes = useStyles(props)
  const toggleDisplay = () => {
    console.log("setting chat")
    setChat(!Chat)
  }

  const getDisplay = () => {
    console.log(Chat)
    if (Chat === false) {
      return <MessageContainer toggle={toggleDisplay} />
      console.log("chat is true")
    } else {
      return <BuddyList toggle={toggleDisplay} />
      console.log("chat is false")
    }
  }

  return (
    <div className={classes.chatContainer}>
      <ChatSideBar />
    </div>
  )
}
