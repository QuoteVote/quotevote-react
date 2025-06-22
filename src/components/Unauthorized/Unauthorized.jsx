import React from 'react'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  panelContainer: {
    [theme.breakpoints.up('lg')]: {
      padding: 20,
      paddingTop: 30,
    },
    [theme.breakpoints.down('md')]: {
      padding: 10,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}))
const Unauthorized = () => {
  const classes = useStyles()
  return (
    <Grid container spacing={2} className={classes.panelContainer}>
      <Grid item xs={12}>
        <Typography variant="h2">Unauthorized</Typography>
      </Grid>
      <Grid container item xs={12}>
        <Typography>You must be logged in as admin to view this page.</Typography>
      </Grid>
    </Grid>
  )
}
export default Unauthorized
