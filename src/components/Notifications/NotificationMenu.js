import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, SvgIcon } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import RichTooltip from '../Chat/RichToolTip'
import NotificationContent from './Notification'
import { ReactComponent as NotificationsSvg } from '../../assets/svg/Notifications.svg'

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
  return (
    <div className={classes.root}>
      <RichTooltip
        content={<NotificationContent />}
        open={open}
        placement="bottom"
        onClose={() => setOpen(false)}
        tipColor={tipColor}
        tipBackgroundImage={tipBackgroundImage}
        spacing={selectedRoom ? 0 : 2}
      >
        <IconButton
          aria-label="Chat"
          color="inherit"
          onClick={() => setOpen(!open)}
        >
          <SvgIcon
            component={NotificationsSvg}
            fontSize={fontSize}
            viewBox="0 0 49 46"
          />
        </IconButton>
      </RichTooltip>
    </div>
  )
}
NotificationMenu.propTypes = {
  fontSize: PropTypes.any.isRequired,
}

export default NotificationMenu
