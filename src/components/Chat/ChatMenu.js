import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import ChatSvg from '../../assets/svg/Chat.svg'
import RichTooltip from './RichToolTip'
import ChatContent from './ChatContent'
import { SET_CHAT_OPEN } from '../../store/chat'
import ChatActiveSvg from '../../assets/svg/ChatActive.svg'

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

  const [isHovered, setIsHovered] = useState(false)
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <img 
              src={ChatActiveSvg} 
              alt="chat active" 
              style={{width: fontSize === 'large' ? '37px' : '28px', height: fontSize === 'large' ? '37px' : '28px'}} 
            />
          ) : (
            <img 
              src={ChatSvg} 
              alt="chat" 
              style={{width: fontSize === 'large' ? '37px' : '28px', height: fontSize === 'large' ? '37px' : '28px'}} 
            />
          )}
        </IconButton>
      </RichTooltip>
    </div>
  )
}
ChatMenu.propTypes = {
  fontSize: PropTypes.any,
}

export default ChatMenu
