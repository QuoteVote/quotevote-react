import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import { ListItem } from '@material-ui/core'
import { SET_SELECTED_PLAN } from 'store/ui'
import { isMobile } from 'react-device-detect'
import GridContainer from '../../mui-pro/Grid/GridContainer'
import GridItem from '../../mui-pro/Grid/GridItem'
import Button from '../../mui-pro/CustomButtons/Button'
import SelectPlansButton from '../../components/CustomButtons/SelectPlansButton'
import PersonalPlanCarousel from '../../components/Carousel/PersonalPlan/PersonalPlanCarousel'
import PersonalPlanHeaderText from '../../components/Carousel/PersonalPlan/PersonalPlanHeaderText'
import BusinessPlanCarousel from '../../components/Carousel/BusinessPlan/BusinessPlanCarousel'
import BusinessHeaderText from '../../components/Carousel/BusinessPlan/BusinessHeaderText'
import InvestorPlanCarousel from '../../components/Carousel/InvestorsPlan/InvestorPlanCarousel'
import InvestorHeaderText from '../../components/Carousel/InvestorsPlan/InvestorHeaderText'

const useStyles = makeStyles(styles)

export const MOBILE_IMAGE_WIDTH = 250

export default function LandingPage() {
  const classes = useStyles({ isMobile })
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
    <GridContainer
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <GridItem xs={12}>
        <ListItem className={classes.listItem}>
          <Button
            variant="contained"
            className={classes.listItemTextRequestInvite}
            type="submit"
            onClick={() => history.push('/auth/request-access')}
          >
            Request Invite
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            variant="contained"
            className={classes.listItemTextRequestInvite}
            type="submit"
            onClick={() => history.push('/auth/request-access')}
          >
            Learn More
          </Button>
        </ListItem>
      </GridItem>
    </GridContainer>
  )
}
