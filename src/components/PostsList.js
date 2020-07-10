/* eslint-disable react/prop-types */
// TODO fix Links
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
// import copy from 'clipboard-copy'
import { useDispatch, useSelector } from 'react-redux'
import { SET_HIDDEN_POSTS } from 'store/ui'
import { useMutation } from '@apollo/react-hooks'
import { GET_TOP_POSTS } from 'graphql/query'
import { UPDATE_POST_BOOKMARK } from 'graphql/mutations'
import { getGridListCols, useWidth } from 'utils/display'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import PostCard from './PostCard'


// eslint-disable-next-line
function AlertSkeletonLoader({ limit, width }) {
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

function LoadPostsList({ data, width }) {
  // const DOMAIN = process.env.REACT_APP_DOMAIN || 'localhost:3000'
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.data)
  const hiddenPosts = useSelector((state) => state.ui.hiddenPosts)
  const limit = 12 + hiddenPosts.length
  // const [active, setActive] = React.useState(0)
  // const [activeKey, setActiveKey] = React.useState(null)
  const [updatePostBookmark] = useMutation(UPDATE_POST_BOOKMARK, {
    refetchQueries: [
      {
        query: GET_TOP_POSTS,
        variables: { limit, offset: 0, searchKey: '' },
      },
    ],
  })

  // const handleChange = (panel) => (event, expanded) => {
  //   setActive(expanded ? panel : -1)
  // }

  // const handleCopy = (shareableLink, key) => {
  //   copy(shareableLink)
  //   setActiveKey(key)
  // }

  const handleBookmark = (postId) => {
    // eslint-disable-next-line no-underscore-dangle
    updatePostBookmark({ variables: { postId, userId: user._id } })
  }

  const handleHidePost = (post) => {
    dispatch({
      type: SET_HIDDEN_POSTS,
      payload: [...hiddenPosts, post._id],
    })
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
