import React from 'react'
import PropTypes from 'prop-types'
import Skeleton from '@material-ui/lab/Skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { SET_HIDDEN_POSTS, SET_SNACKBAR } from 'store/ui'
import { useMutation } from '@apollo/react-hooks'
import { GET_TOP_POSTS } from 'graphql/query'
import { UPDATE_POST_BOOKMARK } from 'graphql/mutations'
import { getGridListCols, useWidth } from 'utils/display'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import PostCard from './PostCard'

export function AlertSkeletonLoader({ width }) {
  const rows = Array.from(Array(12).keys())
  return (
    <GridList cols={getGridListCols[width]}>
      {rows.map((item) => (
        <GridListTile key={item} cols={1}>
          <Skeleton animation="wave" height={128} />
        </GridListTile>
      ))}
    </GridList>
  )
}

export function LoadPostsList({ data, width }) {
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

  if (!data || data.posts === 0) {
    return (
      <div style={{ width: '90%', textAlign: 'center' }}>
        <span>No posts fetched.</span>
        <br></br>
      </div>
    )
  }

  const rankedPosts = data.posts
    .map((post, index) => ({ ...post, rank: index + 1 }))
    .filter((post) => !hiddenPosts.includes(post._id))

  return (
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
  )
}

export default function PostList({ Data, loading, limit }) {
  const width = useWidth()
  if (loading) return <AlertSkeletonLoader limit={limit} width={width} />
  return <LoadPostsList width={width} data={Data} />
}

PostList.propTypes = {
  Data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  limit: PropTypes.number.isRequired,
}

AlertSkeletonLoader.propTypes = {
  width: PropTypes.object.isRequired,
}

LoadPostsList.propTypes = {
  width: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}
