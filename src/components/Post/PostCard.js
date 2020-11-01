import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { CardHeader, IconButton } from '@material-ui/core'
import Card from 'mui-pro/Card/Card'
import classNames from 'classnames'
import ClearIcon from '@material-ui/icons/Clear'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SELECTED_POST } from 'store/ui'
import { useHistory } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AvatarDisplay from 'components/Avatar'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import stringLimit from 'string-limit'
import withWidth from '@material-ui/core/withWidth'

const useStyles = makeStyles((theme) => ({
  cardRootStyle: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
    borderRadius: 7,
    boxShadow: '10px 7px 10px 0 rgba(0, 188, 212, 0.4), 0 4px 20px 0 rgba(0, 0, 0, 0.14)',
  },
  postedBg: {
    backgroundColor: theme.activityCards.posted.color,
    color: theme.activityCards.posted.fontColor,
  },
  commentedBg: {
    backgroundColor: theme.activityCards.commented.color,
    color: theme.activityCards.commented.fontColor,
  },
  upVotedBg: {
    backgroundColor: theme.activityCards.upvote.color,
    color: theme.activityCards.upvote.fontColor,
  },
  downVotedBg: {
    backgroundColor: theme.activityCards.downvote.color,
    color: theme.activityCards.downvote.fontColor,
  },
  likedPostBg: {
    backgroundColor: theme.activityCards.hearted.color,
    color: theme.activityCards.hearted.fontColor,
  },
  quotedPostBg: {
    backgroundColor: theme.activityCards.quoted.color,
    color: theme.activityCards.quoted.fontColor,
  },
  cardHeaderStyle: {
    paddingBottom: 0,
    paddingTop: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  cardBodyStyle: {
    marginLeft: 65,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    color: '#000000',
  },
  iconButton: {
    color: '#000000',
  },
  username: {
    font: 'Roboto',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#000000',
    whiteSpace: 'nowrap',
    padding: 0,
    top: 16,
  },
  dateTime: {
    opacity: 0.8,
    font: 'Roboto',
    fontSize: '10px',
    color: '#000000',
    padding: 0,
  },
  postTitle: {
    font: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  rankNumber: {
    font: 'Roboto',
    fontSize: 96,
    fontWeight: 'bold',
    color: 'grey',
    top: 0,
    right: 35,
  },
  postContent: {
    font: 'Roboto',
    fontSize: 12,
    fontWeight: 300,
    color: '#000000',
  },
  votes: {
    height: 12,
    font: 'Roboto',
    fontSize: 10,
    fontWeight: 500,
    color: '#000000',
  },
  bookmark: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  fontColor: {
    color: '#000000',
  },
}))

const getCardBg = (activityType = 'POSTED') => {
  switch (activityType.toUpperCase()) {
    case 'POSTED':
      return 'postedBg'
    case 'COMMENTED':
      return 'commentedBg'
    case 'UPVOTED':
      return 'upVotedBg'
    case 'DOWNVOTED':
      return 'downVotedBg'
    case 'LIKED':
      return 'likedPostBg'
    case 'QOUTED':
      return 'quotedPostBg'
    default:
      return 'postedBg'
  }
}

function PostCard(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user.data)
  const classes = useStyles(props)
  const { width } = props
  const {
    _id, text, title, upvotes, downvotes, url, bookmarkedBy, created, onHidePost, onBookmark, creator,
    activityType,
  } = props
  const isBookmarked = bookmarkedBy && bookmarkedBy.includes(user._id)
  const cardBg = getCardBg(activityType)
  const postTitleStringLimit = width === 'xs' ? 25 : 50
  return (
    <Card className={classNames(classes.cardRootStyle, classes[cardBg], classes.fontColor)}>
      <CardHeader
        avatar={(
          <IconButton size="small">
            <Avatar>
              <AvatarDisplay
                height="40"
                width="40"
                className={classes.avatarStyle}
                {...creator.avatar}
              />
            </Avatar>
          </IconButton>
        )}
        action={(
          <IconButton
            onClick={() => onHidePost(props)}
            classes={{ root: classes.iconButton }}
            style={{ paddingLeft: 0 }}
          >
            <ClearIcon />
          </IconButton>
        )}
        title={(
          <Typography className={classes.username}>
            {creator ? creator.name : 'Anonymous'}
          </Typography>
        )}
        subheader={(
          <Typography className={classes.dateTime}>
            {moment(created).calendar(null, {
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              nextWeek: 'dddd',
              lastDay: '[Yesterday]',
              lastWeek: '[Last] dddd',
              sameElse: 'MMM DD, YYYY',
            })}
            {` @ ${moment(created).format('h:mm A')}`}
          </Typography>
        )}
        className={classes.cardHeaderStyle}
      />
      <CardContent className={classes.cardBodyStyle}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography
              className={classes.postTitle}
              onClick={() => {
                // add post id to redux state
                dispatch(SET_SELECTED_POST(_id))
                history.push(url)
              }}
            >
              {stringLimit(title, props.limitText ? 20 : postTitleStringLimit)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.postContent}>
              {stringLimit(text, props.limitText ? 20 : 10000)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={classes.votes}>
              {`+${upvotes}  `}
              |
              {` -${downvotes}`}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              classes={{ root: classes.iconButton }}
              className={classes.bookmark}
              onClick={() => onBookmark(_id)}
            >
              {isBookmarked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
PostCard.defaults = {
  activityType: 'POSTED',
}

PostCard.propTypes = {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  bookmarkedBy: PropTypes.array.isRequired,
  created: PropTypes.string.isRequired,
  onHidePost: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  creator: PropTypes.any,
  activityType: PropTypes.string.isRequired,
  avatar: PropTypes.object,
  width: PropTypes.any,
  limitText: PropTypes.bool,
}

export default withWidth()(PostCard)
