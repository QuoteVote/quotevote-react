import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { TextField, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useHistory } from 'react-router-dom'
import GridItem from '../../../mui-pro/Grid/GridItem'
import GridContainer from '../../../mui-pro/Grid/GridContainer'
import investorPlanImg from '../../../assets/img/UserSharing.png'
import investorPlanImg2 from '../../../assets/img/CommentBox2.png'
import investorPlanImg3 from '../../../assets/img/GroupChat.png'
import InvestButton from '../../InvestButton'

InvestorCarouselFirstContent.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func,
}

function InvestorCarouselFirstContent({ classes, handleNext }) {
  const { opinionsText, bottomText, greenText } = classes
  return (
    <GridContainer justify="center" style={{ marginRight: 24 }}>
      <GridItem xs={12} sm={5}>
        <GridContainer justify="center">
          <img
            alt={investorPlanImg}
            src={`${investorPlanImg}`}
            style={{
              width: '400.43px',
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
              We created VoxPop with promoting
              {' '}
              <b>democracy and community as our pillar.</b>
              <br />
              <br />
              This is why we reject investment from VC firms, and encourage users to invest and become a part of the change.
              <b>Invest up to $2000 to grow with us. </b>
              <br />
              <br />
            </div>
          </Typography>
          <Typography className={bottomText}>
            <InvestButton />
            {' '}
            What is
            <span className={greenText}> the deal </span>
            <IconButton color="primary" aria-label="What's next">
              <DoubleArrowIcon onClick={handleNext} />
            </IconButton>
          </Typography>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}

InvestorCarouselSecondContent.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func,
}
function InvestorCarouselSecondContent({ classes, handleNext }) {
  const { opinionsText, bottomText, greenText } = classes
  return (
    <GridContainer justify="center" style={{ marginRight: 24 }}>
      <GridItem xs={12} sm={5}>
        <GridContainer justify="center">
          <img
            alt={investorPlanImg2}
            height={500}
            src={`${investorPlanImg2}`}
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
              By capping individual investments at $2000,
              {' '}
              <b>we ensure shareholders have an equal voice, and provide a more inclusive opportunity to invest. </b>
              <br />
              <br />
              We keep growth organized and open through voxPOP and
              {' '}
              <b>all shareholder opinions hold the same weight. </b>
              <br />
              <br />
            </div>
          </Typography>
          <Typography className={bottomText}>
            <InvestButton />
            {'  '}
            I want to
            {' '}
            <span className={greenText}> to know details</span>
            <IconButton color="primary" aria-label="What's next">
              <DoubleArrowIcon onClick={handleNext} />
            </IconButton>
          </Typography>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}

InvestorCarouselThirdContent.propTypes = {
  classes: PropTypes.object,
}
function InvestorCarouselThirdContent({ classes }) {
  const history = useHistory()
  const handleClick = () => {
    history.push('/auth/investor-thanks')
  }
  return (
    <GridContainer justify="center" style={{ marginRight: 24 }}>
      <GridItem xs={12} sm={5}>
        <GridContainer justify="center">
          <img
            alt={investorPlanImg3}
            height={500}
            src={`${investorPlanImg3}`}
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
              <b>There are 10,000,000 shares of stock</b>
              <br />
              Join us in creating a truly open and equal community
              where civil conversation is the main objective.
              <br />
              <br />
              <br />
            </div>
          </Typography>
          <div className={classes.sendEmail}>
            <TextField
              variant="filled"
              required
              id="email"
              label="Email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      aria-label="Send"
                      className={classes.sendEmailButton}
                      onClick={handleClick}
                    >
                      Send
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}

function InvestorPlanCarousel(props) {
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
      <InvestorCarouselFirstContent {...props} handleNext={handleNext} />
      <InvestorCarouselSecondContent {...props} handleNext={handleNext} />
      <InvestorCarouselThirdContent {...props} handleNext={handleNext} />
    </Carousel>
  )
}

InvestorPlanCarousel.propTypes = {
  classes: PropTypes.object,
  setCarouselCurrentIndex: PropTypes.func,
}

export default InvestorPlanCarousel
