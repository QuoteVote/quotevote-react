import React from 'react'
import {
  Card, CardActions, CardContent, CardHeader, IconButton,
} from '@material-ui/core'
import { InsertEmoticon, InsertLink } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import AvatarDisplay from '../Avatar'
import { parseCommentDate } from '../../utils/momentUtils'
import { SET_FOCUSED_COMMENT } from '../../store/ui'

const useStyles = makeStyles(() => ({
  content: {
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
    user, content, created,
  } = comment
  const { username, avatar } = user
  const classes = useStyles()
  const parsedDate = parseCommentDate(created)
  const dispatch = useDispatch()

  return (
    <Card
      onMouseEnter={() => dispatch(SET_FOCUSED_COMMENT(comment))}
      onMouseLeave={() => dispatch(SET_FOCUSED_COMMENT(null))}
    >
      <CardHeader
        avatar={(
          <IconButton>
            <AvatarDisplay height={40} width={40} {...avatar} />
          </IconButton>
        )}
        subheader={`@${username}`}
        action={<div className={classes.created}><span>{parsedDate}</span></div>}
      />
      <CardContent
        className={classes.content}
      >
        <p>
          {content}
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
