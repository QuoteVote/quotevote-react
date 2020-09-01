import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import PropTypes from 'prop-types'
import GridItem from '../../mui-pro/Grid/GridItem'
import GridContainer from '../../mui-pro/Grid/GridContainer'
import businessPlanImg from '../../assets/img/RequestAccess/Illustration.png'
import businessPlanImg2 from '../../assets/img/Chatbox.png'
import businessPlanImg3 from '../../assets/img/CommentBox.png'
import GetAccessButton from '../../components/GetAccessButton'

BusinessCarouselFirstContent.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func,
}

function BusinessCarouselFirstContent({ classes, handleNext }) {
  const { opinionsText, bottomText, greenText } = classes
  return (
    <GridContainer justify="center" style={{ marginRight: 24 }}>
      <GridItem xs={12} sm={5}>
        <GridContainer justify="center">
          <img
            alt={businessPlanImg}
            height={500}
            src={`${businessPlanImg}`}
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
              <b>Join 345 companies in creating a workspace in which everyone has an equal voice.</b>
              {' '}
              Poll to see what your employees value the most, converse to make the next big decision, and more.
              <br />
              <br />
              voxPOP is yours to shape.
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
            <IconButton color="primary" aria-label="What's next">
              <DoubleArrowIcon onClick={handleNext} />
            </IconButton>
          </Typography>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}

BusinessCarouselSecondContent.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func,
}
function BusinessCarouselSecondContent({ classes, handleNext }) {
  const { opinionsText, bottomText, greenText } = classes
  return (
    <GridContainer justify="center" style={{ marginRight: 24 }}>
      <GridItem xs={12} sm={5}>
        <GridContainer justify="center">
          <img
            alt={businessPlanImg2}
            height={500}
            src={`${businessPlanImg2}`}
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
              <b>Talk to your team,</b>
              {' '}
              poll the entire company, assess their feedback, plan the next big company initiative that will knock it out of the park.
              <br />
              <br />
            </div>
          </Typography>
          <Typography className={bottomText}>
            <GetAccessButton />
            {'  '}
            Stay
            {' '}
            <span className={greenText}> in Sync</span>
            <IconButton color="primary" aria-label="What's next">
              <DoubleArrowIcon onClick={handleNext} />
            </IconButton>
          </Typography>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}

function BusinessCarouselThirdContent(classes) {
  return (
    <GridContainer justify="center" style={{ marginRight: 24 }}>
      <GridItem xs={12} sm={5}>
        <GridContainer justify="center">
          <img
            alt={businessPlanImg3}
            height={500}
            src={`${businessPlanImg3}`}
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
              <b>Promote democracy and transparency</b>
              {' '}
              within your team. VoxPop makes it so the whole team can see progress in real time.
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

function BusinessCarousel(props) {
  const { setCarouselCurrentIndex } = props
  const handleNext = (next, active) => {
    // eslint-disable-next-line no-console
    console.log({ next, active })
  }

  return (
    <Carousel
      startAt={0}
      onChange={(index) => setCarouselCurrentIndex(index)}
    >
      <BusinessCarouselFirstContent {...props} handleNext={handleNext} />
      <BusinessCarouselSecondContent {...props} handleNext={handleNext} />
      <BusinessCarouselThirdContent {...props} handleNext={handleNext} />
    </Carousel>
  )
}

BusinessCarousel.propTypes = {
  classes: PropTypes.object,
  setCarouselCurrentIndex: PropTypes.func,
}

export default BusinessCarousel
