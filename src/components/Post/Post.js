import React, { useState } from 'react'
import {
  Card, CardActions, CardContent, CardHeader, IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BlockIcon from '@material-ui/icons/Block'
import LinkIcon from '@material-ui/icons/Link'
import { PersonAdd } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { cloneDeep, findIndex } from 'lodash'
import moment from 'moment'
import VotingBoard from '../VotingComponents/VotingBoard'
import VotingPopup from '../VotingComponents/VotingPopup'
import { SET_SNACKBAR } from '../../store/ui'
import { ADD_COMMENT, ADD_QUOTE, VOTE } from '../../graphql/mutations'
import { GET_POST, GET_TOP_POSTS, GET_USER_ACTIVITY } from '../../graphql/query'
import AvatarDisplay from '../Avatar'
import BookmarkIconButton from '../CustomButtons/BookmarkIconButton'

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
  votes: {
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

function Post({
  post,
  user,
  postHeight,
  postActions,
}) {
  const classes = useStyles()
  const {
    title, creator, created, _id, userId,
  } = post
  const { name, avatar } = creator
  const dispatch = useDispatch()
  const history = useHistory()
  const parsedCreated = moment(created).format('LLL')
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
      {
        query: GET_POST,
        variables: { postId: _id },
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
  const [addQuote] = useMutation(ADD_QUOTE, {
    refetchQueries: [
      {
        query: GET_TOP_POSTS,
        variables: { limit: 5, offset: 0, searchKey: '' },
      },
      {
        query: GET_POST,
        variables: { postId: _id },
      },
      {
        query: GET_USER_ACTIVITY,
        variables: {
          limit: 15,
          offset: 0,
          searchKey: '',
          activityEvent: ['POSTED', 'VOTED', 'COMMENTED', 'QUOTED', 'LIKED'],
          user_id: user._id,
          startDateRange: '',
          endDateRange: '',
        },
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
  const handleVoting = async (obj) => {
    const vote = {
      content: selectedText.text,
      postId: post._id,
      userId: user._id,
      type: obj.type,
      tags: obj.tags,
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
  const handleAddQuote = async () => {
    const quote = {
      quote: selectedText.text,
      postId: post._id,
      quoter: user._id,
      quoted: userId,
      startWordIndex: selectedText.startIndex,
      endWordIndex: selectedText.endIndex,
    }
    try {
      await addQuote({ variables: { quote } })
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: 'Quoted Successfully',
          type: 'success',
        }),
      )
    } catch (err) {
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: `Quote Error: ${err.message}`,
          type: 'danger',
        }),
      )
    }
  }

  const handleRedirectToProfile = (username) => {
    history.push(`/Profile/${username}`)
  }

  const pointsHeader = (
    <div className={classes.points}>
      <span className={classes.votes}>
        {postActions ? postActions.length : '0'}
      </span>
    </div>
  )

  function copyToClipBoard() {
    navigator.clipboard.writeText(`www.quote.vote${history.location.pathname}`)
  }

  const cardTitle = (
    <div>
      <span className={classes.title}>{title}</span>
      <IconButton size="small" id="copyBtn" onClick={copyToClipBoard}>
        <LinkIcon />
      </IconButton>
      <IconButton size="small">
        <BlockIcon className={classes.blockIcon} />
      </IconButton>
    </div>
  )

  return (
    <Card
      style={{
        height: postHeight >= 742 ? '83vh' : 'auto',
        overflow: 'auto',
      }}
    >
      <CardHeader
        className={classes.header1}
        title={cardTitle}
        action={pointsHeader}
      />
      <CardHeader
        className={classes.header2}
        avatar={(
          <IconButton
            size="small"
            onClick={() => handleRedirectToProfile(creator.username)}
          >
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
              onAddQuote={handleAddQuote}
              text={text}
              selectedText={selectedText}
              votedBy={post.votedBy}
            />
          )}
        </VotingBoard>
      </CardContent>

      <CardActions disableSpacing style={{ marginLeft: 20 }}>
        <IconButton>
          <PersonAdd />
        </IconButton>
        <BookmarkIconButton post={post} user={user} />
      </CardActions>
    </Card>
  )
}

Post.propTypes = {
  postActions: PropTypes.array,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  postHeight: PropTypes.number,
}

export default Post
