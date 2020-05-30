import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 360,
    height: '70%',
    backgroundColor: '#191919',
    marginTop: 20,
  },
  listItem: {
    backgroundColor: '#191919',
    maxWidth: '300px',
    alignContent: 'center',
    textAlign: 'center',
  },
}))


// eslint-disable-next-line react/prop-types
export default function ChatLoader() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.listItem}>
        <CircularProgress className={classes.progress} />
      </div>
    </div>
  )
}
