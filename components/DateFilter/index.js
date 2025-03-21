'use client'

import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, Typography, FormGroup, FormControlLabel, Radio, RadioGroup } from '@mui/material'

const DateFilterContainer = styled(Box)(({ theme }) => ({
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

const DateFilterTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
}))

export default function DateFilter() {
  const { date } = useSelector((state) => state.filter)

  if (!date.visibility) return null

  return (
    <DateFilterContainer>
      <DateFilterTitle variant="subtitle1">Date Range</DateFilterTitle>
      <FormGroup>
        <RadioGroup defaultValue="all">
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="All Time"
          />
          <FormControlLabel
            value="today"
            control={<Radio />}
            label="Today"
          />
          <FormControlLabel
            value="week"
            control={<Radio />}
            label="This Week"
          />
          <FormControlLabel
            value="month"
            control={<Radio />}
            label="This Month"
          />
        </RadioGroup>
      </FormGroup>
    </DateFilterContainer>
  )
} 