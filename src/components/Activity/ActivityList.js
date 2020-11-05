import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { Box } from '@material-ui/core'
import PostCard from '../Post/PostCard'
import AlertSkeletonLoader from '../AlertSkeletonLoader'
import { SET_HIDDEN_POSTS } from '../../store/ui'
import ActivityEmptyList from './ActivityEmptyList'
import LoadingSpinner from '../LoadingSpinner'
import { getGridListCols, useWidth } from '../../utils/display'

function LoadActivityList({
  data, onLoadMore,
}) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.data)
  const hiddenPosts = useSelector((state) => state.ui.hiddenPosts) || []
  const width = useWidth()
  const handleHidePost = (post) => {
    dispatch(SET_HIDDEN_POSTS(post._id))
  }

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
          <GridListTile key={key} rows={1.3} cols={1}>
            <Box
              boxShadow={3}
              style={{
                marginRight: 20,
                borderRadius: 7,
              }}
            >
              <PostCard
                limitText
                {...activity}
                onHidePost={handleHidePost}
                user={user}
              />
            </Box>
          </GridListTile>
        ))}
      </GridList>
    </InfiniteScroll>
  )
}

export default function ActivityList({
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

LoadActivityList.propTypes = {
  data: PropTypes.object.isRequired,
  onLoadMore: PropTypes.func,
}
