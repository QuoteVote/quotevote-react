import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';
import GridItem from "mui-pro/Grid/GridItem.js";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: props => props.color,
    minHeight: "75px",
    display:"flex"
  }
});

export default function Alert(props) {
  const classes = useStyles(props);

  return (
    <Box boxShadow={3} className={classes.root}>
      <Grid container direction="row" justify="space-between" alignContent="flex-end" spacing={1}>
        <div
          style={{
            width: "15%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignContent:"center"
          }}
        >
          <p
            style={{
              color: "white",
              font: "League Spartan",
              fontWeight: "bold",
              paddingLeft: "15px",
              paddingTop:"10px",
              fontSize: "10px"
            }}
          >
            {props.time}
          </p>
          <p
            style={{
              color: "white",
              font: "League Spartan",
              fontWeight: "bold",
              paddingLeft: "10px",
              margin: "0px",
              fontSize: "20px"
            }}
          >
            {props.points}
          </p>
        </div>
        <div
          style={{
            width: "75%",
            height: "100%",
            alignItems: "center",
            display: "flex"
          }}
        >
          <Grid
            container
            direction="row"
            justify="center"
            alignContent="center"
          >
            <p
              style={{
                color: "white",
                font: "League Spartan",
                fontWeight: "bold",
                paddingLeft: "10px",
                paddingBottom: "5px",
                paddingTop:"25px"
              }}
            >
              {props.AlertTitle}
            </p>
            <p
              style={{
                color: "white",
                font: "League Spartan",

                paddingLeft: "10px",
                paddingBottom: "5px",
                paddingTop:"25px"
              }}
            >
              {props.AlertBody}
            </p>
            
           
           
         
          </Grid>
         
        </div>
        <div style={{
         
            height: "100%",
            display: "flex",
            paddingTop:"25px",
            paddingRight:"5px",
            justifyContent: "center",
            alignContent:"center"
          }}>
         <CloseIcon style={{color:"white",height:"15px"}} />
         </div>
      </Grid>
    </Box>
  );
}
