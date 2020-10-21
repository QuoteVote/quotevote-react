import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { ThumbUp } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  button: {
    color: '#f44336',
    borderColor: '#f44336',
  },
}))

function RejectButton(props) {
  const classes = useStyles()

  return (
    <Button
      {...props}
      variant="outlined"
      className={classes.button}
      startIcon={
        <ThumbUp />
      }
    >
      REJECT
    </Button>
  )
}

export default RejectButton
