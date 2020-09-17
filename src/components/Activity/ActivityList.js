import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getGridListCols, useWidth } from 'utils/display'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { useMutation } from '@apollo/react-hooks'
import PostCard from '../PostCard'
import AlertSkeletonLoader from '../AlertSkeletonLoader'
import { UPDATE_POST_BOOKMARK } from '../../graphql/mutations'
import { GET_TOP_POSTS } from '../../graphql/query'
import { SET_HIDDEN_POSTS, SET_SNACKBAR } from '../../store/ui'
import ActivityEmptyList from './ActivityEmptyList'

export function LoadActivityList({ data, width }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.data)
  const hiddenPosts = useSelector((state) => state.ui.hiddenPosts)
  const snackbar = useSelector((state) => state.ui.snackbar)
  const limit = 12 + hiddenPosts.length
  const [updatePostBookmark, { error }] = useMutation(UPDATE_POST_BOOKMARK, {
    refetchQueries: [
      {
        query: GET_TOP_POSTS,
        variables: { limit, offset: 0, searchKey: '' },
      },
    ],
  })

  // !snackbar.open prevent dispatching action again once snackbar is already opened
  if (error && !snackbar.open) {
    dispatch(SET_SNACKBAR({
      type: 'danger',
      message: `Updating bookmark error: ${error}`,
      open: true,
    }))
  }

  const handleBookmark = (postId) => {
    // eslint-disable-next-line no-underscore-dangle
    updatePostBookmark({
      variables: { postId, userId: user._id },
      update: (cache, { data: updatedBookmark }) => {
        if (updatedBookmark) {
          dispatch(
            SET_SNACKBAR({
              type: 'success',
              message: 'Updated Successfully',
              open: true,
            })
          )
        }
      },
    })
  }

  const handleHidePost = (post) => {
    dispatch(SET_HIDDEN_POSTS(post._id))
  }

  const testData = null
  // TODO uncomment below code
  // if (!data || data.activities === 0) {
  if (!testData) {
    return (
      <ActivityEmptyList />
    )
  }

  const activities = data.activities.activities
    .map((activity, index) => ({ ...activity, rank: index + 1 }))
    .filter((activity) => !hiddenPosts.includes(activity._id))

  const activitiesData = activities && activities.length && activities.map((activity, index) => {
    switch (activity.event) {
      case 'VOTED':
        return {
          _id: activity.data._id,
          title: `${activity.data.type.toUpperCase()}VOTED`,
          text: activity.data.content.title,
          upvotes: activity.data.content.upvotes,
          downvotes: activity.data.content.downvotes,
          url: activity.data.content.url,
          bookmarkedBy: activity.data.content.bookmarkedBy,
          rank: index + 1,
          created: activity.data.content.created,
          creator: activity.data.creator,
        }
      case 'POSTED':
        return {
          _id: activity.data._id,
          title: activity.data.title,
          text: activity.data.text,
          upvotes: activity.data.upvotes,
          downvotes: activity.data.downvotes,
          url: activity.data.url,
          bookmarkedBy: activity.data.bookmarkedBy,
          rank: index + 1,
          created: activity.data.created,
          creator: activity.data.creator,
        }
      case 'QUOTED':
        return {
          _id: activity.data._id,
          title: 'QUOTED',
          upvotes: activity.data.upvotes,
          downvotes: activity.data.downvotes,
          url: activity.data.url,
          bookmarkedBy: activity.data.bookmarkedBy,
          rank: index + 1,
          created: activity.data.created,
          creator: activity.data.creator,
        }
      case 'COMMENTED':
        return {
          _id: activity.data._id,
          title: activity.data.title,
          upvotes: 0,
          downvotes: 0,
          url: activity.data.url,
          bookmarkedBy: '',
          rank: index + 1,
          created: activity.data.created,
          creator: activity.data.creator,
        }
      case 'HEARTED':
        return {
          _id: activity.data._id,
          title: activity.data.title,
          text: activity.data.text,
          upvotes: 0,
          downvotes: 0,
          url: activity.data.url,
          bookmarkedBy: '',
          rank: index + 1,
          created: activity.data.created,
          creator: activity.data.creator,
        }
      default:
        break
    }
    return null
  })

  return (
    <GridList cols={getGridListCols[width]}>
      {activitiesData.map((activity, key) => (
        <GridListTile key={key} cols={1}>
          <PostCard
            {...activity}
            onHidePost={handleHidePost}
            user={user}
            onBookmark={handleBookmark}
          />
        </GridListTile>
      ))}
    </GridList>
  )
}

export default function ActivityList({ Data, loading, limit }) {
  const width = useWidth()
  if (loading) return <AlertSkeletonLoader limit={limit} width={width} />
  return <LoadActivityList width={width} data={Data} />
}

ActivityList.propTypes = {
  Data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  limit: PropTypes.number.isRequired,
}

LoadActivityList.propTypes = {
  width: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}
