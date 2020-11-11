import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Badge from '@material-ui/core/Badge'
import commentBadgeIcon from 'assets/img/badge/CommentBadge.png'
import qouteBadgeIcon from 'assets/img/badge/QouteBadge.png'
import downVoteBadgeIcon from 'assets/img/badge/DownVoteBadge.png'
import upVoteBadgeIcon from 'assets/img/badge/UpVoteBadge.png'
import zeroNotificationsImg from 'assets/img/ZeroNotificationsBG.png'
import moment from 'moment'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import stringLimit from 'string-limit'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AvatarDisplay from '../Avatar'
import { DELETE_NOTIFICATION } from '../../graphql/mutations'
import { GET_NOTIFICATIONS } from '../../graphql/query'
import { SET_SELECTED_POST } from '../../store/ui'

const NotificationBadge = withStyles(() => ({
  badge: {
    right: 15,
  },
}))(Badge)

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    backgroundColor: theme.palette.background.paper,
    height: '75vh',
    position: 'relative',
    overflow: 'auto',
  },
  rootMin: {
    width: 350,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  rootNoNotification: {
    width: 350,
    backgroundColor: theme.palette.background.paper,
    height: '30vh',
    position: 'relative',
    overflow: 'auto',
  },
  inline: {
    display: 'inline',
  },
  close: {
    marginTop: -30,
  },
  listItem: {
    paddingTop: 10,
  },
}))

const getBadgeIcon = (notificationType) => {
  switch (notificationType) {
    case 'UPVOTED':
      return upVoteBadgeIcon
    case 'DOWNVOTED':
      return downVoteBadgeIcon
    case 'COMMENTED':
      return commentBadgeIcon
    case 'QUOTED':
      return qouteBadgeIcon
    default:
      return ''
  }
}

function NotificationLists({ notifications }) {
  const classes = useStyles()
  const client = useApolloClient()
  const dispatch = useDispatch()
  const history = useHistory()

  const [removeNotification] = useMutation(DELETE_NOTIFICATION)

  const handleDelete = async (notificationId) => {
    const newNotifications = notifications.filter((notification) => notification._id !== notificationId)

    client.writeQuery({
      query: GET_NOTIFICATIONS,
      data: { notifications: newNotifications },
    })

    await removeNotification({
      variables: {
        notificationId,
      },
      refetchQueries: [{
        query: GET_NOTIFICATIONS,
      }],
    })
  }

  if (!notifications || !notifications.length) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.rootNoNotification}
      >
        <Grid item>
          <img src={zeroNotificationsImg} alt="" />
        </Grid>
        <Grid item>
          <Typography
            component="span"
            variant="body2"
          >
            Relax, you don’t have any alerts right now.
          </Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <List className={notifications.length < 5 ? classes.rootMin : classes.root}>
      {notifications.map(({
        notificationType, label, created, userBy, _id, post,
      }) => (
        <>
          <ListItem
            button
            alignItems="flex-start"
            onClick={() => {
              dispatch(SET_SELECTED_POST(post._id))
              history.push(post.url)
            }}
          >
            <ListItemAvatar>
              <NotificationBadge
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<img src={getBadgeIcon(notificationType)} alt="Commented" />}
              >
                <IconButton
                  size="small"
                >
                  <Avatar alt={userBy.name}>
                    <AvatarDisplay height={75} width={75} {...userBy.avatar} />
                  </Avatar>
                </IconButton>
              </NotificationBadge>
            </ListItemAvatar>
            <ListItemText
              primary={(
                <>
                  <b>
                    {notificationType}
                    .
                  </b>
                  {' '}
                  {`"${stringLimit(label, 50)}"`}
                </>
              )}
              secondary={(
                <>
                  {moment(created).calendar(null, {
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]',
                    nextWeek: 'dddd',
                    lastDay: '[Yesterday]',
                    lastWeek: '[Last] dddd',
                    sameElse: 'MMM DD, YYYY',
                  })}
                  {` @ ${moment(created).format('h:mm A')}`}
                </>
              )}
            />
            <ListItemSecondaryAction className={classes.close}>
              <IconButton
                size="small"
                onClick={() => {
                  handleDelete(_id)
                }}
              >
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </>
      ))}
    </List>
  )
}

NotificationLists.propTypes = {
  notifications: PropTypes.object.isRequired,
}
export default NotificationLists
