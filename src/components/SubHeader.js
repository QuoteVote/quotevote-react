import React, { useState } from 'react'
import PropTypes from 'prop-types'

import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import SvgIcon from '@material-ui/core/SvgIcon'
import Hidden from '@material-ui/core/Hidden'
import Input from '@material-ui/core/Input'
import Slider from '@material-ui/core/Slider'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Tooltip from '@material-ui/core/Tooltip'

import { makeStyles, withStyles } from '@material-ui/core/styles'
import { IconButton, Typography } from '@material-ui/core'
import {
  Search as SearchIcon,
  Filter as FilterIcon,
  Calendar as CalendarIcon,
  Group as GroupIcon,
} from 'components/Icons'
import { ReactComponent as NotificationsSvg } from 'assets/svg/Notifications.svg'

const useStyles = makeStyles(() => ({
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
  },
  calendar: {
    borderRadius: '6px',
    border: 'solid 1px #d2d2d2',
    backgroundColor: '#ffffff',
  },
}))

const TrendingSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    boxShadow: '0 3px 5px 0 rgba(112, 107, 107, 0.3)',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: '0 3px 5px 0 rgba(112, 107, 107, 0.3)',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 5,
    borderRadius: 3,
    backgroundColor: '#e91e63',
  },
  rail: {
    height: 5,
    borderRadius: 3,
    backgroundColor: '#20e08e',
  },
})(Slider)

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#20e08e',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: 'black',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />)

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

export default function SubHeader(props) {
  const { headerName } = props
  const classes = useStyles()
  const [tabType, setTabType] = useState('fullwidth')
  const [sliderValue, setSliderValue] = useState(2000)
  const [tabValue, setTabValue] = useState(0)
  const TabList = ['Posts', 'Votes', 'Comments', 'Quotes']

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const onResize = () => {
    if (window.innerWidth < 670) {
      setTabType('scrollable')
    }
  }

  window.addEventListener('resize', onResize)
  return (
    <>
      <Hidden only={['xs', 'sm']}>
        <GridContainer
          direction="row"
          alignItems="center"
          justify="space-between"
          className={classes.header}
          spacing={2}
        >
          <GridItem xs={3}>
            <Typography className={classes.headerName}>
              {headerName}
            </Typography>
          </GridItem>
          <GridItem xs={3.5}>
            <IconButton>
              <FilterIcon
                width="32"
                height="32"
                viewBox="0 0 32 32"
                style={{ color: '#424556' }}
              />
            </IconButton>
            <IconButton>
              <CalendarIcon
                width="37"
                height="36"
                viewBox="0 0 37 36"
                style={{ color: '#424556' }}
              />
            </IconButton>
            <IconButton>
              <GroupIcon
                width="32"
                height="32"
                viewBox="0 0 32 32"
                style={{ color: '#424556' }}
              />
            </IconButton>
            <IconButton>
              <SearchIcon
                width="31"
                height="30"
                viewBox="0 0 31 30"
                style={{ color: '#424556' }}
              />
            </IconButton>
          </GridItem>
        </GridContainer>
      </Hidden>
      <Hidden only={['md', 'lg', 'xl']}>
        <GridContainer direction="row" spacing={2}>
          <GridItem xs={12}>
            <Typography display="inline" align="justify" className={classes.headerNameSm}>
              {headerName}
            </Typography>
            <IconButton
              aria-label="Notifications"
              color="inherit"
              style={{ float: 'right' }}
            >
              <SvgIcon
                component={NotificationsSvg}
                fontSize="large"
                viewBox="0 0 49 46"
              />
            </IconButton>
          </GridItem>
          <GridItem xs={12} className={classes.search}>
            <Input
              placeholder="Search..."
              endAdornment={(
                <IconButton>
                  <SearchIcon
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    style={{ color: '#424556' }}
                  />
                </IconButton>
              )}
              fullWidth
              disableUnderline
            />
          </GridItem>
          <GridItem xs={12} className={classes.calendar}>
            <Input
              placeholder="15 Sep 2017 - 12 Oct 2018"
              endAdornment={(
                <IconButton>
                  <CalendarIcon
                    width="37"
                    height="36"
                    viewBox="0 0 37 36"
                    style={{ color: '#424556' }}
                  />
                </IconButton>
              )}
              fullWidth
              disableUnderline
            />
          </GridItem>
          <GridItem xs={12}>
            <TrendingSlider
              max={10000}
              value={sliderValue}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              ValueLabelComponent={ValueLabelComponent}
            />
          </GridItem>
          <GridItem xs={12}>
            <StyledTabs
              variant={tabType}
              value={tabValue}
              onChange={handleTabChange}
              centered
            >
              {TabList.map((tab) => (
                <StyledTab label={tab} />
              ))}
            </StyledTabs>
          </GridItem>
        </GridContainer>
      </Hidden>
    </>
  )
}

SubHeader.propTypes = {
  headerName: PropTypes.string.isRequired,
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
}
