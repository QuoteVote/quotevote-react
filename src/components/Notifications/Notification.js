import React from 'react'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import NotificationLists from './NotificationLists'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}))
function Notification() {
  const classes = useStyles()
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}
      spacing={4}
    >
      <Grid item>
        <Typography variant="h5">Notifications</Typography>
      </Grid>
      <Grid item>
        <NotificationLists notifications={[]} />
      </Grid>

    </Grid>
  )
}

export default Notification
