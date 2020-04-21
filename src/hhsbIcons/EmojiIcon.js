import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import Emoji from '../hhsbAssets/FollowingEmoji.svg'
export default function EmojiIcon(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SvgIcon {...props}>
      <path d={Emoji} />
    </SvgIcon>
  )
}
