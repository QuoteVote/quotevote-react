import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'

import requestAccessStyles from '../requestAccessStyles'
import Button from '../../../mui-pro/CustomButtons/Button'

const useStyles = makeStyles(requestAccessStyles)

function SendRequest(props) {
  const { handleSubmit, onSubmit, setUserDetails} = props
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
        onChange={(event) => setUserDetails(event.target.value)}
      />
      <Button className={classes.requestAccessBtn} onClick={() => onSubmit()}>Request Invite</Button>
    </Grid>
  )
}

export default SendRequest
