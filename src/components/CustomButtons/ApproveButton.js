import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { ThumbUp } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  button: {
    color: '#4caf50',
    borderColor: '#4caf50',
  },
}))

function ApproveButton(props) {
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
      APPROVE
    </Button>
  )
}

export default ApproveButton
