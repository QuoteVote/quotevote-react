import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Carousel from 'react-material-ui-carousel'
import withWidth from '@material-ui/core/withWidth'
import BusinessContent1Image from '../../../assets/svg/BusinessContent1.svg'
import BusinessContent2Image from '../../../assets/svg/BusinessContent2.svg'
import BusinessContent3Image from '../../../assets/img/BusinessContent3.png'

function BusinessCarouselFirstContent(props) {
  const { width, classes } = props
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ paddingLeft: 50, paddingRight: width === 'xs' ? 10 : 50 }}
    >
      <Grid item xs={12} md={7}>
        <img
          alt="Business"
          src={BusinessContent1Image}
          style={{
            width: width === 'xs' ? '400px' : '435.43px',
            height: '300.51px',
            objectFit: 'contain',
          }}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Typography>
          <div className={classes.opinionsText}>
            <p>
              <b>Talk to your team</b>
              {' '}
              , poll the entire company, assess their feedback,
              plan the next big company initiative that will knock it
              out of the park.
            </p>
            <br />
          </div>
        </Typography>
      </Grid>
    </Grid>
  )
}

BusinessCarouselFirstContent.propTypes = {
  width: PropTypes.string,
  classes: PropTypes.object,
}

function BusinessCarouselSecondContent(props) {
  const { width, classes } = props
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      style={{ paddingLeft: 50, paddingRight: width === 'xs' ? 10 : 50 }}
    >
      <Grid item xs={12} md={6}>
        <img
          alt="Business 2"
          src={BusinessContent2Image}
          style={{
            width: width === 'xs' ? '400px' : '435.43px',
            height: '300.51px',
            objectFit: 'contain',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>
          <div className={classes.opinionsText}>
            <p style={{ marginTop: width === 'xs' ? 0 : 20 }}>
              <b>Promote democracy and transparency</b>
              {' '}
              within your team. VoxPop makes it so the whole team
              can see progress in real time.
            </p>
            <br />
          </div>
        </Typography>
      </Grid>
    </Grid>
  )
}

BusinessCarouselSecondContent.propTypes = {
  width: PropTypes.string,
  classes: PropTypes.object,
}

function BusinessCarouselThirdContent(props) {
  const { width, classes } = props
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ paddingLeft: 50, paddingRight: width === 'xs' ? 10 : 50 }}
    >
      <Grid item xs={12} md={6}>
        <img
          alt="Business 2"
          src={BusinessContent3Image}
          style={{
            width: width === 'xs' ? '400px' : '380.43px',
            height: '300.51px',
            objectFit: 'contain',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>
          <div className={classes.opinionsText}>
            <p style={{ marginTop: width === 'xs' ? 0 : 20 }}>
              <b>
                Join 345 companies in creating a workspace in
                which everyone has a voice.
              </b>
              {' '}
              Poll to see what your employees value the most,
              converse to make the next big decision, and more.
            </p>
            <br />
            <p>
              <span className={classes.greenText}>voxPOP</span>
              {' '}
              is yours to shape.
            </p>
          </div>
        </Typography>
      </Grid>
    </Grid>
  )
}

BusinessCarouselThirdContent.propTypes = {
  width: PropTypes.string,
  classes: PropTypes.object,
}

function BusinessPlanCarousel(props) {
  const [contentIndex, setContentIndex] = useState(0)
  const { setCarouselCurrentIndex } = props
  return (
    <Carousel
      navButtonsAlwaysVisible
      index={contentIndex}
      onChange={(index) => {
        setCarouselCurrentIndex(index)
      }}
    >
      <BusinessCarouselFirstContent {...props} setContentIndex={setContentIndex} />
      <BusinessCarouselSecondContent {...props} setContentIndex={setContentIndex} />
      <BusinessCarouselThirdContent {...props} setContentIndex={setContentIndex} />
    </Carousel>
  )
}

BusinessPlanCarousel.propTypes = {
  classes: PropTypes.object,
  setCarouselCurrentIndex: PropTypes.func,
}

export default withWidth()(BusinessPlanCarousel)
