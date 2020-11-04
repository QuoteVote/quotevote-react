import React from 'react'
import {
  Card, CardContent, Grid, GridList, GridListTile, IconButton, Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Skeleton } from '@material-ui/lab'
import { Filter as FilterIcon } from '../Icons'
import Comment from './Comment'

function CommentList({ comments, loading }) {
  return (
    <>
      <Grid
        container
        item
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography variant="h6">
            Comments
          </Typography>
        </Grid>
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
      {comments ? (
        <GridList
          spacing={15}
          cols={1}
          cellHeight={180}
          style={{ height: comments.length > 2 ? '80vh' : 'auto', marginTop: 5 }}
        >
          {comments.sort((a, b) => moment(b.created).diff(moment(a.created))).map((comment) => (
            <GridListTile style={{ height: 'auto' }}>
              <Comment comment={comment} />
            </GridListTile>
          ))}
        </GridList>
      ) : <Card><CardContent>Start the discussion... </CardContent></Card>}

    </>
  )
}

CommentList.propTypes = {
  comments: PropTypes.object.isRequired,
  loading: PropTypes.bool,
}

export default CommentList
