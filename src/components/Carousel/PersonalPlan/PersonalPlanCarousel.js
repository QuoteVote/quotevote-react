import React from 'react'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import GridItem from '../../../mui-pro/Grid/GridItem'
import GridContainer from '../../../mui-pro/Grid/GridContainer'
import personalPlanImg from '../../../assets/img/RequestAccess/PersonalPlan.png'
import personalPlanImg2 from '../../../assets/img/PersonalCarousel2.png'
import personalPlanImg3 from '../../../assets/img/PersonalCarousel3.png'
import GetAccessButton from '../../GetAccessButton'
import Carousel from '../Carousel'
import DoubleArrowIconButton from '../../DoubleArrowIconButton'

PersonalCarouselFirstContent.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func,
}
function PersonalCarouselFirstContent({ classes, handleNext }) {
  const { opinionsText, bottomText, greenText } = classes
  return (
    <GridContainer justify="center" style={{ marginRight: 24 }}>
      <GridItem xs={12} sm={5}>
        <GridContainer justify="center">
          <img
            alt={personalPlanImg}
            height={500}
            src={`${personalPlanImg}`}
            style={{
              width: '435.43px',
              height: '300.51px',
              objectFit: 'contain',
            }}
          />
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <GridContainer justify="left">
          <Typography>
            <div className={opinionsText}>
              <b>Share your opinions</b>
              {' '}
              with friends and/or strangers,
              work in projects with your teams, vote transparently
              and more.
              <br />
              <br />
              <b>Join a growing community of more than 1047 people</b>
              in honest and informed conversations. VoxPop is yours
              to shape.
              <br />
              <br />
            </div>
          </Typography>
          <Typography className={bottomText}>
            <GetAccessButton />
            {' '}
            What else do
            <span className={greenText}> we have </span>
            for you?
            <DoubleArrowIconButton onClick={handleNext} />
          </Typography>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}
PersonalCarouselSecondContent.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func,
}

function PersonalCarouselSecondContent({ classes, handleNext }) {
  // eslint-disable-next-line react/prop-types
  const { opinionsText, bottomText } = classes
  return (
    <GridContainer justify="center" style={{ marginRight: 24 }}>
      <GridItem xs={12} sm={5}>
        <GridContainer justify="center">
          <img
            alt={personalPlanImg2}
            height={500}
            src={`${personalPlanImg2}`}
            style={{
              width: '435.43px',
              height: '300.51px',
              objectFit: 'contain',
            }}
          />
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <GridContainer justify="left">
          <Typography>
            <div className={opinionsText}>
              <b>Post to your social circle and beyond.</b>
              {' '}
              Engage in meaningful, respectful back-and-forts,
              to challenge your perspectives.
              <br />
              <br />
              Highlight words, then vote or
              <b> comment to provide feedback.</b>
              <br />
              <br />
            </div>
          </Typography>
          <Typography className={bottomText}>
            <GetAccessButton />
            {'  '}
            More info
            <DoubleArrowIconButton onClick={handleNext} />
          </Typography>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}

function PersonalCarouselThirdContent(classes) {
  return (
    <GridContainer justify="center" style={{ marginRight: 24 }}>
      <GridItem xs={12} sm={5}>
        <GridContainer justify="center">
          <img
            alt={personalPlanImg3}
            height={500}
            src={`${personalPlanImg3}`}
            style={{
              width: '435.43px',
              height: '300.51px',
              objectFit: 'contain',
            }}
          />
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <GridContainer justify="left">
          <Typography>
            <div className={classes.opinionsText}>
              <b>See posts with the most activity.</b>
              {' '}
              Filter by keywords, date, range or follows.
              See what people are talking about and sharing the most.
              <br />
              <br />
              <b>No content is boosted by paid promotion or advertising.</b>
              <br />
              <br />
            </div>
          </Typography>
          <GetAccessButton />
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}

function PersonalPlanCarousel(props) {
  const [activeStepProp, setActiveStepProp] = React.useState(0)
  const handleNext = () => {
    setActiveStepProp((prevActiveStep) => prevActiveStep + 1)
  }

  return (
    <Carousel
      autoplay={false}
      navButtonsAlwaysVisible={false}
      activeStepProp={activeStepProp}
      setActiveStepProp={setActiveStepProp}
    >
      <PersonalCarouselFirstContent {...props} handleNext={handleNext} />
      <PersonalCarouselSecondContent {...props} handleNext={handleNext} />
      <PersonalCarouselThirdContent {...props} handleNext={handleNext} />
    </Carousel>
  )
}

PersonalPlanCarousel.propTypes = {
  classes: PropTypes.object,
}

export default PersonalPlanCarousel
