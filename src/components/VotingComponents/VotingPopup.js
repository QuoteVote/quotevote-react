/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'

import {
  Paper,
  Input,
  InputAdornment,
  IconButton,
  Button,
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
  paperExpaned: {
    margin: theme.spacing(1),
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 33,
    width: 310,
    position: 'absolute',
    top: 55,
  },
  icon: { fontSize: 40 },
  input: { color: '#3c4858cc', padding: 10 },
  inputCentered: { textAlign: 'center' },
  button: {
    backgroundImage: 'linear-gradient(to top, #1bb6d8, #4066ec)',
    color: 'white',
  },
}))

const VotingPopup = ({
  votedBy, onVote, onAddComment, onAddQuote, selectedText,
}) => {
  const classes = useStyles()
  const { user } = useSelector((state) => state)
  const [expand, setExpand] = useState({ open: false, type: '' })
  const [comment, setComment] = useState('')

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
  const handleVote = (type) => {
    onVote(type)
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
          backgroundColor: '#00bcd4',
          width: 285,
          zIndex: 1,
          top: expand.open ? 31 : 20,
          left: 20,
          position: 'absolute',
        }}
      >
        <Grid container>
          <Grid item xs={3}>
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
          <Grid item xs={3}>
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
          <Grid item xs={3}>
            <IconButton onClick={() => setExpand({ open: expand.type !== 'comment' || !expand.open, type: 'comment' })}>
              <SvgIcon
                component={CommentIcon}
                fontSize="large"
                viewBox="0 0 30 30"
              />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={handleAddQuote}>
              <SvgIcon
                component={QuoteIcon}
                fontSize="large"
                viewBox="0 0 25 15"
              />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      <Zoom in={expand.open}>
        <Paper id="popButtons" elevation={4} className={classes.paperExpaned}>
          <Input
            placeholder="Type comment here"
            className={classes.input}
            classes={{ input: expand.type === 'up' && classes.inputCentered }}
            endAdornment={(
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  className={classes.button}
                  size="small"
                  onClick={() => isComment ? handleAddComment() : handleVote(expand.type)}
                >
                  {isComment ? 'Send' : 'Vote'}
                </Button>
              </InputAdornment>
            )}
            value={inputValue}
            onChange={(e) => setComment(e.target.value)}
            readOnly={!isComment}
            disableUnderline={!isComment}
            fullWidth
            autoFocus
          />
        </Paper>
      </Zoom>
    </>
  )
}

export default VotingPopup
