import React from 'react'
import {
  Card, CardActions, CardContent, IconButton, Typography,
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
import { ReactComponent as QuoteIcon } from '../../assets/svg/Quote.svg'
import { ReactComponent as CommentIcon } from '../../assets/svg/Comment.svg'

const useStyles = makeStyles(() => ({
  content: {
    marginLeft: 10,
    marginRight: 40,
    marginTop: 10,
    marginBottom: -20,
    fontSize: 16,
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
  let svgIcon = CommentIcon
  let voteTags = ''

  if (voteType) {
    const isUpvote = voteType === 'up'
    const defaultTag = isUpvote ? '#agree' : '#disagree'
    svgIcon = isUpvote ? LikeIcon : DislikeIcon
    voteTags = get(postAction, 'tags') || defaultTag
  }

  if (quote) {
    postContent = quote.length ? quote : 'Quoted this post.'
    svgIcon = QuoteIcon
  }

  return (
    <Card
      onMouseEnter={() => dispatch(SET_FOCUSED_COMMENT(postAction))}
      onMouseLeave={() => dispatch(SET_FOCUSED_COMMENT(null))}
      style={{ position: 'relative' }}
    >
      {!voteType && (
        <CardContent
          className={classes.content}
        >
          <p>
            {postContent}
          </p>
        </CardContent>
      )}
      <CardActions disableSpacing>
        <IconButton>
          <AvatarDisplay height={20} width={20} {...avatar} />
        </IconButton>
        <Typography display="inline">{`@${username}  ${parsedDate}`}</Typography>
        <SvgIcon
          component={svgIcon}
          fontSize="large"
          viewBox="-10 -10 50 50"
          htmlColor="black"
        />
        <Typography display="inline">{voteTags}</Typography>
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
