import React from 'react'

import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'

import requestAccessStyles from '../requestAccessStyles'
import Button from '../../../mui-pro/CustomButtons/Button'

const useStyles = makeStyles(requestAccessStyles)

function SendRequest() {
  const classes = useStyles()

  return (
    <Grid
      container
      display="flex"
      justify="center"
      alignItems="center"
      className={classes.inputContainer}
    >
      <Input
        disableUnderline
        placeholder="Enter Email"
        className={classes.input}
      />
      <Button className={classes.requestAccessBtn}>Request Invite</Button>
    </Grid>
  )
}

export default SendRequest
