'use client'

import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Grid, Typography, Box, Tooltip } from '@mui/material'
import FilterIconButtons from './FilterIconButtons'
import SearchBar from './SearchBar'
import Filter from './Filter'
import DateFilter from './DateFilter'
import { useRouter } from 'next/navigation'

const Header = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const StyledTooltip = styled(Tooltip)({
  '& .MuiTooltip-tooltip': {
    backgroundColor: '#20e08e',
  },
})

const SubHeader = ({ headerName }) => {
  const router = useRouter()

  return (
    <Header container>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h5" component="h1">
            {headerName}
          </Typography>
          <StyledTooltip title="Filter your content">
            <FilterIconButtons />
          </StyledTooltip>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <SearchBar />
          <Filter />
          <DateFilter />
        </Box>
      </Grid>
    </Header>
  )
}

SubHeader.propTypes = {
  headerName: PropTypes.string.isRequired,
}

export default SubHeader 