/* eslint-disable no-underscore-dangle */
import React from 'react'

import { Grid } from '@material-ui/core'

// Material Icons
import SubmitPost from '../../components/SubmitPost/SubmitPost'

function SubmitPostPage() {
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="space-evenly"
      alignItems="flex-start"
    >
      <Grid item xs={12} md={6}>
        <SubmitPost />
      </Grid>
    </Grid>
  )
}

export default SubmitPostPage
