import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import { Typography } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import Carousel from 'react-material-ui-carousel'
import About1Image from 'assets/svg/AboutUs1.svg'
import About2Image from 'assets/svg/AboutUs2.svg'
import About3Image from 'assets/svg/AboutUs3.svg'
import About4Image from 'assets/svg/AboutUs4.svg'
import About5Image from 'assets/svg/AboutUs5.svg'
import withWidth from '@material-ui/core/withWidth'
import GridItem from '../../mui-pro/Grid/GridItem'
import GridContainer from '../../mui-pro/Grid/GridContainer'

const useStyles = makeStyles(styles)

export const MOBILE_IMAGE_WIDTH = 250

const images = [About1Image, About2Image, About3Image, About4Image, About5Image]

function AboutPage() {
  const classes = useStyles({ isMobile })
  return (
    <div className={classes.container}>
      <GridContainer justify="center" style={{ marginRight: 24 }}>
        <GridItem xs={12}>
          <Typography
            align="center"
            className={classes.share}
          >
            About
            {' '}
            <span className={classes.greenTitleText}>
              Us
            </span>
          </Typography>
        </GridItem>
        <GridItem>
          <Carousel
            activeIndicatorProps={{
              className: classes.activeIndicator,
            }}
            indicatorProps={{
              className: classes.inactiveIndicator,
            }}
          >
            {images.map((image, i) => (
              <div>
                <img
                  alt="About us"
                  src={image}
                  key={i}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    margin: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </Carousel>
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default withWidth()(AboutPage)
