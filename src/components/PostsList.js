import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { SET_HIDDEN_POSTS, SET_SNACKBAR } from 'store/ui'
import { useMutation } from '@apollo/react-hooks'
import { GET_TOP_POSTS } from 'graphql/query'
import { UPDATE_POST_BOOKMARK } from 'graphql/mutations'
import { getGridListCols, useWidth } from 'utils/display'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import InfiniteScroll from 'react-infinite-scroller'
import PostCard from './PostCard'
import AlertSkeletonLoader from './AlertSkeletonLoader'
import LoadingSpinner from './LoadingSpinner'

export function LoadPostsList({ data, width, onLoadMore }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.data)
  const hiddenPosts = useSelector((state) => state.ui.hiddenPosts) || []
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

  if (!data || data.posts === 0) {
    return (
      <div style={{ width: '90%', textAlign: 'center' }}>
        <span>No posts fetched.</span>
        <br />
      </div>
    )
  }

  const rankedPosts = data.posts.entities
    .map((post, index) => ({ ...post, rank: index + 1 }))
    .filter((post) => !hiddenPosts.includes(post._id))

  const hasMore = data.posts.pagination.total_count > rankedPosts.length
  return (

    <InfiniteScroll
      pageStart={0}
      loadMore={onLoadMore}
      hasMore={hasMore}
      loader={<div className="loader" key={0}><LoadingSpinner size={30} /></div>}
    >
      <GridList cols={getGridListCols[width]}>
        {rankedPosts.map((prop, key) => (
          <GridListTile key={key} cols={1}>
            <PostCard
              {...prop}
              onHidePost={handleHidePost}
              user={user}
              onBookmark={handleBookmark}
            />
          </GridListTile>
        ))}
      </GridList>

    </InfiniteScroll>
  )
}

LoadPostsList.propTypes = {
  width: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onLoadMore: PropTypes.func.isRequired,
}

export default function PostList({
  data, loading, limit, fetchMore, variables,
}) {
  const width = useWidth()
  if (loading) return <AlertSkeletonLoader limit={limit} width={width} />

  const newOffset = data && data.posts.entities.length
  return (
    <LoadPostsList
      width={width}
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
            posts: {
              ...fetchMoreResult.posts,
              entities: [
                ...prev.posts.entities,
                ...fetchMoreResult.posts.entities,
              ],
            },
          }
        },
      })}
    />
  )
}

PostList.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  limit: PropTypes.number.isRequired,
  fetchMore: PropTypes.func.isRequired,
  variables: PropTypes.object.isRequired,
}
