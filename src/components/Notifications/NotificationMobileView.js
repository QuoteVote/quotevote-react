import React from 'react'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { GET_NOTIFICATIONS } from '../../graphql/query'
import { NEW_NOTIFICATION_SUBSCRIPTION } from '../../graphql/subscription'
import NotificationContent from './Notification'
import SubHeader from '../SubHeader'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    marginRight: 10,
    maxWidth: '70%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      marginRight: 2,
      marginLeft: 2,
    },
  },
}))

function NotificationMobileView() {
  const classes = useStyles()
  const { loading, data, refetch } = useQuery(GET_NOTIFICATIONS)
  const userId = useSelector((state) => state.user.data._id)
  useSubscription(
    NEW_NOTIFICATION_SUBSCRIPTION,
    {
      variables: { userId },
      onSubscriptionData: async () => {
        await refetch()
      },
    },
  )

  const { notifications } = loading ? { notifications: [] } : data

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
      spacing={2}
    >
      <Grid item xs={12}>
        <SubHeader headerName="Notifications" showFilterIconButton={false} />
      </Grid>
      <Grid item xs={12} className={classes.list}>
        <NotificationContent
          spacing={2}
          loading={loading}
          notifications={notifications}
          refetch={refetch}
          pageView
        />
      </Grid>
    </Grid>
  )
}

export default NotificationMobileView
