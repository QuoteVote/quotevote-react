import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import { Typography } from '@material-ui/core'
import GridContainer from '../../mui-pro/Grid/GridContainer'
import GridItem from '../../mui-pro/Grid/GridItem'
import PeopleWavingImg from '../../assets/img/PeopleWaving.png'

const useStyles = makeStyles(styles)

export default function InvestorThanks() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <GridContainer justify="center" style={{ marginRight: 24 }}>
        <GridItem xs={12} sm={5}>
          <GridContainer justify="center">
            <img
              alt={PeopleWavingImg}
              src={`${PeopleWavingImg}`}
              style={{
                objectFit: 'contain',
              }}
            />
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <GridContainer justify="left">
            <Typography>
              <div className={classes.share}>
                We Will Be
                {' '}
                <span className={classes.greenTitleText}>
                  in Touch!
                </span>
              </div>
              <br />
              We will send updates as we seek legal guidance
              to plan our funding rounds.
              <b>Please check your inbox for an email confirming you are on our mailing list.</b>
            </Typography>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  )
}
