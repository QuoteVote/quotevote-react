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
} from '@material-ui/core'
import {
  Up, Down, Comment, Quote,
} from 'components/Icons'
import { isEmpty, findIndex } from 'lodash'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  paperCollapsed: {
    margin: theme.spacing(1),
    backgroundColor: 'black',
    padding: 10,
    paddingTop: 33,
    height: 90,
    width: 290,
    zIndex: 1,
  },
  paperExpaned: {
    margin: theme.spacing(1),
    backgroundColor: 'black',
    padding: 10,
    paddingTop: 33,
    height: 90,
    position: 'absolute',
    top: 55,
  },
  icon: { fontSize: 40 },
  input: { color: 'white', padding: 10 },
  button: {
    backgroundColor: '#df2769',
    color: 'white',
  },
}))

const VotingPopup = ({
  votedBy, onVote, onAddComment, selectedText,
}) => {
  const classes = useStyles()
  const { user } = useSelector((state) => state)
  const [expand, setExpand] = useState(false)
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
  }

  const handleAddComment = () => {
    const withQuote = !isEmpty(selectedText.text)
    onAddComment(comment, withQuote)
    /* setTimeout(() => { this.setState({ isCommenting: false })}, 500) */
    setComment('')
  }

  useEffect(() => {
    const selectionPopover = document.querySelector('#popButtons')
    selectionPopover.addEventListener('mousedown', (e) => {
      e.preventDefault()
    })
  })

  return (
    <>
      <Zoom in={!expand}>
        <Paper
          id="popButtons"
          elevation={4}
          className={classes.paperCollapsed}
        />
      </Zoom>
      <Paper
        style={{
          backgroundColor: '#df2769',
          width: 266,
          zIndex: 1,
          top: expand ? 31 : 20,
          left: 20,
          position: 'absolute',
        }}
      >
        {showUpvoteTooltip ? (
          <Tooltip title="Upvoted" placement="bottom" arrow>
            <IconButton>
              <Up
                width="419.000000pt"
                height="419.000000pt"
                viewBox="0 0 419.000000 419.000000"
                className={classes.icon}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton onClick={() => handleVote('up')}>
            <Up
              width="419.000000pt"
              height="419.000000pt"
              viewBox="0 0 419.000000 419.000000"
              className={classes.icon}
            />
          </IconButton>
        )}
        {showDownvoteTooltip ? (
          <Tooltip title="Downvoted" placement="bottom" arrow>
            <IconButton>
              <Down
                width="563.000000pt"
                height="563.000000pt"
                viewBox="0 0 563.000000 563.000000"
                className={classes.icon}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton onClick={() => handleVote('down')}>
            <Down
              width="563.000000pt"
              height="563.000000pt"
              viewBox="0 0 563.000000 563.000000"
              className={classes.icon}
            />
          </IconButton>
        )}
        <IconButton onClick={() => setExpand(!expand)}>
          <Comment
            width="598.000000pt"
            height="598.000000pt"
            viewBox="0 0 598.000000 598.000000"
            className={classes.icon}
          />
        </IconButton>
        <IconButton>
          <Quote
            width="607.000000pt"
            height="605.000000pt"
            viewBox="0 0 607.000000 605.000000"
            className={classes.icon}
          />
        </IconButton>
      </Paper>
      <Zoom in={expand}>
        <Paper id="popButtons" elevation={4} className={classes.paperExpaned}>
          <Input
            placeholder="TYPE COMMENT HERE"
            className={classes.input}
            endAdornment={(
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  className={classes.button}
                  size="small"
                  onClick={handleAddComment}
                >
                  SEND
                </Button>
              </InputAdornment>
            )}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Paper>
      </Zoom>
    </>
  )
}

export default VotingPopup
