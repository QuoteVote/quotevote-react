import React from 'react'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import GridItem from '../../mui-pro/Grid/GridItem'
import {
  Calendar as CalendarIcon, Filter as FilterIcon, Group as GroupIcon, Search as SearchIcon,
} from '../Icons'
import { DATE_VISIBILITY, FILTER_VISIBILITY, SEARCH_VISIBILITY } from '../../store/filter'

const useStyles = makeStyles(() => ({
  iconActive: {
    color: teal.A400,
  },
  iconNonActive: {
    color: 'black',
  },
}))
export default function FilterIconButtons({ showGroupIcon = false }) {
  const dispatch = useDispatch()
  const classes = useStyles()

  const filterState = useSelector((state) => state.filter)

  const handleFilter = () => {
    dispatch(FILTER_VISIBILITY(!filterState.filter.visibility))
  }

  const handleCalendar = () => {
    dispatch(DATE_VISIBILITY(!filterState.date.visibility))
  }

  const handleSearch = () => {
    dispatch(SEARCH_VISIBILITY(!filterState.search.visibility))
  }

  return (
    <GridItem xs={3.5}>
      {showGroupIcon && (
        <IconButton>
          <GroupIcon
            width="32"
            height="32"
            viewBox="0 0 32 32"
            style={{ color: '#424556' }}
          />
        </IconButton>
      )}

      <IconButton
        onClick={handleFilter}
        aria-label="Filter list icons"
        color="inherit"
        className={filterState.filter.visibility ? classes.iconActive : classes.iconNonActive}
      >
        <FilterIcon
          width="32"
          height="32"
          viewBox="0 0 32 32"
        />
      </IconButton>
      <IconButton
        onClick={handleCalendar}
        aria-label="date range icons"
        color="inherit"
        className={filterState.date.visibility ? classes.iconActive : classes.iconNonActive}
      >
        <CalendarIcon
          width="37"
          height="36"
          viewBox="0 0 37 36"
        />
      </IconButton>
      <IconButton
        onClick={handleSearch}
        aria-label="search"
        className={filterState.search.visibility ? classes.iconActive : classes.iconNonActive}
      >
        <SearchIcon
          width="31"
          height="30"
          viewBox="0 0 31 30"
        />
      </IconButton>
    </GridItem>
  )
}

FilterIconButtons.propTypes = {
  showGroupIcon: PropTypes.bool,
}
