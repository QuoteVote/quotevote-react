import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import withWidth from '@material-ui/core/withWidth'

function AlertSkeletonLoader({ cols, width }) {
  const iterator = cols > 1 ? 12 : 3
  const numberOfRows = Array.from(Array(iterator).keys())
  if (cols > 1) {
    return (
      <GridList cols={width === 'xs' ? 1 : cols}>
        {numberOfRows.map((item) => (
          <GridListTile
            key={item}
            cols={1}
            style={{ marginTop: width === 'xs' ? -25 : -50 }}
          >
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
      justify="flex-start"
      alignItems="stretch"
      spacing={0}
      style={{ marginTop: -50 }}
    >
      {numberOfRows.map((item) => (
        <Grid item key={item} style={{ marginBottom: -100 }}>
          <Skeleton animation="wave" height={300} />
        </Grid>
      ))}
    </Grid>
  )
}

AlertSkeletonLoader.propTypes = {
  cols: PropTypes.number,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
}

export default withWidth()(AlertSkeletonLoader)
