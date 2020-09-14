import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import PropTypes from 'prop-types'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
    overflowX: 'hidden',
    flexGrow: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
}))

function SwipeableTextMobileStepper({
  navButtonsAlwaysVisible, children, autoplay, activeStepProp, setActiveStepProp,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(activeStepProp)
  const maxSteps = children.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
    if (step !== activeStepProp) {
      setActiveStepProp(step)
    }
  }

  React.useEffect(() => {
    setActiveStep(activeStepProp)
  }, [activeStepProp])

  const navButtonsVisibility = navButtonsAlwaysVisible ? 'visible' : 'hidden'
  return (
    <div className={classes.root}>
      {autoplay && (
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {children.map((child) => (
            <div className={classes.content}>
              {child}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      )}

      {!autoplay && (
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {children.map((child) => (
            <div className={classes.content}>
              {child}
            </div>
          ))}
        </SwipeableViews>
      )}
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
        nextButton={(
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1} style={{ visibility: navButtonsVisibility }}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        )}
        backButton={(
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} style={{ visibility: navButtonsVisibility }}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        )}
      />
    </div>
  )
}
SwipeableTextMobileStepper.defaultProps = {
  navButtonsAlwaysVisible: true,
  autoplay: true,
  activeStepProp: 0,
}
SwipeableTextMobileStepper.propTypes = {
  navButtonsAlwaysVisible: PropTypes.bool,
  children: PropTypes.any,
  autoplay: PropTypes.bool,
  activeStepProp: PropTypes.number,
  setActiveStepProp: PropTypes.func,
}

export default SwipeableTextMobileStepper
