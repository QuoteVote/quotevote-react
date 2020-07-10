import React, { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'
import { GET_SEARCH_KEY } from 'components/searchBar'
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import Pagination from 'material-ui-flat-pagination'
import PostsList from 'components/PostsList'

import { GET_TOP_POSTS } from 'graphql/query'

import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Typography } from '@material-ui/core'
import {
  Search as SearchIcon,
  Filter as FilterIcon,
  Calendar as CalendarIcon,
  Group as GroupIcon,
} from 'components/Icons'

const useStyles = makeStyles(() => ({
  header: {
    height: '85px',
    borderRadius: '6px',
    // backgroundColor: '#424556',
  },
  username: {
    width: '159px',
    height: '27.7px',
    fontFamily: 'LeagueSpartan',
    fontSize: '24px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#ffffff',
  },
}))

export default function TrendingPosts() {
  const classes = useStyles()
  const { hiddenPosts } = useSelector((state) => state.appReducer)
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

  // const handleSlider = (event, newValue) => {
  //   setOffset(newValue)
  // }

  return (
    <Card style={{ display: 'flex', flexBasis: '800px' }}>
      <CardBody>
        <GridContainer
          direction="row"
          alignItems="center"
          justify="space-between"
          className={classes.header}
          spacing={2}
        >
          <GridItem xs={3}>
            <Typography
              style={{
                color: '#424556',
                font: 'Montserrat',
                fontWeight: 'bold',
                height: '28px',
                fontSize: '24px',
                paddingLeft: '20px',
                paddingBottom: '5px',
              }}
            >
              Trending
            </Typography>
          </GridItem>
          <GridItem xs={3.5}>
            <IconButton>
              <FilterIcon
                width="32"
                height="32"
                viewBox="0 0 32 32"
                style={{ color: '#424556' }}
              />
            </IconButton>
            <IconButton>
              <CalendarIcon
                width="37"
                height="36"
                viewBox="0 0 37 36"
                style={{ color: '#424556' }}
              />
            </IconButton>
            <IconButton>
              <GroupIcon
                width="32"
                height="32"
                viewBox="0 0 32 32"
                style={{ color: '#424556' }}
              />
            </IconButton>
            <IconButton>
              <SearchIcon
                width="31"
                height="30"
                viewBox="0 0 31 30"
                style={{ color: '#424556' }}
              />
            </IconButton>
          </GridItem>
        </GridContainer>
        <br></br>
        <br></br>
        <PostsList Data={posts} loading={loading} limit={limit} />
      </CardBody>
      <Pagination
        style={{ margin: 'auto' }}
        limit={limit}
        offset={offset}
        total={total}
        // eslint-disable-next-line
        onClick={(e, offset) => setOffset(offset)}
      />
    </Card>
  )
}
