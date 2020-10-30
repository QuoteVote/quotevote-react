import React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import withWidth from '@material-ui/core/withWidth'
import { Calendar as CalendarIcon, Filter as FilterIcon, Group as GroupIcon } from '../Icons'
import { DATE_VISIBILITY, FILTER_VISIBILITY } from '../../store/filter'

const useStyles = makeStyles(() => ({
  iconActive: {
    color: teal.A400,
  },
  iconNonActive: {
    color: 'black',
  },
}))
function FilterIconButtons({ showGroupIcon = false, showFilterIconButton, width }) {
  const dispatch = useDispatch()
  const classes = useStyles()

  const filterState = useSelector((state) => state.filter)

  const handleFilter = () => {
    dispatch(FILTER_VISIBILITY(!filterState.filter.visibility))
  }

  const handleCalendar = () => {
    dispatch(DATE_VISIBILITY(!filterState.date.visibility))
  }

  return (
    <Grid
      container
      direction="row"
      justify={width === 'xs' ? 'flex-start' : 'center'}
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
        </Grid>
      )}

      <Grid>
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
      </Grid>
    </Grid>
  )
}

FilterIconButtons.propTypes = {
  showGroupIcon: PropTypes.bool,
  showFilterIconButton: PropTypes.bool,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
}

export default withWidth()(FilterIconButtons)
