import React from 'react'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import PropTypes from 'prop-types'
import NotificationLists from './NotificationLists'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  skeleton: {
    width: 350,
  },
}))

function Notification({ loading, notifications }) {
  const classes = useStyles()
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h5">Notifications</Typography>
      </Grid>
      <Grid item>
        {loading && (
          <List className={classes.skeleton}>
            {Array.from(Array(3).keys()).map(() => (
              <ListItem>
                <ListItemAvatar>
                  <Skeleton animation="wave" variant="circle" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText primary={<Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />} />
              </ListItem>
            ))}
          </List>
        )}
        {!loading && (
          <NotificationLists notifications={notifications} />
        )}
      </Grid>

    </Grid>
  )
}

Notification.propTypes = {
  loading: PropTypes.bool.isRequired,
  notifications: PropTypes.object.isRequired,
}

export default Notification
