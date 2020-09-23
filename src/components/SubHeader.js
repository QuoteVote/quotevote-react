import React from 'react'
import PropTypes from 'prop-types'
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import FilterIconButtons from './Filter/FilterIconButtons'

const useStyles = makeStyles((theme) => ({
  header: {
    height: '85px',
    borderRadius: '6px',
  },
  headerName: {
    color: '#424556',
    font: 'Montserrat',
    fontWeight: 'bold',
    height: '28px',
    fontSize: '24px',
    paddingLeft: '20px',
    paddingBottom: '5px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
      paddingLeft: 5,
    },
  },
  headerNameSm: {
    width: '160px',
    height: '22px',
    font: 'Roboto',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3c4858',
  },
  search: {
    borderRadius: '6px',
    border: 'solid 1px #d2d2d2',
    backgroundColor: '#ffffff',
    marginBottom: '2%',
    marginLeft: '10px',
  },
  calendar: {
    borderRadius: '6px',
    border: 'solid 1px #d2d2d2',
    backgroundColor: '#ffffff',
    marginLeft: '10px',
  },
}))

const StyledTooltip = withStyles({
  tooltip: {
    backgroundColor: '#20e08e',
  },
})(Tooltip)

const ValueLabelComponent = (props) => {
  const { children, open, value } = props
  const prefix = value < 0 ? '-' : '+'
  return (
    <StyledTooltip open={open} enterTouchDelay={0} placement="top" title={`${prefix} ${value}`} arrow>
      {children}
    </StyledTooltip>
  )
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
}

export default function SubHeader(props) {
  const {
    headerName,
  } = props
  const classes = useStyles()

  return (
    <>
      <GridContainer
        direction="row"
        alignItems="center"
        justify="space-between"
        className={classes.header}
        spacing={2}
      >
        <GridItem xs={6}>
          <Typography className={classes.headerName}>
            {headerName}
          </Typography>
        </GridItem>
        <FilterIconButtons />
      </GridContainer>
    </>
  )
}

SubHeader.propTypes = {
  headerName: PropTypes.string.isRequired,
}
