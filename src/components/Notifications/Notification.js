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
import Divider from '@material-ui/core/Divider'
import NotificationLists from './NotificationLists'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    paddingRight: (props) => (props.pageView ? 30 : 0),
    backgroundColor: theme.palette.background.paper,
  },
  skeleton: {
    width: (props) => (props.pageView ? 'auto' : 350),
  },
  content: {
    width: 'inherit',
  },
}))

function Notification({
  loading, notifications, spacing = 0, pageView,
}) {
  const classes = useStyles({ pageView })
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}
      spacing={spacing}
    >
      <Grid item>
        <Typography variant="h5">Notifications</Typography>
        <Divider variant="hr" />
      </Grid>
      <Grid item className={classes.content}>
        {loading && (
          <List className={classes.skeleton}>
            {Array.from(Array(3).keys()).map(() => (
              <ListItem>
                <ListItemAvatar>
                  <Skeleton animation="wave" variant="circle" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText primary={<Skeleton animation="wave" height={10} width={pageView ? 400 : 45} style={{ marginBottom: 6 }} />} />
              </ListItem>
            ))}
          </List>
        )}
        {!loading && (
          <NotificationLists notifications={notifications} pageView={pageView} />
        )}
      </Grid>

    </Grid>
  )
}

Notification.propTypes = {
  loading: PropTypes.bool.isRequired,
  notifications: PropTypes.object.isRequired,
  spacing: PropTypes.number,
  pageView: PropTypes.bool,
}

export default Notification
