import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, SvgIcon } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as ChatSvg } from '../../assets/svg/Chat.svg'
import RichTooltip from './RichToolTip'
import ChatContent from './ChatContent'
import { SET_CHAT_OPEN } from '../../store/chat'
import { ReactComponent as ChatActiveSvg } from '../../assets/svg/ChatActive.svg'

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
  const dispatch = useDispatch()
  const setOpen = (open) => {
    dispatch(SET_CHAT_OPEN(open))
  }
  const open = useSelector((state) => state.chat.open)
  const selectedRoom = useSelector((state) => state.chat.selectedRoom)
  const tipColor = !selectedRoom ? '#1BB5D8' : '#EEF4F9'
  const tipBackgroundImage = !selectedRoom ?
    'linear-gradient(224.94deg, #1BB5D8 1.63%, #4066EC 97.6%)' : '#EEF4F9'

  const [svgIcon, setSvgIcon] = useState(ChatSvg)
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
          onMouseEnter={() => setSvgIcon(ChatActiveSvg)}
          onMouseLeave={() => setSvgIcon(ChatSvg)}
        >
          <SvgIcon
            component={svgIcon}
            fontSize={fontSize}
            viewBox="0 0 37 37"
          />
        </IconButton>
      </RichTooltip>
    </div>
  )
}
ChatMenu.propTypes = {
  fontSize: PropTypes.any,
}

export default ChatMenu
