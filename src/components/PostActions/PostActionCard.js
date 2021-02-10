import React, { useEffect, useState } from 'react'
import {
  Card, CardActions, CardContent, IconButton, Typography,
} from '@material-ui/core'
import { InsertEmoticon, InsertLink } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'
import copy from 'clipboard-copy'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useHistory } from 'react-router-dom'
import AvatarDisplay from '../Avatar'
import { parseCommentDate } from '../../utils/momentUtils'
import { SET_FOCUSED_COMMENT, SET_SHARED_COMMENT } from '../../store/ui'
import { ReactComponent as DislikeIcon } from '../../assets/svg/Dislike.svg'
import { ReactComponent as LikeIcon } from '../../assets/svg/Like.svg'
import { ReactComponent as QuoteIcon } from '../../assets/svg/Quote.svg'
import { ReactComponent as CommentIcon } from '../../assets/svg/Comment.svg'
import buttonStyle from '../../assets/jss/material-dashboard-pro-react/components/buttonStyle'
import PostChatMessage from '../PostChat/PostChatMessage'

const useStyles = makeStyles((theme) => ({
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
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  selectedRoot: {
    backgroundColor: '#f1e8c1',
    width: '100%',
  },
  ...buttonStyle,
  date: {
    color: '#949292',
  },
}))

function PostActionCard({ postAction, postUrl, selected }) {
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    user, content, created, _id,
  } = postAction
  const { username, avatar, name } = user
  const parsedDate = parseCommentDate(created)
  const voteType = get(postAction, 'type')
  const quote = get(postAction, 'quote')
  const sharedComment = useSelector((state) => state.ui.sharedComment)

  const baseUrl = window.location.origin
  const handleCopy = async () => {
    await copy(`${baseUrl}${postUrl}/comment#${_id}`)
    setOpen(true)
  }
  const [open, setOpen] = useState(false)
  const hideAlert = () => {
    setOpen(false)
  }

  let postContent = content
  let svgIcon = CommentIcon
  let voteTags = ''

  const handleRedirectToProfile = () => {
    history.push(`/hhsb/Profile/${username}`)
  }

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

  useEffect(() => {
    if (selected) {
      dispatch(SET_SHARED_COMMENT(postAction))
      dispatch(SET_FOCUSED_COMMENT(postAction))
    }
  }, [postAction, selected, dispatch])

  if (postAction.text) {
    return (
      <PostChatMessage message={postAction} key={postAction._id} />
    )
  }

  return (
    <Card
      onMouseEnter={() => dispatch(SET_FOCUSED_COMMENT(postAction))}
      onMouseLeave={() => dispatch(SET_FOCUSED_COMMENT(sharedComment))}
      className={selected ? classes.selectedRoot : classes.root}
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
        <IconButton
          onClick={() => handleRedirectToProfile()}
        >
          <AvatarDisplay height={20} width={20} {...avatar} />
        </IconButton>
        <Typography display="inline">
          {name}
          {' '}
          <span className={classes.date}>{parsedDate}</span>
        </Typography>
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
        <IconButton onClick={handleCopy}>
          <InsertLink />
        </IconButton>
      </CardActions>
      {open && (
        <SweetAlert
          confirmBtnCssClass={`${classes.button} ${classes.success}`}
          success
          onConfirm={hideAlert}
          onCancel={hideAlert}
          title="Comment URL copied!"
          timeout={1000}
        />
      )}
    </Card>
  )
}

PostActionCard.propTypes = {
  postAction: PropTypes.object.isRequired,
  postUrl: PropTypes.string,
  selected: PropTypes.bool,
}

export default PostActionCard
