import React from 'react'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { GET_NOTIFICATIONS } from '../../graphql/query'
import { NEW_NOTIFICATION_SUBSCRIPTION } from '../../graphql/subscription'
import NotificationContent from './Notification'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
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
    <Grid className={classes.root}>
      <NotificationContent
        spacing={2}
        loading={loading}
        notifications={notifications}
        refetch={refetch}
        pageView
      />
    </Grid>
  )
}

export default NotificationMobileView
