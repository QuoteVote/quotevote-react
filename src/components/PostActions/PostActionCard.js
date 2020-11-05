import React from 'react'
import {
  Card, CardActions, CardContent, CardHeader, IconButton,
} from '@material-ui/core'
import { InsertEmoticon, InsertLink } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { get } from 'lodash'
import AvatarDisplay from '../Avatar'
import { parseCommentDate } from '../../utils/momentUtils'
import { SET_FOCUSED_COMMENT } from '../../store/ui'
import { ReactComponent as DislikeIcon } from '../../assets/svg/Dislike.svg'
import { ReactComponent as LikeIcon } from '../../assets/svg/Like.svg'

const useStyles = makeStyles(() => ({
  content: {
    marginLeft: 60,
    marginRight: 40,
    marginTop: -20,
    marginBottom: -20,
  },
  expand: {
    marginLeft: 'auto',
  },
  created: {
    verticalAlign: 'middle',
    marginTop: 20,
    marginRight: 10,
  },
}))

function PostActionCard({ postAction }) {
  const {
    user, content, created,
  } = postAction
  const { username, avatar } = user
  const classes = useStyles()
  const parsedDate = parseCommentDate(created)
  const dispatch = useDispatch()
  const voteType = get(postAction, 'type')
  const quote = get(postAction, 'quote')
  let postContent = content

  if (voteType) {
    postContent = voteType === 'up' ? 'Upvoted this post.' : 'Downvoted this post.'
  }

  if (quote) {
    postContent = quote.length ? <i><q>{quote}</q></i> : 'Quoted this post.'
  }

  return (
    <Card
      onMouseEnter={() => dispatch(SET_FOCUSED_COMMENT(postAction))}
      onMouseLeave={() => dispatch(SET_FOCUSED_COMMENT(null))}
      style={{ position: 'relative' }}
    >
      {voteType && (
        <SvgIcon
          component={voteType === 'up' ? LikeIcon : DislikeIcon}
          fontSize="large"
          viewBox="0 0 50 50"
          style={{ position: 'absolute', top: 90, left: 38 }}
        />
      )}
      <CardHeader
        avatar={(
          <IconButton>
            <AvatarDisplay height={40} width={40} {...avatar} />
          </IconButton>
        )}
        subheader={`@${username}`}
        action={<div className={classes.created}><span>{parsedDate}</span></div>}
      />
      <CardContent
        className={classes.content}
      >
        <p>
          {postContent}
        </p>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton className={classes.expand}>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <InsertLink />
        </IconButton>
      </CardActions>
    </Card>
  )
}

PostActionCard.propTypes = {
  postAction: PropTypes.object.isRequired,
}

export default PostActionCard
