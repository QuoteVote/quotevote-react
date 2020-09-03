import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 360,
    backgroundColor: '#191919',
    marginTop: 20,
  },
  listItem: {
    backgroundColor: '#191919',
    maxWidth: '300px',
    alignContent: 'center',
    textAlign: 'center',
    flexGrow: 1,
    maxHeight: '100%',
    height: '100%',
  },
}))

// eslint-disable-next-line react/prop-types
export default function BuddyListLoader() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.listItem}>
        <CircularProgress className={classes.progress} />
      </div>
    </div>
  )
}
