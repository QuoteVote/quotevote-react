import React from 'react'
import PropTypes from 'prop-types'
import { Grid, CircularProgress } from '@material-ui/core'

export default function LoadingSpinner({ size = 80 }) {
  return (
    <Grid container justify="center" style={{ marginTop: '15%' }}>
      <CircularProgress color="secondary" size={size} />
    </Grid>
  )
}

LoadingSpinner.propTypes = {
  size: PropTypes.number.isRequired,
}
