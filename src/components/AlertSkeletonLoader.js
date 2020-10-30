import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

export default function AlertSkeletonLoader({ cols }) {
  const numberOfRows = Array.from(Array(12).keys())
  if (cols > 1) {
    return (
      <GridList cols={cols}>
        {numberOfRows.map((item) => (
          <GridListTile key={item} cols={1}>
            <Skeleton animation="wave" height={300} />
          </GridListTile>
        ))}
      </GridList>
    )
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="stretch"
      spacing={1}
    >
      {numberOfRows.map((item) => (
        <Grid item key={item}>
          <Skeleton animation="wave" height={300} />
        </Grid>
      ))}
    </Grid>
  )
}

AlertSkeletonLoader.propTypes = {
  cols: PropTypes.number,
}
