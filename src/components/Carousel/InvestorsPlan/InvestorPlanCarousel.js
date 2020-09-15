import React, { useState } from 'react'
import { CircularProgress, TextField, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import GridItem from '../../../mui-pro/Grid/GridItem'
import GridContainer from '../../../mui-pro/Grid/GridContainer'
import investorPlanImg from '../../../assets/img/UserSharing.png'
import investorPlanImg2 from '../../../assets/img/CommentBox2.png'
import investorPlanImg3 from '../../../assets/img/GroupChat.png'
import InvestButton from '../../InvestButton'
import Carousel from '../Carousel'
import { SEND_INVESTOR_EMAIL } from '../../../graphql/mutations'
import DoubleArrowIconButton from '../../DoubleArrowIconButton'

InvestorCarouselFirstContent.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func,
  setActiveStepProp: PropTypes.func,
}

function InvestorCarouselFirstContent({ classes, handleNext, setActiveStepProp }) {
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
              This is why we reject investment from VC firms, and encourage users to invest and become a part of the
              change.
              <b>Invest up to $2000 to grow with us. </b>
              <br />
              <br />
            </div>
          </Typography>
          <Typography className={bottomText}>
            <InvestButton
              handleClick={() => {
                setActiveStepProp(2)
              }}
            />
            {' '}
            What is
            <span className={greenText}> the deal </span>
            <DoubleArrowIconButton onClick={() => handleNext(1)} />
          </Typography>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}

InvestorCarouselSecondContent.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func,
  setActiveStepProp: PropTypes.func,
}

function InvestorCarouselSecondContent({ classes, handleNext, setActiveStepProp }) {
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
            <InvestButton
              handleClick={() => {
                setActiveStepProp(2)
              }}
            />
            {'  '}
            I want to
            {' '}
            <span className={greenText}> to know details</span>
            <DoubleArrowIconButton onClick={() => handleNext(2)} />
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
  const [sendInvestorMail, { data, error, loading }] = useMutation(SEND_INVESTOR_EMAIL)
  const {
    register, errors, handleSubmit, getValues,
  } = useForm()

  const handleSendEmail = async () => {
    const { email } = getValues()
    await sendInvestorMail({ variables: { email } })
  }

  if (data) {
    history.push('/auth/investor-thanks')
  }

  return (
    <form onSubmit={handleSubmit(handleSendEmail)}>
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
                label="Email"
                name="email"
                id="email"
                error={errors.email}
                helperText={errors.email && errors.email.message}
                inputRef={register({
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        aria-label="Send"
                        className={classes.sendEmailButton}
                        onClick={handleSendEmail}
                        disabled={loading || error || errors.email}
                      >
                        Send
                        {loading && (<CircularProgress size={20} className={classes.loadingProgress} />)}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </form>
  )
}

function InvestorPlanCarousel(props) {
  const [activeStepProp, setActiveStepProp] = useState(0)
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
      <InvestorCarouselFirstContent {...props} handleNext={handleNext} setActiveStepProp={setActiveStepProp} />
      <InvestorCarouselSecondContent {...props} handleNext={handleNext} setActiveStepProp={setActiveStepProp} />
      <InvestorCarouselThirdContent {...props} />
    </Carousel>
  )
}

InvestorPlanCarousel.propTypes = {
  classes: PropTypes.object,
}

export default InvestorPlanCarousel
