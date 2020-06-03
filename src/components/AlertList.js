/* eslint-disable react/prop-types */
import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import GridContainer from 'mui-pro/Grid/GridContainer'
import Alert from './Alert'

function AlertSkeletonLoader({ limit }) {
  const rows = Array.from(Array(limit).keys())
  return (
    <div style={{ width: '90%' }}>
      {
        rows.map(() => (
          <>
            <Skeleton variant="rect" animation="wave" height={50} />
            <br />
          </>
        ))
      }
    </div>
  )
}

function LoadAlertList({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ width: '90%' }}>
        <span>Hmmmm, we&apos;re not getting any results. Our bad - try another search.</span>
        <br></br>
      </div>
    )
  }

  return data.map((item) => (
    <div style={{ width: '90%' }}>
      <Alert
        color={item.color}
        AlertTitle={item.AlertTitle}
        AlertBody={item.AlertBody}
        time={item.time}
        points={item.points}
        creator={item.creator}
      />
      <br></br>
    </div>
  ))
}


export default function AlertList({ Data, loading, limit }) {
  return (
    <GridContainer
      direction="column"
      justify="space-between"
      alignItems="center"
    >
      {loading ? (<AlertSkeletonLoader limit={limit} />) : <LoadAlertList data={Data} />}
    </GridContainer>
  )
}
