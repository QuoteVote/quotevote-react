import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'inherit',
    maxHeight: 50,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export const GET_SEARCH_KEY = gql`
  {
    searchKey @client
  }
`

CustomizedInputBase.propTypes = {
  setOffset: PropTypes.func.isRequired,
}

export default function CustomizedInputBase({ setOffset }) {
  const classes = useStyles()
  const { data: { searchKey }, client } = useQuery(GET_SEARCH_KEY)
  const handleChange = (event) => {
    client.writeData({ data: { searchKey: event.target.value } })
    setOffset(0)
  }

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        value={searchKey}
        onChange={handleChange}
        fullWidth
      />
      <IconButton className={classes.iconButton} aria-label="search" />
    </Paper>
  )
}
