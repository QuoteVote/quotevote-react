import React from 'react'
import { Typography } from '@material-ui/core'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import { green } from '@material-ui/core/colors'
import styles from '../../assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import personalPlanImg from '../../assets/img/RequestAccess/PersonalPlan.png'

const useStyles = makeStyles(styles)
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
})

export default function LandingPageContent() {
  const classes = useStyles()
  return (
    <GridContainer justify="center" style={{ marginRight: 24 }}>
      <GridItem xs={12}>
        <Typography
          align="center"
          className={classes.share}
        >
          Share
          {' '}
          <span className={classes.yourVoice}>
            your voice
          </span>
          , democratically
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
            <Button variant="outlined">Personal</Button>
            <Button variant="outlined">Business</Button>
            <Button variant="outlined">Investors</Button>
          </div>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={8} md={5} lg={4} xl={3}>
        <GridContainer justify="center">
          <img
            alt={personalPlanImg}
            height={500}
            src={`${personalPlanImg}`}
            style={{
              width: '435.43px',
              height: '300.51px',
              objectFit: 'contain',
            }}
          />
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={4} md={3}>
        <GridContainer justify="center">
          <Typography>
            <div className={classes.opinionsText}>
              <b>Share your opinions</b>
              {' '}
              with friends and/or strangers,
              <br />
              work in projects with your teams, vote transparently
              <br />
              and more.
              <br />
              <br />
              <b>Join a growing community of more than 1047 people</b>
              <br />
              in honest and informed conversations. VoxPop is yours
              <br />
              to shape.
              <br />
              <br />
              <div>
                <ThemeProvider theme={theme}>
                  <Typography className={classes.whatElse}>
                    <Button variant="contained" color="primary" className={classes.getAccessButton}>
                      Get Access
                    </Button>
                    {' '}
                    What else do
                    <span className={classes.weHave}> we have </span>
                    for you?
                    <IconButton color="primary" aria-label="What's next">
                      <DoubleArrowIcon />
                    </IconButton>
                  </Typography>
                </ThemeProvider>
              </div>
            </div>
          </Typography>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}
