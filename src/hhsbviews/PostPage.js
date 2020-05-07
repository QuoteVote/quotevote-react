/* eslint-disable prefer-destructuring */
// import { getThemeProps } from '@material-ui/styles';
// import Accordion from 'mui-pro/Accordion/Accordion.js';
// import Badge from 'mui-pro/Badge/Badge.js';
// import Box from '@material-ui/core/Box';
// import Button from 'mui-pro/CustomButtons/Button.js'
import Card from 'mui-pro/Card/Card.js'
import CardBody from 'mui-pro/Card/CardBody.js'
import CardFooter from 'mui-pro/Card/CardFooter.js'
import CardHeader from 'mui-pro/Card/CardHeader.js'
import Divider from '@material-ui/core/Divider'
import GridContainer from 'mui-pro/Grid/GridContainer.js'
import GridItem from 'mui-pro/Grid/GridItem.js'

// import NavPills from 'mui-pro/NavPills/NavPills.js';
import VotingBoard from 'hhsbComponents/VotingComponents/VotingBoard.js'
import VotingPopup from 'hhsbComponents/VotingComponents/VotingPopup.js'
import React, { useState } from 'react'

// import Content from '../hhsbComponents/ContentList.js';
import Chat from '../hhsbAssets/Chat.svg'
import Heart from '../hhsbAssets/Heart.svg'
import Send from '../hhsbAssets/Send.svg'

// import styles from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle.js';

import FaceIcon from '@material-ui/icons/Face'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'

import PostPageSkeleton from 'hhsbviews/Skeletons/PostPageSkeleton'
import { useSelector } from 'react-redux'
import { cloneDeep, findIndex } from 'lodash'

import { GET_POST, GET_TOP_POSTS } from 'graphql/query'
import { VOTE, ADD_COMMENT } from 'graphql/mutations'

const PostPage = () => {
  // const url = window.location.href
  // const urlSegment = url.split('/')
  // const domain = urlSegment[5]
  // const contentId = urlSegment[6]

  const [selectedText, setSelectedText] = useState('')
  const { user } = useSelector((state) => state.loginReducer)
  const { id: postId } = useSelector((state) => state.postReducer.selectedPost)
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
      
      const index = findIndex(clonedPost.post.votedBy, vote => vote.userId === user._id)
      if (index !== -1) {
        clonedPost.post.votedBy[index].type = addVote.type
        clonedPost.post.upvotes = addVote.type === 'up' ? 
          clonedPost.post.upvotes + 1 : clonedPost.post.upvotes - 1
        
        clonedPost.post.downvotes = addVote.type === 'down' ? 
          clonedPost.post.downvotes + 1 : clonedPost.post.downvotes - 1
      } else {
        clonedPost.post.votedBy.push({ type: addVote.type, userId: user._id })
        if (addVote.type === 'up') {
          clonedPost.post.upvotes = clonedPost.post.upvotes + 1
        } else {
          clonedPost.post.downvotes = clonedPost.post.downvotes + 1
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
      }
    ],
  })
  // const classes = useStyles();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  })

  if (loading) return <PostPageSkeleton />

  if (error) return `Something went wrong: ${error}`

  const { post } = data;

  const handleVoting = async (type) => {
    const vote = {
      // text: selectedText.text,
      postId: data.post._id,
      userId: user._id,
      type,
      startWordIndex: selectedText.startIndex,
      endWordIndex: selectedText.endIndex,
    }
    addVote({ variables: { vote } })
  }

  const handleAddComment = (comment, commentWithQuote = false) => {
    let startIndex, endIndex, quoteText

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

    addComment({ variables: { comment: newComment } })
  }

  return (
    <div>
      <GridContainer spacing={1} direction='col'>
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
                    alt=''
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
                    {post.upvotes}/
                    <strong style={{ color: 'red' }}>-</strong>
                    {post.downvotes}
                  </p>
                  <img
                    alt='Send icon'
                    src={Send}
                    style={{
                      height: '15px',
                      paddingLeft: '15px',
                      paddingTop: '3px',
                    }}
                  />
                  <img
                    alt='Heart icon'
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
    </div>
  )
}

export default PostPage
