import React from 'react'
import Grid from '@material-ui/core/Grid'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import GridContainer from '../../mui-pro/Grid/GridContainer'
import DateSearchBar from '../DateSearchBar'
import CustomizedInputBase from '../searchBar'
const useStyles = makeStyles((theme) => ({
  iconActive: {
    color: teal.A400,
  },
  iconNonActive: {
    color: 'black',
  },
  toggleButtonGroup: {
    [theme.breakpoints.up('xs')]: {
      marginTop: 5,
      paddingLeft: 30,
    },
  },
  date: {
    [theme.breakpoints.up('xs')]: {
      marginTop: 5,
      paddingLeft: 30,
    },
  },
  search: {
    [theme.breakpoints.up('xs')]: {
      marginTop: 5,
      paddingLeft: 30,
    },
  },
}))
export default function FilterInputs({
  filterState, selectAll, setOffset, handleSelectAll, handleActivityEvent,
}) {
  const classes = useStyles()
  return (
    <Grid item container>
      <GridContainer
        direction="row"
        justify="center"
        alignItems="center"
      >
        <GridContainer alignItems="center" direction="row">
          {
            filterState.filter.visibility ? (
              <Grid item container xs={12} sm={12} lg={4} className={classes.toggleButtonGroup} justify="flex-start" wrap="nowrap" direction="row">
                <ToggleButtonGroup value={selectAll} onChange={handleSelectAll} aria-label="All Event">
                  <ToggleButton
                    value="ALL"
                    aria-label="All"
                    className={classes.headerToggle}
                  >
                    All
                  </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup value={filterState.filter.value} onChange={handleActivityEvent} aria-label="Event">
                  <ToggleButton
                    value="POSTED"
                    aria-label="POSTED"
                    className={classes.headerToggle}
                  >
                    Content
                  </ToggleButton>
                  <ToggleButton
                    value="VOTED"
                    aria-label="VOTED"
                    className={classes.headerToggle}
                  >
                    Votes
                  </ToggleButton>
                  <ToggleButton
                    value="COMMENTED"
                    aria-label="COMMENTED"
                    className={classes.headerToggle}
                  >
                    Comments
                  </ToggleButton>
                  <ToggleButton
                    value="QUOTED"
                    aria-label="QUOTED"
                    className={classes.headerToggle}
                  >
                    Quotes
                  </ToggleButton>
                </ToggleButtonGroup>

              </Grid>
            ) : null
          }
          {
            filterState.date.visibility ? (
              <Grid item container xs={12} sm={12} lg={4} className={classes.date} justify="flex-start" wrap="nowrap" direction="row">
                <DateSearchBar setOffset={setOffset} />
              </Grid>
            ) : null
          }
          {
            filterState.search.visibility ? (
              <Grid item container xs={12} sm={12} lg={3} className={classes.search} justify="flex-start" wrap="nowrap" direction="row">
                <CustomizedInputBase setOffset={setOffset} />
              </Grid>
            ) : null
          }
        </GridContainer>
      </GridContainer>
    </Grid>
  )
}

FilterInputs.propTypes = {
  filterState: PropTypes.object,
  selectAll: PropTypes.bool,
  setOffset: PropTypes.func,
  handleSelectAll: PropTypes.func,
  handleActivityEvent: PropTypes.func,
}
