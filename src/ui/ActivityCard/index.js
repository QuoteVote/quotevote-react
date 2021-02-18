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
    padding: 0,
  },
  activityHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: theme.typography.pxToRem(20),
    // marginBottom: 10,
    // backgroundColor: (props) => (props.cardColor ? props.cardColor : '#FFF'),
  },
  ActivityActions: {
    backgroundColor: (props) => (props.cardColor ? props.cardColor : '#FFF'),
    height: '100%',
  },
  actionsExpandOpen: {
    height: 7,
  },
  activityBody: {
    marginLeft: theme.typography.pxToRem(20),
    cursor: 'pointer',
    marginBottom: theme.typography.pxToRem(10),
  },
  avatar: {
    cursor: 'pointer',
    margin: theme.typography.pxToRem(10),
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
  cardContent: {
    padding: 0,
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
        <Grid item xs={2}>
          <Avatar>
            <AvatarDisplay
              height="40"
              width="40"
              className={classes.avatarStyle}
              {...avatar}
            />
          </Avatar>
        </Grid>
        <Grid item container direction="column" xs={10}>
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
  post, activityType, upvotes, downvotes,
}) {
  const classes = useStyles()
  const contentLength = width > 500 ? 1000 : 500
  const isPosted = activityType.toUpperCase() === 'POSTED'
  const title = post.title ? stringLimit(post.title, isPosted ? 1000 : 100) : ''
  return (
    <Grid container direction="column">
      <Grid item xs={12} container="row">
        <Grid item xs={3}>
          <Typography variant="caption">{`+${upvotes} / -${downvotes}`}</Typography>
        </Grid>
        <Grid item xs={9} onClick={onCardClick}>
          <Typography className={classes.activityBody} variant="subtitle2">
            <b>
              {title}
            </b>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.activityBody} variant="body1">
          &quot;
          {content.length > 1000 ?
            `${content.slice(0, contentLength)}...` :
            content}
          &quot;
        </Typography>
      </Grid>
      <Grid container alignItems="center" direction="row" item xs={12}>
        <Grid item xs={1}>
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
        </Grid>
        <Grid item alignItems="center" justify="space-evenly" container="row" xs={7}>
          <Typography variant="body1">
            {`${name}`}
          </Typography>
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
        <Grid item xs={4}>
          <Typography color="textPrimary" variant="subtitle2">
            Group Name?
          </Typography>
        </Grid>
      </Grid>
    </Grid>
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
  upvotes: PropTypes.string,
  downvotes: PropTypes.string,
}

function ActivityActions({
  liked, onLike, handleExpandClick, expanded,
}) {
  const classes = useStyles()
  return (
    <Grid container justify="flex-end" direction="row">
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
    </Grid>
  )
}

ActivityActions.propTypes = {
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
        <CardContent className={classes.cardContent}>
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
              upvote={upvotes}
              downvotes={downvotes}
            />
          </Collapse>
        </CardContent>
        <CardActions
          className={clsx(classes.ActivityActions, {
            [classes.actionsExpandOpen]: expanded,
          })}
          disableSpacing
        >
          <Grid container direction="row" justify="space-between">
            <Grid item xs={11}>
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
            </Grid>
            <Grid item xs={1}>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
          </Grid>
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
