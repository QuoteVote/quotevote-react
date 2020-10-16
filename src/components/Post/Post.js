import React from 'react'
import {
  Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BlockIcon from '@material-ui/icons/Block'
import LinkIcon from '@material-ui/icons/Link'
import {
  Comment, Favorite, PersonAdd, ThumbDown, ThumbUp,
} from '@material-ui/icons'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  root: {
  },
  header1: {
    padding: 0,
  },
  header2: {
    padding: 0,
  },
  title: {
    color: 'green',
    marginRight: 5,
    marginLeft: 20,
    fontFamily: 'Montserrat',
  },
  blockIcon: {
    color: 'red',
  },
  avatar: {
    marginLeft: 20,
  },
  upVote: {
    color: 'green',
  },
  downVote: {
    color: 'red',
  },
  points: {
    marginTop: 20,
    marginRight: 20,
    fontSize: 22,
    fontWeight: 'bolder',
    fontFamily: 'Roboto-Bold',
  },
  content: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.5px',
  },
  expand: {
    marginLeft: 'auto',
  },
  button: {
    margin: 10,
  },
}))

function Post({ post }) {
  const classes = useStyles()
  const {
    title, user, upvotes, downvotes, created, text, avatar,
  } = post
  const { name } = user

  const cardTitle = (
    <div>
      <span className={classes.title}>{title}</span>
      <IconButton>
        <LinkIcon />
      </IconButton>
      <IconButton>
        <BlockIcon className={classes.blockIcon} />
      </IconButton>
    </div>
  )

  const pointsHeader = (
    <div className={classes.points}>
      <span className={classes.upVote}>
        +
        {upvotes}
      </span>
      <span>
        {' '}
        /
        {' '}
      </span>
      <span className={classes.downVote}>
        -
        {downvotes}
      </span>
    </div>
  )

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header1} title={cardTitle} action={pointsHeader} />
      <CardHeader
        className={classes.header2}
        avatar={(
          <Avatar aria-label="recipe" className={classes.avatar}>
            {avatar}
          </Avatar>
        )}
        title={name}
        subheader={created}
      />
      <CardContent>
        <p className={classes.content}>
          {text}
        </p>
      </CardContent>

      <CardActions disableSpacing>

        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={
            <ThumbUp />
          }
        >
          APPROVE
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          startIcon={
            <ThumbDown />
          }
        >
          REJECT
        </Button>
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
    </Card>

  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
