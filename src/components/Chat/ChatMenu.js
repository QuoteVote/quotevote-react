import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, SvgIcon } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { ReactComponent as ChatSvg } from '../../assets/svg/Chat.svg'
import RichTooltip from './RichToolTip'
import ChatContent from './ChatContent'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}))
function ChatMenu({ fontSize }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const selectedRoom = useSelector((state) => state.chat.selectedRoom)
  const tipColor = !selectedRoom ? '#1BB5D8' : '#EEF4F9'
  const tipBackgroundImage = !selectedRoom ?
    'linear-gradient(224.94deg, #1BB5D8 1.63%, #4066EC 97.6%)' : '#EEF4F9'
  return (
    <div className={classes.root}>
      <RichTooltip
        content={<ChatContent />}
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
            component={ChatSvg}
            fontSize={fontSize}
            viewBox="0 0 37 37"
          />
        </IconButton>
      </RichTooltip>
    </div>
  )
}
ChatMenu.propTypes = {
  fontSize: PropTypes.any.isRequired,
}

export default ChatMenu
