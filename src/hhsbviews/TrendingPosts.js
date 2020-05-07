import React, { useState } from 'react'

import {useQuery} from '@apollo/react-hooks';
import Card from "mui-pro/Card/Card.js"
import CardBody from "mui-pro/Card/CardBody.js"
import CustomizedInputBase, { GET_SEARCH_KEY } from 'hhsbComponents/searchBar'
import GridContainer from "mui-pro/Grid/GridContainer.js"
import Pagination from "material-ui-flat-pagination";
import Slider from '@material-ui/core/Slider';

import Calendar from 'hhsbAssets/Calendar.svg'
import Emoji from 'hhsbAssets/FollowingEmoji.svg'
import Filter from 'hhsbAssets/Filter.svg'
import PostsList from 'hhsbComponents/PostsList'

import { GET_TOP_POSTS } from 'graphql/query'

export default function TrendingPosts() {
  const limit = 5
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(1)
  const { data: { searchKey } } = useQuery(GET_SEARCH_KEY)
  const { loading, error, data } = useQuery(GET_TOP_POSTS, {
    variables: { limit, offset: 0, searchKey }
  })
  
  React.useEffect(() => {
    if (data) {
      setTotal(data.total)
    }
  }, [data])

  if (error) return `Something went wrong: ${error}`
  const posts = (data && data.posts) || []

  const handleSlider = (event, newValue) => {
    setOffset(newValue)
  }

  return (
    <Card style={{ display: 'flex', flexBasis: '800px' }}>
      <CardBody>
        <GridContainer
          direction="row"
          justify="center"
          alignItems="center"
        >
          <GridContainer alignItems="center" direction="row" style={{ width: '50%' }}>
            <Slider
              defaultValue={limit}
              value={offset}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              max={total}
              min={1}
              onChange={handleSlider}
            />
          </GridContainer>
          <br></br>
          <br></br>
          <GridContainer
            alignItems="center"
            direction="row"
            justify="space-between"
            style={{
              backgroundColor: '#2A6797',
              boxShadow: '0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              width: '75%',
              wrap: 'nowrap',
            }}
          >
            <h3
              style={{
                color: 'white',
                font: 'League Spartan',
                fontWeight: 'bold',
                paddingLeft: '20px',
                paddingBottom: '5px',
              }}
            >
              Trending Posts
            </h3>

            <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <CustomizedInputBase setOffset={setOffset} />
              <img alt="date" src={Calendar} style={{ display: 'flex', maxHeight: '40px', paddingLeft: '15px' }} />
              <img alt="filter" src={Filter} style={{ display: 'flex', maxHeight: '40px', paddingLeft: '15px' }} />
              <img
                alt="group"
                src={Emoji}
                style={{
                  display: 'flex', maxHeight: '40px', paddingLeft: '15px', paddingRight: '15px',
                }}
              />
            </div>
          </GridContainer>
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
        onClick={(e, offset) => setOffset(offset)}
      />
    </Card>
  )
}    