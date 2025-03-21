'use client'

import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { useQuery, useApolloClient } from '@apollo/client'
import PropTypes from 'prop-types'
import { gql } from '@apollo/client'
import { TextField, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'

const GET_SEARCH_KEY = gql`
  query GetSearchKey {
    searchKey @client
  }
`

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'inherit',
  maxHeight: 50,
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}))

const StyledIconButton = styled(IconButton)({
  padding: 10,
})

const SearchBar = () => {
  return (
    <TextField
      size="small"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchBar 