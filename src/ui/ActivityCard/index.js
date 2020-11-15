/**
 *
 * ActivityCard
 *
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { loadCSS } from 'fg-loadcss'

import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.typography.pxToRem(350),
    padding: theme.typography.pxToRem(11),
    maxHeight: theme.typography.pxToRem(140),
    borderRadius: '6px',
    backgroundColor: (props) => (props.cardColor ? props.cardColor : '#FFF'),
    width: (props) => (props.width ? props.width : '100%'),
  },
  activityHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: theme.typography.pxToRem(20),
  },
  activityBody: {
    marginLeft: theme.typography.pxToRem(20),
  },
}))

function ActivityHeader({ name, date }) {
  const classes = useStyles()
  return (
    <div className={classes.activityHeader}>
      <Typography color="textPrimary" variant="subtitle2">
        {name}
      </Typography>
      <Typography color="textPrimary" variant="caption">
        {date}
      </Typography>
    </div>
  )
}

ActivityHeader.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
}

function ActivityContent({
  name, date, content, avatar, width,
}) {
  const classes = useStyles()
  const contentLength = width > 350 ? 500 : 100

  return (
    <Box display="flex">
      <Avatar alt="profile" src={avatar} />
      <Box flexGrow={1}>
        <ActivityHeader name={name} date={date} />
        <Typography className={classes.activityBody} variant="body1">
          {content.length > 100 ?
            `${content.slice(0, contentLength)}...` :
            content}
        </Typography>
      </Box>
    </Box>
  )
}

ActivityContent.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  avatar: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  width: PropTypes.number,
}

function ActivityActions({
  upvotes, downvotes, liked, onLike,
}) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="caption">{`+${upvotes} / -${downvotes}`}</Typography>
      <IconButton onClick={(e) => onLike(liked, e)} style={{ padding: 0 }}>
        {liked ? (
          <Icon className="far fa-heart" />
        ) : (
          <Icon className="fas fa-heart" />
        )}
      </IconButton>
    </Box>
  )
}

ActivityActions.propTypes = {
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  liked: PropTypes.bool,
  onLike: PropTypes.func,
}

export const ActivityCard = memo(
  ({
    avatar = '',
    cardColor,
    name = 'Username',
    date = 'Today @ 3:35PM',
    content = '',
    upvotes = 0,
    downvotes = 0,
    liked = false,
    width,
    onLike = () => {},
  }) => {
    React.useEffect(() => {
      const node = loadCSS(
        'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      )

      return () => {
        node.parentNode.removeChild(node)
      }
    }, [])

    const classes = useStyles({ cardColor, width })
    return (
      <Card className={classes.root}>
        <ActivityContent
          name={name}
          date={date}
          content={content}
          avatar={avatar}
        />
        <ActivityActions
          upvotes={upvotes}
          downvotes={downvotes}
          liked={liked}
          onLike={onLike}
        />
      </Card>
    )
  },
)

ActivityCard.propTypes = {
  avatar: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  content: PropTypes.string,
  cardColor: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  liked: PropTypes.bool,
  width: PropTypes.number,
  onLike: PropTypes.func,
}
