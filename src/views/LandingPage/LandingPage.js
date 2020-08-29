import React from 'react'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import { grey, green } from '@material-ui/core/colors'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import personalPlanImg from '../../assets/img/RequestAccess/PersonalPlan.png'
import GridContainer from '../../mui-pro/Grid/GridContainer'
import GridItem from '../../mui-pro/Grid/GridItem'
import SelectPlansButton from '../../components/SelectPlansButton'
import GetAccessButton from '../../components/GetAccessButton'

const useStyles = makeStyles(styles)

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: grey,
  },
})

export default function LandingPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.container}>
      <ThemeProvider theme={theme}>
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
                <SelectPlansButton variant="outlined" color="secondary">Personal</SelectPlansButton>
                <SelectPlansButton variant="outlined" color="secondary">Business</SelectPlansButton>
                <SelectPlansButton variant="outlined" color="secondary">Investors</SelectPlansButton>
              </div>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={5}>
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
          <GridItem xs={12} sm={4}>
            <GridContainer justify="center">
              <Typography>
                <div className={classes.opinionsText}>
                  <b>Share your opinions</b>
                  {' '}
                  with friends and/or strangers,
                  work in projects with your teams, vote transparently
                  and more.
                  <br />
                  <br />
                  <b>Join a growing community of more than 1047 people</b>
                  in honest and informed conversations. VoxPop is yours
                  to shape.
                  <br />
                  <br />
                </div>
              </Typography>
              <Typography className={classes.whatElse}>
                <GetAccessButton
                  variant="contained"
                  color="primary"
                >
                  Get Access
                </GetAccessButton>
                {' '}
                What else do
                <span className={classes.weHave}> we have </span>
                for you?
                <IconButton color="primary" aria-label="What's next">
                  <DoubleArrowIcon />
                </IconButton>
              </Typography>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </ThemeProvider>
    </div>
  )
}
