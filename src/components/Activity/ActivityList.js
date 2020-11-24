import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { Box } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import AlertSkeletonLoader from '../AlertSkeletonLoader'
import ActivityEmptyList from './ActivityEmptyList'
import LoadingSpinner from '../LoadingSpinner'
import { getGridListCols, useWidth } from '../../utils/display'
import { ActivityCard } from '../../ui/ActivityCard'
import getCardBackgroundColor from '../../utils/getCardBackgroundColor'
import { CREATE_POST_MESSAGE_ROOM, UPDATE_POST_BOOKMARK } from '../../graphql/mutations'
import {
  GET_CHAT_ROOMS, GET_POST, GET_TOP_POSTS, GET_USER_ACTIVITY,
} from '../../graphql/query'

function LoadActivityCard({ width, activity }) {
  const {
    _id, creator, created, activityType, upvotes, downvotes, bookmarkedBy, text,
  } = activity
  const postId = _id
  const user = useSelector((state) => state.user.data)
  const [createPostMessageRoom] = useMutation(CREATE_POST_MESSAGE_ROOM)
  const [updatePostBookmark] = useMutation(UPDATE_POST_BOOKMARK)
  const limit = 5

  const handleLike = async () => {
    await updatePostBookmark({
      variables: { postId, userId: user._id },
    })

    await createPostMessageRoom({
      variables: { postId },
      refetchQueries: [
        {
          query: GET_CHAT_ROOMS,
        },
        {
          query: GET_POST,
          variables: {
            postId,
          },
        },
        {
          query: GET_USER_ACTIVITY,
          variables: {
            user_id: user._id,
            limit,
            offset: 0,
            searchKey: '',
            activityEvent: [],
          },
        },
        {
          query: GET_TOP_POSTS,
          variables: { limit, offset: 0, searchKey: '' },
        },
      ],
    })
  }

  const history = useHistory()
  const handleRedirectToProfile = (username) => {
    history.push(`/hhsb/Profile/${username}`)
  }
  const isLiked = bookmarkedBy.includes(user._id)

  return (
    <ActivityCard
      avatar={creator.avatar}
      cardColor={getCardBackgroundColor(activityType)}
      name={creator.name}
      username={creator.username}
      date={created}
      upvotes={upvotes}
      downvotes={downvotes}
      liked={isLiked}
      content={text}
      width={width}
      onLike={handleLike}
      handleRedirectToProfile={handleRedirectToProfile}
    />
  )
}
LoadActivityCard.propTypes = {
  width: PropTypes.number,
  activity: PropTypes.object,
}

function LoadActivityList({ data, onLoadMore }) {
  const hiddenPosts = useSelector((state) => state.ui.hiddenPosts) || []
  const width = useWidth()

  if (!data || !data.activities.pagination.total_count) {
    return (
      <ActivityEmptyList />
    )
  }

  const activities = data.activities.entities
    .map((activity, index) => ({
      ...activity.post,
      activityType: activity.activityType === 'VOTED' ? `${activity.vote.type}${activity.activityType}` : activity.activityType,
      rank: index + 1,
    }))
    .filter((activity) => !hiddenPosts.includes(activity._id))
  const hasMore = data.activities.pagination.total_count > activities.length
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={onLoadMore}
      hasMore={hasMore}
      loader={<div className="loader" key={0}><LoadingSpinner size={30} /></div>}
    >
      <GridList cols={getGridListCols[width]}>
        {activities.map((activity, key) => (
          <GridListTile key={key} rows={1} cols={1}>
            <Box
              boxShadow={3}
              style={{
                marginRight: 20,
                borderRadius: 7,
              }}
            >
              <LoadActivityCard activity={activity} width={width} />
            </Box>
          </GridListTile>
        ))}
      </GridList>
    </InfiniteScroll>
  )
}

LoadActivityList.propTypes = {
  data: PropTypes.object.isRequired,
  onLoadMore: PropTypes.func,
}

function ActivityList({
  data, loading, fetchMore, variables,
}) {
  if (!data && loading) return <AlertSkeletonLoader cols={3} />
  const newOffset = data && data.activities.entities.length
  return (
    <LoadActivityList
      data={data}
      onLoadMore={() => fetchMore({
        variables: {
          ...variables,
          offset: newOffset,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          return {
            ...prev,
            activities: {
              ...fetchMoreResult.activities,
              entities: [
                ...prev.activities.entities,
                ...fetchMoreResult.activities.entities,
              ],
            },
          }
        },
      })}
    />
  )
}

ActivityList.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func,
  variables: PropTypes.object,
}

export default ActivityList
