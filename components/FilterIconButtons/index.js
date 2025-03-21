'use client'

import { Grid, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import teal from '@mui/material/colors/teal'
import { useTheme, useMediaQuery } from '@mui/material'
import { Calendar as CalendarIcon, Filter as FilterIcon, Group as GroupIcon } from '../Icons'
import { setFilterVisibility, setDateVisibility } from '@/lib/slices/filterSlice'

const StyledIconButton = styled(IconButton)(({ active }) => ({
  color: active ? teal.A400 : 'black',
}))

export default function FilterIconButtons({ showGroupIcon = false, showFilterIconButton = true }) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const filterState = useSelector((state) => state.filter)

  const handleFilter = () => {
    dispatch(setFilterVisibility(!filterState.filter.visibility))
  }

  const handleCalendar = () => {
    dispatch(setDateVisibility(!filterState.date.visibility))
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent={isMobile ? 'flex-start' : 'center'}
      alignItems="center"
    >
      {showGroupIcon && (
        <Grid item>
          <IconButton>
            <GroupIcon
              width="32"
              height="32"
              viewBox="0 0 32 32"
              style={{ color: '#424556' }}
            />
          </IconButton>
        </Grid>
      )}

      {showFilterIconButton && (
        <Grid item>
          <StyledIconButton
            onClick={handleFilter}
            aria-label="Filter list icons"
            active={filterState.filter.visibility}
          >
            <FilterIcon
              width="32"
              height="32"
              viewBox="0 0 32 32"
            />
          </StyledIconButton>
        </Grid>
      )}

      <Grid>
        <StyledIconButton
          onClick={handleCalendar}
          aria-label="date range icons"
          active={filterState.date.visibility}
        >
          <CalendarIcon
            width="37"
            height="36"
            viewBox="0 0 37 36"
          />
        </StyledIconButton>
      </Grid>
    </Grid>
  )
}

FilterIconButtons.propTypes = {
  showGroupIcon: PropTypes.bool,
  showFilterIconButton: PropTypes.bool,
}

FilterIconButtons.defaultProps = {
  showGroupIcon: false,
  showFilterIconButton: true,
} 