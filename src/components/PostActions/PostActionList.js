import React from 'react'
import {
  Card, CardContent, Grid, GridList, GridListTile, IconButton,
} from '@material-ui/core'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Skeleton } from '@material-ui/lab'
import { Filter as FilterIcon } from '../Icons'
import PostActionCard from './PostActionCard'

function PostActionList({ postActions, loading }) {
  return (
    <>
      <Grid
        container
        item
        direction="row"
        justify="flex-end"
      >
        <Grid item>
          <IconButton style={{ marginLeft: 'auto' }}>
            <FilterIcon
              width="32"
              height="32"
              viewBox="0 0 32 32"
            />
          </IconButton>
        </Grid>
      </Grid>
      {loading && (
        <>
          <Skeleton variant="rect" height={118} />
          <br />
          <Skeleton variant="rect" height={118} />
          <br />
          <Skeleton variant="rect" height={118} />
        </>
      )}
      {!isEmpty(postActions) ? (
        <GridList
          spacing={15}
          cols={1}
          cellHeight={180}
          style={{ height: '80vh', marginTop: 5 }}
        >
          {postActions.sort((a, b) => moment(b.created).diff(moment(a.created))).map((action) => (
            <GridListTile style={{ height: 'auto' }}>
              <PostActionCard postAction={action} />
            </GridListTile>
          ))}
        </GridList>
      ) : !loading && <Card><CardContent>Start the discussion... </CardContent></Card>}

    </>
  )
}

PostActionList.propTypes = {
  postActions: PropTypes.object.isRequired,
  loading: PropTypes.bool,
}

export default PostActionList
