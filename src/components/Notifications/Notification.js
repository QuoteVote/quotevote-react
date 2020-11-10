import React from 'react'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { Skeleton } from '@material-ui/lab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { GET_NOTIFICATIONS } from '../../graphql/query'
import NotificationLists from './NotificationLists'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  skeleton: {
    width: 350,
  },
}))

function Notification() {
  const classes = useStyles()
  const { loading, data } = useQuery(GET_NOTIFICATIONS)
  const { notifications } = loading ? { notifications: [] } : data
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

export default Notification
