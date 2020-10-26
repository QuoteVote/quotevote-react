import React, { useState } from 'react'
import {
  Card, CardActions, CardContent, CardHeader, IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BlockIcon from '@material-ui/icons/Block'
import LinkIcon from '@material-ui/icons/Link'
import { Comment, Favorite, PersonAdd } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { cloneDeep, findIndex } from 'lodash'
import moment from 'moment'
import ApproveButton from '../CustomButtons/ApproveButton'
import RejectButton from '../CustomButtons/RejectButton'
import VotingBoard from '../VotingComponents/VotingBoard'
import VotingPopup from '../VotingComponents/VotingPopup'
import { SET_SNACKBAR } from '../../store/ui'
import {
  ADD_COMMENT, APPROVE_POST, REJECT_POST, VOTE,
} from '../../graphql/mutations'
import { GET_POST, GET_TOP_POSTS } from '../../graphql/query'
import ApproveRejectPopover from '../ApproveRejectPopver/ApproveRejectPopover'
import AvatarDisplay from '../Avatar'

const useStyles = makeStyles(() => ({
  header2: {
    padding: 0,
    marginLeft: 10,
  },
  title: {
    color: '#00cf6e',
    marginRight: 5,
    fontFamily: 'Montserrat',
  },
  blockIcon: {
    color: 'red',
  },
  avatar: {
    marginLeft: 20,
  },
  upVote: {
    color: '#00cf6e',
  },
  downVote: {
    color: 'red',
  },
  points: {
    marginTop: 15,
    marginRight: 20,
    fontSize: 22,
    fontWeight: 'bolder',
    fontFamily: 'Montserrat',
  },
  content: {},
  expand: {
    marginLeft: 'auto',
  },
  button: {
    margin: 10,
  },
}))

function Post({ post, user }) {
  const classes = useStyles()
  const {
    title, creator, upvotes, downvotes, created, _id,
  } = post
  const { name, avatar } = creator
  const dispatch = useDispatch()
  const parsedCreated = moment(created).format('LLL')

  const [anchorEl, setAnchorEl] = useState(null)
  const [buttonType, setButtonType] = useState('approved')
  const [selectedText, setSelectedText] = useState('')
  const [addVote] = useMutation(VOTE, {
    update(
      cache,
      {
        // eslint-disable-next-line no-shadow
        data: { addVote },
      },
    ) {
      const data = cache.readQuery({
        query: GET_POST,
        variables: { postId: _id },
      })
      const clonedPost = cloneDeep(data)

      const index = findIndex(
        clonedPost.post.votedBy,
        (vote) => vote.userId === user._id,
      )
      if (index !== -1) {
        clonedPost.post.votedBy[index].type = addVote.type
        clonedPost.post.upvotes =
          addVote.type === 'up' ?
            clonedPost.post.upvotes + 1 :
            clonedPost.post.upvotes - 1

        clonedPost.post.downvotes =
          addVote.type === 'down' ?
            clonedPost.post.downvotes + 1 :
            clonedPost.post.downvotes - 1
      } else {
        clonedPost.post.votedBy.push({ type: addVote.type, userId: user._id })
        if (addVote.type === 'up') {
          clonedPost.post.upvotes++
        } else {
          clonedPost.post.downvotes++
        }
      }
      cache.writeQuery({
        query: GET_POST,
        variables: { postId: _id },
        data: { ...clonedPost },
      })
    },
    refetchQueries: [
      {
        query: GET_TOP_POSTS,
        variables: { limit: 5, offset: 0, searchKey: '' },
      },
    ],
  })
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [
      {
        query: GET_TOP_POSTS,
        variables: { limit: 5, offset: 0, searchKey: '' },
      },
      {
        query: GET_POST,
        variables: { postId: _id },
      },
    ],
  })
  const [approvePost] = useMutation(APPROVE_POST, {
    refetchQueries: [
      {
        query: GET_POST,
        variables: { postId: _id },
      },
    ],
  })
  const [rejectPost] = useMutation(REJECT_POST, {
    refetchQueries: [
      {
        query: GET_POST,
        variables: { postId: _id },
      },
    ],
  })
  const handleAddComment = async (comment, commentWithQuote = false) => {
    let startIndex
    let endIndex
    let quoteText
    if (selectedText) {
      startIndex = selectedText.startIndex
      endIndex = selectedText.endIndex
      quoteText = selectedText.text
    } else {
      startIndex = 0
      endIndex = 0
      quoteText = ''
    }

    const newComment = {
      userId: user._id,
      content: comment,
      startWordIndex: startIndex,
      endWordIndex: endIndex,
      postId: _id,
      url: post.url,
      // hashtags,
      quote: commentWithQuote ? quoteText : '',
    }

    try {
      await addComment({ variables: { comment: newComment } })
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: 'Commented Successfully',
          type: 'success',
        }),
      )
    } catch (err) {
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: `Comment Error: ${err.message}`,
          type: 'danger',
        }),
      )
    }
  }
  const handleVoting = async (type) => {
    const vote = {
      // text: selectedText.text,
      postId: post._id,
      userId: user._id,
      type,
      startWordIndex: selectedText.startIndex,
      endWordIndex: selectedText.endIndex,
    }
    try {
      await addVote({ variables: { vote } })
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: 'Voted Successfully',
          type: 'success',
        }),
      )
    } catch (err) {
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: `Vote Error: ${err.message}`,
          type: 'danger',
        }),
      )
    }
  }

  const disableApproveReject = user._id === post.userId
  const disableApprove = post.approvedBy.includes(user._id)
  const disableReject = post.rejectedBy.includes(user._id)
  const handleApprovePost = async () => {
    if (!disableApproveReject || !disableApprove) {
      try {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: 'Approved Post Successfully',
            type: 'success',
          }),
        )
        approvePost({ variables: { userId: user._id, postId: post._id } })
      } catch (err) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: `Approve Post Error: ${err.message}`,
            type: 'danger',
          }),
        )
      }
    }
  }
  const handleRejectPost = async () => {
    if (!disableApproveReject || !disableReject) {
      try {
        rejectPost({ variables: { userId: user._id, postId: post._id } })
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: 'Rejected Post Successfully',
            type: 'success',
          }),
        )
      } catch (err) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: `Reject Post error: ${err.message}`,
            type: 'danger',
          }),
        )
      }
    }
  }
  const handlePopoverOpen = (event, type) => {
    setAnchorEl(event.currentTarget)
    setButtonType(type)
  }
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const pointsHeader = (
    <div className={classes.points}>
      <span className={classes.upVote}>
        +
        {upvotes}
      </span>
      <span> / </span>
      <span className={classes.downVote}>{downvotes}</span>
    </div>
  )
  const cardTitle = (
    <div>
      <span className={classes.title}>{title}</span>
      <IconButton size="small">
        <LinkIcon />
      </IconButton>
      <IconButton size="small">
        <BlockIcon className={classes.blockIcon} />
      </IconButton>
    </div>
  )
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header1}
        title={cardTitle}
        action={pointsHeader}
      />
      <CardHeader
        className={classes.header2}
        avatar={(
          <IconButton>
            <AvatarDisplay height={40} width={40} {...avatar} />
          </IconButton>
        )}
        title={name}
        subheader={parsedCreated}
      />
      <CardContent>
        <VotingBoard
          content={post.text}
          onSelect={setSelectedText}
          selectedText={selectedText}
          highlights
        >
          {({ text }) => (
            <VotingPopup
              onVote={handleVoting}
              onAddComment={handleAddComment}
              text={text}
              selectedText={selectedText}
              votedBy={post.votedBy}
            />
          )}
        </VotingBoard>
      </CardContent>

      <CardActions disableSpacing style={{ marginLeft: 20 }}>
        <RejectButton
          onMouseEnter={(e) => handlePopoverOpen(e, 'rejected')}
          onClick={handleRejectPost}
          style={{
            opacity: disableApproveReject || disableReject ? 0.65 : 1,
          }}
        />
        <ApproveButton
          onClick={handleApprovePost}
          style={{
            marginLeft: 10,
            opacity: disableApproveReject || disableApprove ? 0.65 : 1,
          }}
          onMouseEnter={(e) => handlePopoverOpen(e, 'approved')}
        />
        <IconButton className={classes.expand}>
          <Comment />
        </IconButton>
        <IconButton>
          <PersonAdd />
        </IconButton>
        <IconButton>
          <Favorite />
        </IconButton>
      </CardActions>

      <ApproveRejectPopover
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
        type={buttonType}
        approvedBy={post.approvedBy}
        rejectedBy={post.rejectedBy}
      />
    </Card>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Post
