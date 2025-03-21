import React, { useState } from 'react'

import { makeStyles, MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles'
import PersonalPlanCarousel from './PersonalPlanCarousel'
import styles from '../../../assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import theme from '../../../themes/MainTheme'

const useStyles = makeStyles(styles)

export default {
  component: PersonalPlanCarousel,
  title: 'Landing Page',
}
function Wrapper() {
  const classes = useStyles()
  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState(0)
  return (

    <ThemeProvider theme={theme}>
      <PersonalPlanCarousel classes={classes} setCarouselCurrentIndex={setCarouselCurrentIndex} carouselCurrentIndex={carouselCurrentIndex} />
    </ThemeProvider>
  )
}

export const PersonalPlanCarouselContent = () => <Wrapper />

PersonalPlanCarouselContent.story = {
  parameters: {
    jest: ['PersonalPlanCarousel.test.js'],
  },
}
