'use client'

import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

const FilterContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: 'white',
  borderRadius: '4px',
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
  zIndex: 1000,
  minWidth: '200px',
}))

const FilterTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
}))

export default function Filter() {
  const { filter } = useSelector((state) => state.filter)

  if (!filter.visibility) return null

  return (
    <FilterContainer>
      <FilterTitle variant="subtitle1">Filter Options</FilterTitle>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label="Option 1"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Option 2"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Option 3"
        />
      </FormGroup>
    </FilterContainer>
  )
} 