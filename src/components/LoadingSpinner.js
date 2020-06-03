import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'

export default function LoadingSpinner() {
  return (
    <Grid container justify="center" style={{ marginTop: '15%' }}>
      <CircularProgress color="secondary" size={80} />
    </Grid>
  )
}
