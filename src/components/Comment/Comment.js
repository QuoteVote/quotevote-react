import React from 'react'
import {
  Avatar, Card, CardActions, CardContent, CardHeader, IconButton,
} from '@material-ui/core'
import { InsertEmoticon, InsertLink } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  content: {
    padding: 0,
    marginLeft: 60,
    marginRight: 40,
    marginTop: -20,
    marginBottom: -20,
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

function Comment({ comment }) {
  const {
    avatar, user, text, created,
  } = comment
  const { username } = user
  const classes = useStyles()
  return (
    <Card>
      <CardHeader
        avatar={(
          <Avatar aria-label="recipe" className={classes.avatar}>
            {avatar}
          </Avatar>
        )}
        subheader={`@${username}`}
        action={<div className={classes.created}><span>{created}</span></div>}
      />
      <CardContent
        className={classes.content}
      >
        <p>
          {text}
        </p>
      </CardContent>
      <CardActions disableSpacing>
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

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment
