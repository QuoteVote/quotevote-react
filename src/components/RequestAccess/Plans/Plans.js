import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import BusinessPlanAvatar from 'assets/img/BusinessPlanAvatar.png'
import InvestorPlanAvatar from 'assets/img/InvestorPlanAvatar.png'
import PersonalPlanAvatar from 'assets/img/PersonalPlanAvatar.png'
import { Typography, Grid, Button } from '@material-ui/core'
import { SET_SELECTED_PLAN } from 'store/ui'
import { isMobile } from 'react-device-detect'

const useStyles = makeStyles(styles)

export const MOBILE_IMAGE_WIDTH = 250

export default function Plans() {
  const classes = useStyles({ isMobile })
  const dispatch = useDispatch()
  const history = useHistory()
  const selectedPlan = useSelector((state) => state.ui.selectedPlan)

  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setSelectedPlan = (type) => {
    dispatch(SET_SELECTED_PLAN(type))
  }

  return (
    <div className={classes.container}>
      <Grid container justify="center" style={{ marginRight: 24 }}>
        <Grid item container justify="center" xs={12}>
          <Typography className={classes.select}>Select To Learn More</Typography>
          <Grid container direction="row" justify="space-evenly">
            <Grid item>
            <Grid container direction="column" alignItems="center">
              <img className={classes.planAvatar} src={PersonalPlanAvatar} alt="personal" />
              <Button
                className={classes.planButton}
                variant="outlined"
                onClick={() => setSelectedPlan('personal')}
              >
                Personal
              </Button>
              </Grid>
            </Grid>
            <Grid item>
            <Grid container direction="column" alignItems="center">
              <img className={classes.planAvatar} src={BusinessPlanAvatar} alt="business" />
              <Button
                className={classes.planButton}
                variant="outlined"
                onClick={() => setSelectedPlan('business')}
              >
                Business
              </Button>
              </Grid>
            </Grid>
            <Grid item>
            <Grid container direction="column" alignItems="center">
              <img className={classes.planAvatar} src={InvestorPlanAvatar} alt="investor" />
              <Button
                className={classes.planButton}
                variant="outlined"
                onClick={() => setSelectedPlan('investors')}
              >
                Investors
              </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
