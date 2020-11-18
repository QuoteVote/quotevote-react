import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, SvgIcon } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import Badge from '@material-ui/core/Badge'
import withStyles from '@material-ui/core/styles/withStyles'
import RichTooltip from '../Chat/RichToolTip'
import NotificationContent from './Notification'
import { ReactComponent as NotificationsSvg } from '../../assets/svg/Notifications.svg'
import { ReactComponent as NotificationsActiveSvg } from '../../assets/svg/NotificationsActive.svg'
import { GET_NOTIFICATIONS } from '../../graphql/query'
import { NEW_NOTIFICATION_SUBSCRIPTION } from '../../graphql/subscription'

const StyledBadge = withStyles(() => ({
  badge: {
    right: 20,
    top: 20,
  },
}))(Badge)

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  tipColor: {
    backgroundColor: '#F1F1F1',
  },
}))
function NotificationMenu({ fontSize }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const selectedRoom = useSelector((state) => state.chat.selectedRoom)
  const tipColor = classes.tipColor.backgroundColor
  const tipBackgroundImage = classes.tipColor.backgroundColor
  const [svgIcon, setSvgIcon] = useState(NotificationsSvg)

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
    <div className={classes.root}>
      <RichTooltip
        content={<NotificationContent loading={loading} notifications={notifications} refetch={refetch} />}
        open={open}
        placement="bottom"
        onClose={() => setOpen(false)}
        tipColor={tipColor}
        tipBackgroundImage={tipBackgroundImage}
        spacing={selectedRoom ? 0 : 2}
      >
        <StyledBadge
          color="error"
          badgeContent={notifications.length}
          onMouseEnter={() => setSvgIcon(NotificationsActiveSvg)}
          onMouseLeave={() => setSvgIcon(NotificationsSvg)}
        >
          <IconButton
            aria-label="Chat"
            color="inherit"
            onClick={() => setOpen(!open)}
          >
            <SvgIcon
              component={svgIcon}
              fontSize={fontSize}
              viewBox="0 0 49 46"
            />
          </IconButton>
        </StyledBadge>
      </RichTooltip>
    </div>
  )
}
NotificationMenu.propTypes = {
  fontSize: PropTypes.any.isRequired,
}

export default NotificationMenu
