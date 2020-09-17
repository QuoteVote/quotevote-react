import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import PropTypes from 'prop-types'
import { getGridListCols } from '../utils/display'

export default function AlertSkeletonLoader({ width }) {
  const rows = Array.from(Array(12).keys())
  return (
    <GridList cols={getGridListCols[width]}>
      {rows.map((item) => (
        <GridListTile key={item} cols={1}>
          <Skeleton animation="wave" height={200} />
        </GridListTile>
      ))}
    </GridList>
  )
}

AlertSkeletonLoader.propTypes = {
  width: PropTypes.object.isRequired,
}
