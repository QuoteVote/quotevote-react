import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import { Typography } from '@material-ui/core'
import GridContainer from '../../mui-pro/Grid/GridContainer'
import GridItem from '../../mui-pro/Grid/GridItem'
import SelectPlansButton from '../../components/SelectPlansButton'
import PersonalCarousel from './PersonalCarousel'
import BusinessCarousel from './BusinessCarousel'
import PersonalHeaderText from './PersonalHeaderText'
import BusinessHeaderText from './BusinessHeaderText'
import InvestorCarousel from './InvestorCarousel'
import InvestorHeaderText from './InvestorHeaderText'

const useStyles = makeStyles(styles)

export default function LandingPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [selectedPlan, setSelectedPlan] = useState('personal')
  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState(0)

  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isPersonal = selectedPlan === 'personal'
  const isBusiness = selectedPlan === 'business'
  const isInvestors = selectedPlan === 'investors'
  return (
    <div className={classes.container}>
      <GridContainer justify="center" style={{ marginRight: 24 }}>
        <GridItem xs={12}>
          <Typography
            align="center"
            className={classes.share}
          >
            {isPersonal && <PersonalHeaderText classes={classes} index={carouselCurrentIndex} />}
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
        { isPersonal && <PersonalCarousel classes={classes} setCarouselCurrentIndex={setCarouselCurrentIndex} />}
        { isBusiness && <BusinessCarousel classes={classes} setCarouselCurrentIndex={setCarouselCurrentIndex} />}
        { isInvestors && <InvestorCarousel classes={classes} setCarouselCurrentIndex={setCarouselCurrentIndex} />}
      </GridContainer>
    </div>
  )
}
