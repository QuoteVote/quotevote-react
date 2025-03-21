'use client'

import PropTypes from 'prop-types'
import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid'
import Alert from './Alert'

function AlertSkeletonLoader({ limit }) {
  const rows = Array.from(Array(limit).keys())
  return (
    <div style={{ width: '90%' }}>
      {rows.map((_, index) => (
        <div key={index}>
          <Skeleton variant="rectangular" animation="wave" height={50} />
          <br />
        </div>
      ))}
    </div>
  )
}

AlertSkeletonLoader.propTypes = {
  limit: PropTypes.number.isRequired,
}

function LoadAlertList({ data, selectedEvent }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ width: '90%' }}>
        <span>{`There are no results found for ${selectedEvent[0]}`}</span>
        <br />
      </div>
    )
  }

  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} key={item.AlertTitle}>
          <Alert
            color={item.color}
            AlertTitle={item.AlertTitle}
            AlertBody={item.AlertBody}
            time={item.time}
            points={item.points}
            creator={item.creator}
          />
        </Grid>
      ))}
    </Grid>
  )
}

LoadAlertList.propTypes = {
  data: PropTypes.array.isRequired,
  selectedEvent: PropTypes.array,
}

export default function AlertList({
  Data, loading, limit, selectedEvent,
}) {
  if (loading) return <AlertSkeletonLoader limit={limit} />
  return <LoadAlertList selectedEvent={selectedEvent} data={Data} />
}

AlertList.propTypes = {
  Data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  limit: PropTypes.number.isRequired,
  selectedEvent: PropTypes.array,
} 