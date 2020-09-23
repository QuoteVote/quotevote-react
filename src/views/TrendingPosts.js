import React, { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { GET_SEARCH_KEY } from 'components/searchBar'
import Pagination from 'material-ui-flat-pagination'
import PostsList from 'components/PostsList'

import { GET_TOP_POSTS } from 'graphql/query'
import SubHeader from 'components/SubHeader'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../mui-pro/Grid/GridContainer'
import GridItem from '../mui-pro/Grid/GridItem'

const useStyles = makeStyles(({
  root: {
    display: 'flex',
    flexBasis: '100%',
    flexGrow: 1,
    overflow: 'hidden',
  },
}))
export default function TrendingPosts() {
  const classes = useStyles()
  const hiddenPosts = useSelector((state) => state.ui.hiddenPosts) || []
  const limit = 12 + hiddenPosts.length
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(1)
  const { data: { searchKey } } = useQuery(GET_SEARCH_KEY)
  const { loading, error, data } = useQuery(GET_TOP_POSTS, {
    variables: { limit, offset: 0, searchKey },
  })

  React.useEffect(() => {
    if (data) {
      setTotal(data.total)
    }
  }, [data])

  if (error) return `Something went wrong: ${error}`
  const posts = (data && data.posts) || []

  return (
    <GridContainer className={classes.root}>
      <GridItem xs={12}>
        <SubHeader headerName="Trending" />
      </GridItem>

      <GridItem xs={12}>
        <PostsList Data={posts} loading={loading} limit={limit} />
      </GridItem>

      <GridItem xs={12}>
        <Pagination
          style={{ margin: 'auto' }}
          limit={limit}
          offset={offset}
          total={total}
          // eslint-disable-next-line
        onClick={(e, offset) => setOffset(offset)}
        />
      </GridItem>
    </GridContainer>
  )
}
