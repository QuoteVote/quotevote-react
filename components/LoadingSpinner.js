'use client'

import PropTypes from 'prop-types'
import { Grid, CircularProgress } from '@mui/material'

export default function LoadingSpinner({ size = 80, marginTop = '15px' }) {
  return (
    <Grid container justifyContent="center" sx={{ mt: marginTop }}>
      <CircularProgress color="secondary" size={size} />
    </Grid>
  )
}

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  marginTop: PropTypes.string,
}

LoadingSpinner.defaultProps = {
  size: 80,
  marginTop: '15px',
} 