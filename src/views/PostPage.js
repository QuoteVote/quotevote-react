/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
import React, { useState } from 'react'

import Button from 'mui-pro/CustomButtons/Button'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'
import CardFooter from 'mui-pro/Card/CardFooter'
import CardHeader from 'mui-pro/Card/CardHeader'
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import Snackbar from 'mui-pro/Snackbar/Snackbar'

import Divider from '@material-ui/core/Divider'
import CardActions from '@material-ui/core/CardActions'

import VotingBoard from 'components/VotingComponents/VotingBoard'
import VotingPopup from 'components/VotingComponents/VotingPopup'
import ApproveRejectPopover from 'hhsbComponents/ApproveRejectPopover'

// import Content from '../components/ContentList';

// import styles from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle';

import FaceIcon from '@material-ui/icons/Face'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'

import PostPageSkeleton from 'views/Skeletons/PostPageSkeleton'
import { useSelector } from 'react-redux'
import { cloneDeep, findIndex } from 'lodash'

import { GET_POST, GET_TOP_POSTS } from 'graphql/query'
import {
  VOTE, ADD_COMMENT, APPROVE_POST, REJECT_POST,
} from 'graphql/mutations'
import Chat from 'assets/img/Chat.svg'
import Heart from 'assets/img/Heart.svg'
import Send from 'assets/img/Send.svg'

const PostPage = () => {
  // const url = window.location.href
  // const urlSegment = url.split('/')
  // const domain = urlSegment[5]
  // const contentId = urlSegment[6]

  const [selectedText, setSelectedText] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [snackBar, setSnackBar] = useState({ open: false, message: '', color: 'danger' })
  const [buttonType, setButtonType] = useState('approved')
  const user = useSelector((state) => state.user.data)
  const postId = useSelector((state) => state.ui.selectedPost.id)
  const [addVote] = useMutation(VOTE, {
    update(
      cache,
      {
        // eslint-disable-next-line no-shadow
        data: { addVote },
      }
    ) {
      const data = cache.readQuery({
        query: GET_POST,
        variables: { postId },
      })
      const clonedPost = cloneDeep(data)

      const index = findIndex(clonedPost.post.votedBy, (vote) => vote.userId === user._id)
      if (index !== -1) {
        clonedPost.post.votedBy[index].type = addVote.type
        clonedPost.post.upvotes = addVote.type === 'up' ?
          clonedPost.post.upvotes + 1 : clonedPost.post.upvotes - 1

        clonedPost.post.downvotes = addVote.type === 'down' ?
          clonedPost.post.downvotes + 1 : clonedPost.post.downvotes - 1
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
        variables: { postId },
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
        variables: { postId },
      },
    ],
  })

  const [approvePost] = useMutation(APPROVE_POST, {
    refetchQueries: [
      {
        query: GET_POST,
        variables: { postId },
      },
    ],
  })

  const [rejectPost] = useMutation(REJECT_POST, {
    refetchQueries: [
      {
        query: GET_POST,
        variables: { postId },
      },
    ],
  })
  // const classes = useStyles();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  })

  if (loading) return <PostPageSkeleton />

  if (error) return `Something went wrong: ${error}`

  const { post } = data

  const disableApproveReject = user._id === post.userId
  const disablApprove = post.approvedBy.includes(user._id)
  const disableReject = post.rejectedBy.includes(user._id)

  const handleVoting = async (type) => {
    const vote = {
      // text: selectedText.text,
      postId: data.post._id,
      userId: user._id,
      type,
      startWordIndex: selectedText.startIndex,
      endWordIndex: selectedText.endIndex,
    }
    try {
      await addVote({ variables: { vote } })
      setSnackBar({
        open: true,
        message: 'Voted Successfully',
        color: 'success',
      })
    } catch (err) {
      setSnackBar({
        open: true,
        message: `Vote Error: ${err.message}`,
        color: 'danger',
      })
    }
  }

  const handleAddComment = async (comment, commentWithQuote = false) => {
    let startIndex; let endIndex; let
      quoteText

    // const HASHTAGS_REGEX = /#(\w|\d)+/g
    // const hashtags = comment.match(HASHTAGS_REGEX)

    if (selectedText) {
      startIndex = selectedText.startIndex
      endIndex = selectedText.endIndex
      quoteText = selectedText.text
    } else {
      startIndex = 0
      endIndex = 0
      quoteText = ''
    }

    // TODO: ommit quote props if user did not highlight text
    const newComment = {
      // contentId,
      // creatorId: content.creatorId,
      userId: user._id,
      content: comment,
      startWordIndex: startIndex,
      endWordIndex: endIndex,
      postId,
      url: post.url,
      // hashtags,
      quote: commentWithQuote ? quoteText : '',
    }

    try {
      await addComment({ variables: { comment: newComment } })
      setSnackBar({
        open: true,
        message: 'Commented Successfully',
        color: 'success',
      })
    } catch (err) {
      setSnackBar({
        open: true,
        message: `Comment Error: ${err.message}`,
        color: 'danger',
      })
    }
  }

  const handlePopoverOpen = (event, type) => {
    setAnchorEl(event.currentTarget)
    setButtonType(type)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleApprovePost = async () => {
    if (!disableApproveReject || !disablApprove) {
      try {
        setSnackBar({
          open: true,
          message: 'Approved Post Successfully',
          color: 'success',
        })
        approvePost({ variables: { userId: user._id, postId: post._id } })
      } catch (err) {
        setSnackBar({
          open: true,
          message: `Approve Post Error: ${err.message}`,
          color: 'danger',
        })
      }
    }
  }

  const handleRejectPost = async () => {
    if (!disableApproveReject || !disableReject) {
      try {
        rejectPost({ variables: { userId: user._id, postId: post._id } })
        setSnackBar({
          open: true,
          message: 'Rejected Post Successfully',
          color: 'success',
        })
      } catch (err) {
        setSnackBar({
          open: true,
          message: `Reject Post error: ${err.message}`,
          color: 'danger',
        })
      }
    }
  }

  return (
    <div>
      <GridContainer spacing={1} direction="col">
        <GridItem xs={6}>
          <Card style={{ height: '800px' }}>
            <CardHeader style={{ zIndex: 0 }}>
              <div
                style={{
                  display: 'flex',
                  direction: 'row',
                  justifyContent: 'space-between',
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    direction: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <p
                    style={{
                      color: '#E91E63',
                      fontSize: '25px',
                      font: 'League Spartan',
                      fontWeight: 'bold',
                    }}
                  >
                    {post.title}
                  </p>
                  <img
                    alt=""
                    src={Chat}
                    style={{ height: '20px', paddingLeft: '10px' }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    direction: 'row',
                    justifyContent: 'flex-end',
                    flexBasis: '100px',
                  }}
                >
                  <p>
                    <strong style={{ color: 'green' }}>+</strong>
                    {post.upvotes}
                    /
                    <strong style={{ color: 'red' }}>-</strong>
                    {post.downvotes}
                  </p>
                  <img
                    alt="Send icon"
                    src={Send}
                    style={{
                      height: '15px',
                      paddingLeft: '15px',
                      paddingTop: '3px',
                    }}
                  />
                  <img
                    alt="Heart icon"
                    src={Heart}
                    style={{
                      height: '15px',
                      paddingLeft: '15px',
                      paddingTop: '3px',
                    }}
                  />
                </div>
              </div>
              <Divider />
            </CardHeader>
            <CardBody>
              <VotingBoard
                content={post.text}
                onSelect={setSelectedText}
                selectedText={selectedText}
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
            </CardBody>
            <CardActions>
              <GridContainer spacing={4} justify="center">
                <GridItem>
                  <Button
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onMouseEnter={(e) => handlePopoverOpen(e, 'rejected')}
                    onClick={handleRejectPost}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      opacity: disableApproveReject || disableReject ? 0.65 : 1,
                    }}
                  >
                    { disableReject ? 'REJECTED' : 'REJECT' }
                  </Button>
                </GridItem>
                <GridItem>
                  <Button
                    variant="contained"
                    startIcon={<CheckIcon />}
                    onMouseEnter={(e) => handlePopoverOpen(e, 'approved')}
                    onClick={handleApprovePost}
                    style={{
                      backgroundColor: '#4caf50',
                      color: 'white',
                      opacity: disableApproveReject || disablApprove ? 0.65 : 1,
                    }}
                  >
                    { disablApprove ? 'APPROVED' : 'APPROVE' }
                  </Button>
                </GridItem>
              </GridContainer>
            </CardActions>
          </Card>
        </GridItem>
        <GridItem xs={6} style={{ paddingBottom: 0 }}>
          <Card>
            <CardHeader>
              <div
                style={{
                  display: 'flex',
                  direction: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <p
                  style={{
                    color: '#E91E63',
                    fontSize: '25px',
                    font: 'League Spartan',
                    fontWeight: 'bold',
                  }}
                >
                  Comments
                </p>
              </div>
              <Divider />
            </CardHeader>
          </Card>
          {post.comments
            .sort((a, b) => moment(b.created).diff(moment(a.created)))
            .map((comment, index) => (
              <Card key={`comment-${index}`}>
                <CardBody>
                  <p style={{ fontSize: 12 }}>
                    <span
                      style={{
                        height: 60,
                        width: 60,
                        backgroundColor: '#df2769',
                        float: 'left',
                        margin: '0px 10px 10px 0px',
                        textAlign: 'center',
                        borderRadius: 3,
                        paddingTop: 17,
                      }}
                    >
                      <FaceIcon />
                    </span>
                    <h5 style={{ margin: 0 }}>username</h5>
                    {comment.content}
                  </p>
                </CardBody>
                <CardFooter chart testimonial>
                  <span style={{ float: 'right' }}>
                    {moment(comment.created).format('MM/DD/YYYY hh:mm A')}
                  </span>
                </CardFooter>
              </Card>
            ))}
        </GridItem>
      </GridContainer>
      <ApproveRejectPopover
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
        type={buttonType}
        approvedBy={post.approvedBy}
        rejectedBy={post.rejectedBy}
      />
      <Snackbar
        place="bc"
        color={snackBar.color}
        message={snackBar.message}
        open={snackBar.open}
        closeNotification={() => setSnackBar({ open: false, message: '' })}
        close
      />
    </div>
  )
}

export default PostPage
