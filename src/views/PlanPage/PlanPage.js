import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import BusinessPlanAvatar from 'assets/img/BusinessPlanAvatar.png'
import InvestorPlanAvatar from 'assets/img/InvestorPlanAvatar.png'
import PersonalPlanAvatar from 'assets/img/PersonalPlanAvatar.png'
import {
  Typography,
  Grid,
  Button,
  Hidden,
} from '@material-ui/core'
import { SET_SELECTED_PLAN } from 'store/ui'
import { isMobile } from 'react-device-detect'

const useStyles = makeStyles(styles)

export const MOBILE_IMAGE_WIDTH = 250

export default function Plans() {
  const classes = useStyles({ isMobile })
  const dispatch = useDispatch()
  const history = useHistory()
  const selectedPlan = useSelector((state) => state.ui.selectedPlan)
  const [hover, setHover] = useState();
  console.log(hover)

  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setSelectedPlan = (type) => {
    dispatch(SET_SELECTED_PLAN(type))
    history.push('/auth/plans')
  }

  const buttonList = (
    <Grid container direction="column" justify="space-evenly" alignItems="center">
      <Button
        className={classes.planButton}
        variant="outlined"
        onClick={() => setSelectedPlan('personal')}
        onMouseOver={() => setHover('personal')}
        onMouseOut={() => setHover()}
        style={{ background: hover === 'personal' && '#1D6CE7', borderColor: hover === 'personal' && '#1D6CE7'}}
      >
        Personal
      </Button>
      <Button
        className={classes.planButton}
        variant="outlined"
        onClick={() => setSelectedPlan('business')}
        onMouseOver={() => setHover('business')}
        onMouseOut={() => setHover()}
        style={{ background: hover === 'business' && '#791E89', borderColor: hover === 'business' && '#791E89'}}
      >
        Business
      </Button>
      <Button
        className={classes.planButton}
        variant="outlined"
        onClick={() => setSelectedPlan('investors')}
        onMouseOver={() => setHover('investors')}
        onMouseOut={() => setHover()}
        style={{ background: hover === 'investors' && '#E91E63', borderColor: hover === 'investors' && '#E91E63'}}
      >
        Investors
      </Button>
    </Grid>
  )

  return (
    <div className={classes.container}>
      <Grid container justify="center" style={{ marginRight: 24 }}>
        <Grid item container justify="center" xs={12}>
          <Typography className={classes.select}>Select To Learn More</Typography>
          <Hidden smUp>
            {buttonList}
          </Hidden>
          <Hidden xsDown>
            <Grid container direction="row" justify="space-evenly" className={classes.plans}>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <img className={classes.planAvatar} src={PersonalPlanAvatar} alt="personal" />
                  <Button
                    className={classes.planButton}
                    variant="outlined"
                    onClick={() => setSelectedPlan('personal')}
                    onMouseOver={() => setHover('personal')}
                    onMouseOut={() => setHover()}
                    style={{ background: hover === 'personal' && '#1D6CE7', borderColor: hover === 'personal' && '#1D6CE7'}}
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
                    onMouseOver={() => setHover('business')}
                    onMouseOut={() => setHover()}
                    style={{ background: hover === 'business' && '#791E89', borderColor: hover === 'business' && '#791E89'}}
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
                    onMouseOver={() => setHover('investors')}
                    onMouseOut={() => setHover()}
                    style={{ background: hover === 'investors' && '#E91E63', borderColor: hover === 'investors' && '#E91E63'}}
                  >
                    Investors
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  )
}
