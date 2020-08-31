import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import reqAccessPersonal from 'assets/img/RequestAccess/PersonalPlan.png'

const useStyles = makeStyles((theme) => ({
  greenBtn: {
    textTransform: 'none',
    backgroundColor: '#00cf6e',
    color: 'white',
    float: 'right',
    '&:hover': {
      backgroundColor: '#00cf6e',
    },
  },
  header: {
    height: '41px',
    objectFit: 'contain',
    font: 'Montserrat',
    fontSize: '34px',
    fontWeight: 'bold',
    letterspacing: '0.25px',
  },
  subHeader: {
    height: '28px',
    font: 'Roboto',
    fontSize: '22px',
    letterspacing: '0.25px',
    lineHeight: 1.27,
  },
  stepNumber: {
    width: '22px',
    height: '28px',
    borderRadius: '6px',
    backgroundColor: '#00cf6e',
    opacity: 0.85,
    font: 'Roboto',
    fontsize: '18px',
    lineHeight: 1.56,
    color: '#ffffff',
    padding: '3px 6px',
  },
  stepName: {
    font: 'Roboto',
    fontsize: '18px',
    lineHeight: 1.56,
  },
  note: {
    font: 'Roboto',
    fontsize: '16px',
    lineHeight: 1.56,
    color: '#424556',
  },
}))

const PersonalForm = (props) => {
  const classes = useStyles()
  const { isContinued, setContinued } = props
  return (
    <Grid container justify="center" style={{ marginRight: 24 }} spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" className={classes.header}>
          Get access to your
          {' '}
          <span className={classes.header} style={{ color: '#00cf6e' }}>
            Personal Plan!
          </span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" className={classes.subHeader}>
          Pay what you like, or pay nothing at all
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
                        <TextField label="First Name" required fullWidth />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="Company Name" required fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Email" required fullWidth />
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
                      <Grid item xs={12}>
                        <TextField label="Credit Card Number" required fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.stepName}>
                          Total:
                          {' '}
                          <b>$10</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        Stripe logo here...
                      </Grid>
                      <Grid item xs={6}>
                        <Button variant="contained" className={classes.greenBtn} onClick={() => setContinued(false)}>
                          Request Invite
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                )}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PersonalForm
