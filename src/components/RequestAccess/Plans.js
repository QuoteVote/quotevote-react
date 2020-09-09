import React from 'react'

import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CheckIcon from '@material-ui/icons/Check'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import reqAccessBusiness from 'assets/img/RequestAccess/Illustration.png'
import reqAccessPersonal from 'assets/img/RequestAccess/PersonalPlan.png'
import PropTypes from 'prop-types'
import requestAccessStyles from './requestAccessStyles'

const useStyles = makeStyles(requestAccessStyles)

const PersonalPlanRadio = withStyles({
  root: {
    color: '#157ffb',
    '&$checked': {
      color: '#157ffb',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)

const BusinessPlanRadio = withStyles({
  root: {
    color: '#791e89',
    '&$checked': {
      color: '#791e89',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)

const RequestButton = (props) => {
  const { classes, onClickRequest } = props

  return (
    <Button
      variant="contained"
      className={classes.requestBtn}
      onClick={() => onClickRequest(true)}
    >
      Request Access
    </Button>
  )
}

RequestButton.propTypes = {
  classes: PropTypes.object,
  onClickRequest: PropTypes.func,
}

const Plans = (props) => {
  const classes = useStyles()
  const {
    onPlanSelect, selectedPlan, setRequest, setCardDetails, cardDetails,
  } = props

  // selectedPlan can be null
  const isBusiness = selectedPlan === 'business'
  const isPersonal = selectedPlan === 'personal'

  return (
    <Grid container justify="center" style={{ marginRight: 24 }}>
      <Grid item xs={12} style={{ marginBottom: '5%' }}>
        <Typography align="center" className={classes.plansHeader}>
          What is best for you
          {' '}
          <span
            className={classes.plansHeader}
            style={{ color: '#00cf6e' }}
          >
            ?
          </span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={6}>
          <Grid item xs={3} style={{ marginRight: '15%', position: 'relative' }}>
            {isPersonal && <RequestButton classes={classes} onClickRequest={setRequest} />}
            <img
              alt={reqAccessPersonal}
              height={500}
              src={`${reqAccessPersonal}`}
              className={classes.plansCardImage}
            />
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography align="center" className={classes.plansCardHeader}>
                      Personal Plan
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" className={classes.plansCardText}>
                      <CheckIcon fontSize="inherit" className={classes.checkIconPersonal} />
                      Pay what you like
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: 20 }}>
                    <Typography align="center" className={classes.plansCardText}>
                      <CheckIcon fontSize="inherit" className={classes.checkIconPersonal} />
                      Free for individuals
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" className={classes.plansCardText}>
                      Full access
                      {' '}
                      <span
                        className={classes.plansCardText}
                        style={{
                          opacity: 0.8,
                          borderRadius: 5,
                          border: 'solid 1px #157ffb',
                          backgroundColor: '#157ffb',
                          color: 'white',
                        }}
                      >
                        for free
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" className={classes.plansCardText} style={{ color: '#157ffb' }}>
                      <PersonalPlanRadio
                        checked={isPersonal}
                        value="personal"
                        onChange={(e) => onPlanSelect(e.target.value)}
                      />
                      This works for me
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center">
                      <Link
                        component="button"
                        href="https://"
                        className={classes.link}
                      >
                        I would like to read more
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} style={{ position: 'relative' }}>
            {isBusiness && <RequestButton classes={classes} onClickRequest={setRequest} />}
            <img
              alt={reqAccessBusiness}
              height={500}
              src={`${reqAccessBusiness}`}
              className={classes.plansCardImage}
            />
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography align="center" className={classes.plansCardHeader}>
                      Business Plan
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" className={classes.plansCardText}>
                      <CheckIcon fontSize="inherit" className={classes.checkIconBusiness} />
                      License for Professionals
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: 20 }}>
                    <Typography align="center" className={classes.plansCardText}>
                      <CheckIcon fontSize="inherit" className={classes.checkIconBusiness} />
                      &#162;10 per
                      {' '}
                      <span style={{ color: '#791e89' }}>POP</span>
                      {' '}
                      Prediction
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" className={classes.plansCardText}>
                      <span
                        className={classes.plansCardText}
                        style={{
                          opacity: 0.8,
                          borderRadius: 5,
                          border: 'solid 1px #791e89',
                          backgroundColor: '#791e89',
                          color: 'white',
                        }}
                      >
                        $10
                      </span>
                      {' '}
                      / month
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" className={classes.plansCardText} style={{ color: '#791e89' }}>
                      <BusinessPlanRadio
                        checked={isBusiness}
                        value="business"
                        onChange={(e) => {
                          onPlanSelect(e.target.value)
                          setCardDetails({ ...cardDetails, cost: 10 })
                        }}
                      />
                      This works for me
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center">
                      <Link
                        component="button"
                        href="https://"
                        className={classes.link}
                      >
                        I would like to read more
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
Plans.propTypes = {
  onPlanSelect: PropTypes.any,
  selectedPlan: PropTypes.any,
  setRequest: PropTypes.func,
  setCardDetails: PropTypes.func,
  cardDetails: PropTypes.func,
}

export default Plans
