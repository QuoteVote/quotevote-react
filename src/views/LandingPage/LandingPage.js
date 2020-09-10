import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import { Typography } from '@material-ui/core'
import { SET_SELECTED_PLAN } from 'store/ui'
import GridContainer from '../../mui-pro/Grid/GridContainer'
import GridItem from '../../mui-pro/Grid/GridItem'
import SelectPlansButton from '../../components/SelectPlansButton'
import PersonalPlanCarousel from '../../components/Carousel/PersonalPlan/PersonalPlanCarousel'
import PersonalPlanHeaderText from '../../components/Carousel/PersonalPlan/PersonalPlanHeaderText'
import BusinessPlanCarousel from '../../components/Carousel/BusinessPlan/BusinessPlanCarousel'
import BusinessHeaderText from '../../components/Carousel/BusinessPlan/BusinessHeaderText'
import InvestorPlanCarousel from '../../components/Carousel/InvestorsPlan/InvestorPlanCarousel'
import InvestorHeaderText from '../../components/Carousel/InvestorsPlan/InvestorHeaderText'

const useStyles = makeStyles(styles)

export default function LandingPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const selectedPlan = useSelector((state) => state.ui.selectedPlan)
  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState(0)

  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isPersonal = selectedPlan === 'personal'
  const isBusiness = selectedPlan === 'business'
  const isInvestors = selectedPlan === 'investors'

  const setSelectedPlan = (type) => {
    dispatch(SET_SELECTED_PLAN(type))
  }

  return (
    <div className={classes.container}>
      <GridContainer justify="center" style={{ marginRight: 24 }}>
        <GridItem xs={12}>
          <Typography
            align="center"
            className={classes.share}
          >
            {isPersonal && <PersonalPlanHeaderText classes={classes} index={carouselCurrentIndex} />}
            {isBusiness && <BusinessHeaderText classes={classes} index={carouselCurrentIndex} />}
            {isInvestors && <InvestorHeaderText classes={classes} index={carouselCurrentIndex} />}
          </Typography>
        </GridItem>

        <GridItem xs={12}>
          <GridContainer justify="center">
            <Typography className={classes.fits}>
              Select what fits for you
            </Typography>
          </GridContainer>
        </GridItem>
        <GridItem xs={12}>
          <GridContainer justify="center">
            <div className={classes.buttonSpacing}>
              <SelectPlansButton
                variant={isPersonal ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() => setSelectedPlan('personal')}
                style={{ background: isPersonal ? '#1D6CE7' : '' }}
              >
                Personal
              </SelectPlansButton>
              <SelectPlansButton
                variant={isBusiness ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() => setSelectedPlan('business')}
                style={{ background: isBusiness ? '#791E89' : '' }}
              >
                Business
              </SelectPlansButton>
              <SelectPlansButton
                variant={isInvestors ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() => setSelectedPlan('investors')}
                style={{ background: isInvestors ? '#E91E63' : '' }}
              >
                Investors
              </SelectPlansButton>
            </div>
          </GridContainer>
        </GridItem>
        { isPersonal && <PersonalPlanCarousel classes={classes} setCarouselCurrentIndex={setCarouselCurrentIndex} />}
        { isBusiness && <BusinessPlanCarousel classes={classes} setCarouselCurrentIndex={setCarouselCurrentIndex} />}
        { isInvestors && <InvestorPlanCarousel classes={classes} setCarouselCurrentIndex={setCarouselCurrentIndex} />}
      </GridContainer>
    </div>
  )
}
