import React from 'react'

import CreditCardInput from 'react-credit-card-input'
import { Field } from 'formik'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import { FormikTextField, FormikNumberField } from 'components/common/FormikFields'

import reqAccessPersonal from 'assets/img/RequestAccess/PersonalPlan.png'
import stripeImg from 'assets/img/RequestAccess/stripe.png'
import PropTypes from 'prop-types'

import requestAccessStyles from './requestAccessStyles'

const useStyles = makeStyles(requestAccessStyles)

const PersonalForm = (props) => {
  const classes = useStyles()
  const {
    requestSubmitted, isContinued, setContinued, values, setFieldValue, handleSubmit
  } = props
  const { cost, creditCard } = values

  const isFormSubmitted = requestSubmitted.personal

  const handleChange = (e, field) => {
    setFieldValue(`creditCard[${field}]`, e.target.value)
  }

  return (
    <Grid container justify="center" style={{ marginRight: 24 }} spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" className={classes.header}>
          {isFormSubmitted ? 'Thank you for' : 'Get access to your'}
          {' '}
          <span className={classes.header} style={{ color: '#00cf6e' }}>
            {isFormSubmitted ? 'joining us' : 'Personal Plan!'}
          </span>
        </Typography>
      </Grid>
      <Grid item xs={12} hidden={isFormSubmitted}>
        <Typography align="center" className={classes.subHeader}>
          Pay what you like, or pay nothing at all
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ marginTop: isFormSubmitted ? '4%' : '2%' }}>
        <Grid container spacing={2}>
          <Grid container item xs={6} justify="center" alignItems="center">
            <img
              alt={reqAccessPersonal}
              height={500}
              src={`${reqAccessPersonal}`}
              style={{
                width: '489px',
                height: '265px',
                objectFit: 'contain',
              }}
            />
          </Grid>
          {isFormSubmitted ? (
            <Grid container item xs={6} justify="center" alignItems="center">
              <Typography className={classes.message}>
                <b>You selected the Personal Plan</b>
                , and we
                <br/>
                are excited to talk with you.
                <br />
                <br />
                When an account becomes available, an
                <br />
                invite will be sent to the email address you
                <br />
                provided.
              </Typography>
            </Grid>
          ) : (
            <Grid item container xs={6} spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader
                    avatar={(
                      <Typography className={classes.stepNumber}>
                        1
                      </Typography>
                    )}
                    title={(
                      <Typography
                        style={{
                          font: 'Roboto',
                          fontsize: '18px',
                          lineHeight: 1.56,
                        }}
                      >
                        Your Personal Info
                      </Typography>
                    )}
                  />
                  {!isContinued && (
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Field
                            label="First Name"
                            name="firstName"
                            component={FormikTextField}
                            fullWidth
                            isRequired
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            label="Last Name"
                            name="lastName"
                            component={FormikTextField}
                            fullWidth
                            isRequired
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            label="Email"
                            name="email"
                            component={FormikTextField}
                            fullWidth
                            isRequired
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button variant="contained" className={classes.greenBtn} onClick={() => setContinued(true)}>
                            Continue
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  )}
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader
                    avatar={(
                      <Typography className={classes.stepNumber}>
                        2
                      </Typography>
                    )}
                    title={(
                      <Typography className={classes.stepName}>
                        Would you like to support this app?
                      </Typography>
                    )}
                  />
                  {isContinued && (
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography className={classes.note}>
                            Payment will not be charged until invite is sent
                          </Typography>
                        </Grid>
                        <Grid container item xs={12}>
                          <CreditCardInput
                            cardNumberInputProps={{
                              value: creditCard.cardNumber,
                              onChange: (e) => handleChange(e, 'cardNumber'),
                            }}
                            cardExpiryInputProps={{
                              value: creditCard.expiry,
                              onChange: (e) => handleChange(e, 'expiry'),
                            }}
                            cardCVCInputProps={{
                              value: creditCard.cvc,
                              onChange: (e) => handleChange(e, 'cvc'),
                            }}
                            containerStyle={{ width: '100%' }}
                            inputStyle={{ width: '100%' }}
                            customTextLabels={{
                              cardNumberPlaceholder: 'Credit Card Number',
                            }}
                            fieldClassName="input"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            label="Cost"
                            name="cost"
                            component={FormikNumberField}
                            fullWidth
                          />
                        </Grid>
                        <Grid container item xs={6} justify="flex-start" alignItems="center">
                          <Typography className={classes.stepName} display="inline" align="center">
                            <b>
                              Total: $
                              {cost}
                            </b>
                          </Typography>
                        </Grid>
                        <Grid container item xs={6} alignItems="center">
                          <img
                            alt={stripeImg}
                            src={`${stripeImg}`}
                            style={{
                              width: '90px',
                              height: '19px',
                              opacity: 0.4,
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Button variant="contained" className={classes.greenBtn} onClick={handleSubmit}>
                            Request Invite
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  )}
                </Card>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

PersonalForm.propTypes = {
  isContinued: PropTypes.any,
  setContinued: PropTypes.func,
}
export default PersonalForm
