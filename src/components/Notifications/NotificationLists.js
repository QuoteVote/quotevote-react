import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
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

const NotificationBadge = withStyles(() => ({
  badge: {
    right: 15,
  },
}))(Badge)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '60ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  close: {
    marginTop: -35,
  },
}))

const getBadgeIcon = (action) => {
  switch (action) {
    case 'UPVOTED':
      return upVoteBadgeIcon
    case 'DOWNVOTED':
      return downVoteBadgeIcon
    case 'COMMENTED':
      return commentBadgeIcon
    case 'QOUTED':
      return qouteBadgeIcon
    default:
      return ''
  }
}

function NotificationLists({ notifications }) {
  const classes = useStyles()

  if (!notifications || !notifications.length) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
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
    <List className={classes.root}>
      {notifications.map((notification) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <NotificationBadge
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<img src={getBadgeIcon(notification.action)} alt="Commented" />}
              >
                <IconButton size="small">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </IconButton>
              </NotificationBadge>
            </ListItemAvatar>
            <ListItemText
              primary={(
                <>
                  <b>
                    {notification.action}
                    .
                  </b>
                  {' '}
                  {`"${notification.text}"`}
                </>
              )}
              secondary={(
                <>
                  {moment(notification.created).calendar(null, {
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]',
                    nextWeek: 'dddd',
                    lastDay: '[Yesterday]',
                    lastWeek: '[Last] dddd',
                    sameElse: 'MMM DD, YYYY',
                  })}
                  {` @ ${moment(notification.created).format('h:mm A')}`}
                </>
              )}
            />
            <ListItemSecondaryAction className={classes.close}>
              <IconButton size="small">
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  )
}

NotificationLists.propTypes = {
  notifications: PropTypes.object.isRequired,
}
export default NotificationLists
