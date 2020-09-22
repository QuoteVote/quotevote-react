import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { IconButton, CardHeader } from '@material-ui/core'

import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'
import classNames from 'classnames'
import ClearIcon from '@material-ui/icons/Clear'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SELECTED_POST } from 'store/ui'
import { useHistory } from 'react-router-dom'
import stringLimit from 'string-limit'
import FavoriteIcon from '@material-ui/icons/Favorite'
import CardFooter from 'mui-pro/Card/CardFooter'
import ProfilePicture from '../assets/img/ProfilePicture.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: (props) => props.color,
    minHeight: '75px',
    display: 'flex',
    color: 'white',
    borderRadius: 7,
    padding: 10,
  },
  [theme.breakpoints.down('sm')]: {
    avatarStyle: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
  [theme.breakpoints.up('md')]: {
    avatarStyle: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  [theme.breakpoints.up('lg')]: {
    avatarStyle: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
  cardRootStyle: {
    minHeight: 128,
    borderRadius: 3,
    boxShadow: '0 7px 10px 0 rgba(0, 188, 212, 0.4), 0 4px 20px 0 rgba(0, 0, 0, 0.14)',
  },
  postedBg: {
    backgroundColor: 'orange',
  },
  commentedBg: {
    backgroundColor: '#eabe6d',
  },
  upVotedBg: {
    backgroundColor: 'green',
  },
  downVotedBg: {
    backgroundColor: 'red',
  },
  likedPostBg: {
    backgroundColor: 'pink',
  },
  quotedPostBg: {
    backgroundColor: 'purple',
  },
  cardHeaderStyle: {
    paddingBottom: 0, paddingTop: 10,
  },
  cardBodyStyle: {
    paddingTop: 0, paddingBottom: 0,
  },
  cardHeaderContent: {
    width: '62%',
  },
  iconButton: {
    color: '#ffffff',
  },
  username: {
    height: '11px',
    font: 'Roboto',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#ffffff',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    position: 'absolute',
    width: '20%',
    padding: 0,
    top: 16,
  },
  dateTime: {
    height: '11px',
    opacity: 0.8,
    font: 'Roboto',
    fontSize: '10px',
    color: '#ffffff',
    padding: 0,
    zIndex: 1,
    position: 'relative',
  },
  postTitle: {
    font: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    cursor: 'pointer',
    zIndex: 1,
    position: 'relative',
  },
  rankNumber: {
    height: 120,
    font: 'Roboto',
    fontSize: 96,
    fontWeight: 'bold',
    color: 'grey',
    position: 'absolute',
    top: 0,
    right: 35,
    zIndex: 0,
  },
  postContent: {
    font: 'Roboto',
    fontSize: 12,
    fontWeight: 300,
    color: '#ffffff',
    zIndex: 1,
    position: 'relative',
  },
  votes: {
    height: 12,
    font: 'Roboto',
    fontSize: 10,
    fontWeight: 500,
    color: '#ffffff',
  },
  bookmark: {
    paddingTop: 0,
    paddingBottom: 0,
    right: 8,
    position: 'absolute',
  },
}))

const getPostContentLimit = () => {
  const windowWidth = window.innerWidth
  let limit = 65

  if (windowWidth > 781 && windowWidth < 960) {
    limit = 100
  }

  if (windowWidth >= 600 && windowWidth <= 781) {
    limit = 35
  }

  if (windowWidth >= 572 && windowWidth < 600) {
    limit = 178
  }

  if (windowWidth <= 408) {
    limit = 18
  }

  return limit
}

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

export default function PostCard(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user.data)
  const classes = useStyles(props)
  const {
    _id, text, title, upvotes, downvotes, url, bookmarkedBy, created, onHidePost, onBookmark, creator,
    activityType,
  } = props
  const isBookmarked = bookmarkedBy && bookmarkedBy.includes(user._id)
  const [postContentLimit, setPostContentLimit] = React.useState(65)

  const onResize = () => {
    const limit = getPostContentLimit()
    setPostContentLimit(limit)
  }
  const cardBg = getCardBg(activityType)
  window.addEventListener('resize', onResize)
  return (
    <Box boxShadow={3} className={classes.root}>
      <Card className={classNames(classes.cardRootStyle, classes[cardBg])}>
        <CardHeader
          classes={{ content: classes.cardHeaderContent }}
          avatar={<Avatar alt="profile" src={ProfilePicture} className={classes.avatarStyle} />}
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
            <GridContainer>
              <GridItem xs={4}>
                <span className={classes.username}>
                  {creator ? creator.name : 'Anonymous'}
                </span>
              </GridItem>
              <GridItem xs={8}>
                <span className={classes.dateTime}>
                  {moment(created).calendar(null, {
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]',
                    nextWeek: 'dddd',
                    lastDay: '[Yesterday]',
                    lastWeek: '[Last] dddd',
                    sameElse: 'MMM DD, YYYY',
                  })}
                  {` @ ${moment(created).format('h:mm A')}`}
                </span>
              </GridItem>
            </GridContainer>
          )}
          subheader={(
            <>
              <Typography
                className={classes.postTitle}
                onClick={() => {
                  // add post id to redux state
                  dispatch(SET_SELECTED_POST(_id))
                  history.push(url)
                }}
              >
                {title}
              </Typography>
            </>
          )}
          className={classes.cardHeaderStyle}
        />
        <CardBody className={classes.cardBodyStyle}>
          <GridContainer justify="flex-end">
            <GridItem xs={10}>
              <Typography className={classes.postContent}>
                {stringLimit(text || '', postContentLimit)}
              </Typography>
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter>
          <GridContainer justify="space-between">
            <GridItem xs={4}>
              <Typography display="inline" className={classes.votes}>
                {`+${upvotes}  `}
              </Typography>
              <Typography display="inline" className={classes.votes}>
                |
              </Typography>
              <Typography display="inline" className={classes.votes}>
                {` -${downvotes}`}
              </Typography>
            </GridItem>
            <GridItem xs={3}>
              <IconButton
                classes={{ root: classes.iconButton }}
                className={classes.bookmark}
                onClick={() => onBookmark(_id)}
              >
                {isBookmarked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </GridItem>
          </GridContainer>
        </CardFooter>
      </Card>
    </Box>
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
}
