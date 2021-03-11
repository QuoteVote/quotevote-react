/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'

import {
  Paper,
  Input,
  InputAdornment,
  IconButton,
  Button,
  ButtonGroup,
  Zoom,
  Tooltip,
  SvgIcon,
  Grid,
} from '@material-ui/core'
import { isEmpty, findIndex } from 'lodash'
import { useSelector } from 'react-redux'
import { ReactComponent as DislikeIcon } from '../../assets/svg/Dislike.svg'
import { ReactComponent as LikeIcon } from '../../assets/svg/Like.svg'
import { ReactComponent as CommentIcon } from '../../assets/svg/Comment.svg'
import { ReactComponent as QuoteIcon } from '../../assets/svg/Quote.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paperExpaned: {
    margin: theme.spacing(1),
    backgroundColor: 'white',
    padding: '33px 15px 10px 15px',
    width: 310,
    position: 'absolute',
    top: 205,
  },
  icon: { fontSize: 40 },
  input: {
    color: '#3c4858cc',
    paddingBottom: 1,
    '&::before': {
      pointerEvents: 'auto',
    },
  },
  button: {
    backgroundColor: '#00cf6e',
    color: 'white',
  },
  btnGroup: {
    textTransform: 'none',
  },
}))

const VotingPopup = ({
  votedBy, onVote, onAddComment, onAddQuote, selectedText,
}) => {
  const classes = useStyles()
  const { user } = useSelector((state) => state)
  const [expand, setExpand] = useState({ open: false, type: '' })
  const [comment, setComment] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [checkWindowWidth, setCheckWindowWidth] = useState(true)

  const handleWindowSizeChange = () => {
    setWindowWidth(window.innerWidth)
    if (window.innerWidth < 400) {
      setCheckWindowWidth(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  let voteOptions = []

  if (expand.type === 'up') {
    voteOptions = ['#true', '#agree', '#like']
  }

  if (expand.type === 'down') {
    voteOptions = ['#false', '#disagree', '#dislike']
  }

  let showUpvoteTooltip = false
  let showDownvoteTooltip = false
  const index = findIndex(votedBy, (vote) => vote.userId === user._id)
  if (index !== -1) {
    if (votedBy[index].type === 'up') {
      showUpvoteTooltip = true
    } else {
      showDownvoteTooltip = true
    }
  }
  const handleVote = (tags) => {
    onVote({ type: expand.type, tags })
    setExpand({ open: false, type: '' })
  }

  const handleAddComment = () => {
    const withQuote = !isEmpty(selectedText.text)
    onAddComment(comment, withQuote)
    /* setTimeout(() => { this.setState({ isCommenting: false })}, 500) */
    setComment('')
    setExpand({ open: false, type: '' })
  }

  const handleAddQuote = () => {
    onAddQuote()
    setExpand({ open: false, type: '' })
  }

  useEffect(() => {
    const selectionPopover = document.querySelector('#popButtons')
    selectionPopover.addEventListener('mousedown', (e) => {
      e.preventDefault()
    })
  })

  let inputValue = comment

  const isComment = expand.type === 'comment'

  if (!isComment) {
    if (expand.type === 'up') {
      inputValue = '#true | #agree | #like'
    } else {
      inputValue = '#false | #disagree | #dislike'
    }
  }

  return (
    <>
      <Paper
        style={{
          backgroundImage: 'linear-gradient(to top, #1bb5d8, #4066ec)',
          width: checkWindowWidth ? 285 : 240,
          zIndex: 1,
          top: expand.open ? 181 : 170,
          left: 20,
          position: 'absolute',
        }}
      >
        <Grid container>
          <Grid item xs={3} style={{ backgroundColor: expand.type === 'up' ? '#2475b0' : 'transparent' }}>
            {showUpvoteTooltip ? (
              <Tooltip title="Upvoted" placement="bottom" arrow>
                <IconButton>
                  <SvgIcon
                    component={LikeIcon}
                    fontSize="large"
                    viewBox="0 0 30 30"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton onClick={() => setExpand({ open: expand.type !== 'up' || !expand.open, type: 'up' })}>
                <SvgIcon
                  component={LikeIcon}
                  fontSize="large"
                  viewBox="0 0 30 30"
                />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={3} style={{ backgroundColor: expand.type === 'down' ? '#2475b0' : 'transparent' }}>
            {showDownvoteTooltip ? (
              <Tooltip title="Downvoted" placement="bottom" arrow>
                <IconButton>
                  <SvgIcon
                    component={DislikeIcon}
                    fontSize="large"
                    viewBox="0 0 30 30"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton onClick={() => setExpand({ open: expand.type !== 'down' || !expand.open, type: 'down' })}>
                <SvgIcon
                  component={DislikeIcon}
                  fontSize="large"
                  viewBox="0 0 30 30"
                />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={3} style={{ backgroundColor: expand.type === 'comment' ? '#2475b0' : 'transparent' }}>
            <IconButton onClick={() => setExpand({ open: expand.type !== 'comment' || !expand.open, type: 'comment' })}>
              <SvgIcon
                component={CommentIcon}
                fontSize="large"
                viewBox="0 0 30 30"
              />
            </IconButton>
          </Grid>
          <Grid item xs={3} style={{ backgroundColor: expand.type === 'quote' ? '#2475b0' : 'transparent' }}>
            <IconButton
              onClick={() => {
                const newQuote = expand.type !== 'quote'
                setExpand({ open: false, type: newQuote ? 'quote' : '' })
                if (newQuote) {
                  handleAddQuote()
                }
              }}
            >
              <SvgIcon
                component={QuoteIcon}
                fontSize="large"
                viewBox="0 0 25 15"
                htmlColor="white"
              />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      <Zoom in={expand.open}>
        <Paper id="popButtons" elevation={4} className={classes.paperExpaned}>
          {isComment ? (
            <Input
              placeholder="Type comment here"
              className={classes.input}
              endAdornment={(
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    className={classes.button}
                    size="small"
                    onClick={handleAddComment}
                  >
                    Send
                  </Button>
                </InputAdornment>
              )}
              value={inputValue}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleAddComment()
                }
              }}
            />
          ) : (
            <div className={classes.root}>
              <ButtonGroup variant="text" color="red" size="small">
                {voteOptions.map((option) => <Button key={option} className={classes.btnGroup} onClick={() => handleVote(option)}>{option}</Button>)}
              </ButtonGroup>
            </div>
          )}
        </Paper>
      </Zoom>
    </>
  )
}

export default VotingPopup
