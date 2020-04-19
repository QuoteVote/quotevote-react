import React from "react"
import Alert from "./Alert.js"
import Skeleton from "@material-ui/lab/Skeleton"
import GridContainer from "mui-pro/Grid/GridContainer.js"
import GridItem from "mui-pro/Grid/GridItem.js"

function AlertSkeletonLoader({limit}) {
  const rows = Array.from(Array(limit).keys())
  return (
    <div style={{width: "90%"}}>
      {
        rows.map((row) => (
          <>
            <Skeleton variant="rect" animation="wave" height={50}/>
            <br/>
          </>
        ))
      }
    </div>
  )
}


export default function AlertList({Data, loading, limit}) {
  let Alerts = Data
  return (
    <GridContainer direction="column"
                   justify="space-between"
                   alignItems="center">
      {loading ? (<AlertSkeletonLoader limit={limit}/>) : Alerts.map((item, key) => {
        return (
          <div style={{width: "90%"}}>
            <Alert color={item.color} AlertTitle={item.AlertTitle}
                   AlertBody={item.AlertBody}
                   time={item.time}
                   points={item.points}/>
            <br></br>
          </div>
        )
      })}
    </GridContainer>


  )




}