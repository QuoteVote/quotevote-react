/**
 *
 * ActivityCard
 *
 */
import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { loadCSS } from 'fg-loadcss'

import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import moment from 'moment'
import stringLimit from 'string-limit'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AvatarDisplay from '../../components/Avatar'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.typography.pxToRem(350),
    // minHeight: theme.typography.pxToRem(200),
    borderRadius: '6px',
    backgroundColor: 'white',
    width: (props) => (props.width ? props.width : '100%'),
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      minWidth: '100%',
      width: '100%',
    },
  },
  activityHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: theme.typography.pxToRem(20),
    marginBottom: 10,
    // backgroundColor: (props) => (props.cardColor ? props.cardColor : '#FFF'),
  },
  ActivityActions: {
    backgroundColor: (props) => (props.cardColor ? props.cardColor : '#FFF'),
  },
  activityBody: {
    marginLeft: theme.typography.pxToRem(20),
    cursor: 'pointer',
    marginBottom: theme.typography.pxToRem(10),
  },
  avatar: {
    cursor: 'pointer',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  content: {
    minHeight: theme.typography.pxToRem(130),
    backgroundColor: 'white',
  },
}))

function ActivityHeader({
  name,
  date,
  title,
  avatar,
}) {
  const classes = useStyles()
  return (
    <div className={classes.activityHeader}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Avatar
            className={classes.avatar}
          >
            <AvatarDisplay
              height="40"
              width="40"
              className={classes.avatarStyle}
              {...avatar}
            />
          </Avatar>
        </Grid>
        <Grid item container direction="column" xs={8}>
          <Grid item xs={12}>
            <Typography color="textPrimary" variant="subtitle2">
              {title}
            </Typography>
          </Grid>
          <Grid item container direction="row" xs={12}>
            <Grid item xs={6}>
              <Typography color="textPrimary" variant="body">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="textPrimary" variant="caption">
                {moment(date).calendar(null, {
                  sameDay: '[Today]',
                  nextDay: '[Tomorrow]',
                  nextWeek: 'dddd',
                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd',
                  sameElse: 'MMM DD, YYYY',
                })}
                {` @ ${moment(date).format('h:mm A')}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

ActivityHeader.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  avatar: PropTypes.object,
  title: PropTypes.string,
}

function ActivityContent({
  name, date, content, avatar, width, handleRedirectToProfile, username, onCardClick,
  post, activityType,
}) {
  const classes = useStyles()
  const contentLength = width > 500 ? 1000 : 500
  const isPosted = activityType.toUpperCase() === 'POSTED'
  const title = post.title ? stringLimit(post.title, isPosted ? 1000 : 100) : ''
  return (
    <Box display="flex" className={classes.content}>
      <Avatar
        onClick={() => handleRedirectToProfile(username)}
        className={classes.avatar}
      >
        <AvatarDisplay
          height="40"
          width="40"
          className={classes.avatarStyle}
          {...avatar}
        />
      </Avatar>
      <Box flexGrow={1} onClick={onCardClick}>
        <ActivityHeader name={name} date={date} title={title} avatar={avatar} />
        {isPosted && (
          <Typography className={classes.activityBody} variant="body1">
            <b>
              {title}
            </b>
          </Typography>
        )}
        {!isPosted && (
          <Typography className={classes.activityBody} variant="body1">
            <b>
              {activityType.toUpperCase()}
            </b>
            {' on '}
            <i>
              {title}
            </i>
          </Typography>
        )}
        <Typography className={classes.activityBody} variant="body1">
          &quot;
          {content.length > 1000 ?
            `${content.slice(0, contentLength)}...` :
            content}
          &quot;
        </Typography>
      </Box>
    </Box>
  )
}

ActivityContent.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  avatar: PropTypes.any,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']),
  handleRedirectToProfile: PropTypes.func,
  onCardClick: PropTypes.func,
  post: PropTypes.object,
  activityType: PropTypes.string,
}

function ActivityActions({
  upvotes, downvotes, liked, onLike, handleExpandClick, expanded,
}) {
  const classes = useStyles()
  return (
    <>
      <Typography variant="caption">{`+${upvotes} / -${downvotes}`}</Typography>
      <IconButton
        onClick={(e) => onLike(liked, e)}
        className={classes.expand}
      >
        {liked ? (
          <BookmarkIcon />
        ) : (
          <BookmarkBorderIcon />
        )}
      </IconButton>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </>
  )
}

ActivityActions.propTypes = {
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  liked: PropTypes.bool,
  onLike: PropTypes.func,
  handleExpandClick: PropTypes.func,
  expanded: PropTypes.bool,
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
    onCardClick = () => {},
    handleRedirectToProfile = () => {},
    username,
    post = {},
    activityType = '',
  }) => {
    React.useEffect(() => {
      const node = loadCSS(
        'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
        document.querySelector('#font-awesome-css')
      )

      return () => {
        node.parentNode.removeChild(node)
      }
    }, [])

    const classes = useStyles({ cardColor, width })
    const [expanded, setExpanded] = useState(false)

    // const handleExpandClick = () => {
    //   console.log('handleExpandClick', expanded)
    //   setExpanded(!expanded)
    // }
    return (
      <Card className={classes.root}>
        <CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <ActivityContent
              name={name}
              date={date}
              content={content}
              avatar={avatar}
              username={username}
              handleRedirectToProfile={handleRedirectToProfile}
              onCardClick={onCardClick}
              post={post}
              activityType={activityType}
            />
          </Collapse>
        </CardContent>
        <CardActions className={classes.ActivityActions} disableSpacing>
          {
            !expanded && (
              <ActivityHeader
                name={name}
                date={date}
                content={content}
                avatar={avatar}
                username={username}
                handleRedirectToProfile={handleRedirectToProfile}
                onCardClick={onCardClick}
                post={post}
                activityType={activityType}
                title={post.title}
              />
            )
          }
          <ActivityActions
            upvotes={upvotes}
            downvotes={downvotes}
            liked={liked}
            onLike={onLike}
            handleExpandClick={() => setExpanded(!expanded)}
            expanded={expanded}
          />
        </CardActions>
      </Card>
    )
  }
)

ActivityCard.propTypes = {
  avatar: PropTypes.any,
  content: PropTypes.string,
  cardColor: PropTypes.string,
  name: PropTypes.string,
  username: PropTypes.string,
  date: PropTypes.string,
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  liked: PropTypes.bool,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']),
  onLike: PropTypes.func,
  onCardClick: PropTypes.func,
  handleRedirectToProfile: PropTypes.func,
  post: PropTypes.object,
  activityType: PropTypes.string,
}
