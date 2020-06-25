import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Skeleton from '@material-ui/lab/Skeleton'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Alert from './Alert'

const getGridListCols = (width) => {
  switch (width) {
    case 'xl':
      return 4
    case 'lg':
      return 4
    case 'md':
      return 3
    case 'sm':
      return 2
    default:
      return 1
  }
}

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

AlertSkeletonLoader.propTypes = {
  limit: PropTypes.number.isRequired,
}

function useWidth() {
  const theme = useTheme()
  const keys = [...theme.breakpoints.keys].reverse()
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || 'xs'
  )
}

function LoadAlertList({ data, width }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ width: '90%' }}>
        <span>Hmmmm, we&apos;re not getting any results. Our bad - try another search.</span>
        <br></br>
      </div>
    )
  }

  return (
    <GridList cols={getGridListCols(width)}>
      {data.map((item) => (
        <GridListTile key={item.AlertTitle} cols={1}>
          <Alert
            color={item.color}
            AlertTitle={item.AlertTitle}
            AlertBody={item.AlertBody}
            time={item.time}
            points={item.points}
            creator={item.creator}
          />
        </GridListTile>
      ))}
    </GridList>
  )
}
LoadAlertList.propTypes = {
  length: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default function AlertList({ Data, loading, limit }) {
  const width = useWidth()
  if (loading) return <AlertSkeletonLoader limit={limit} />
  return <LoadAlertList data={Data} width={width} />
}

AlertList.propTypes = {
  Data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  limit: PropTypes.number.isRequired,
}
