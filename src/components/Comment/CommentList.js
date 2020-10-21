import React from 'react'
import {
  Card,
  CardContent,
  Grid,
  GridList,
  GridListTile,
  IconButton,
  InputAdornment,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { Send } from '@material-ui/icons'
import { Filter as FilterIcon } from '../Icons'
import Comment from './Comment'

function CommentList({ comments }) {
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
      <TextField
        style={{ color: 'black' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Send />
              </IconButton>
            </InputAdornment>
          ),
        }}
        id="comment"
        label="What are your thoughts?"
        placeholder=""
        multiline
        rows={2}
        defaultValue=""
        variant="filled"
        fullWidth
      />
      {comments ? (
        <GridList
          spacing={15}
          cols={1}
          cellHeight={180}
          style={{ height: '80vh', marginTop: 5 }}
        >
          {comments.map((comment) => (
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
}

export default CommentList
