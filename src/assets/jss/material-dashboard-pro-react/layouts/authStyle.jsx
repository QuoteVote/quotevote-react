import React from 'react';

import {
  whiteColor,
  blackColor,
  hexToRgb,
} from 'assets/jss/material-dashboard-pro-react'

const pagesStyle = (theme) => ({
  content: {
    backgroundSize: 'cover',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    backgroundPosition: 'center center',
    '& footer': {
      position: 'absolute',
      bottom: '0',
      width: '100vw',
      border: 'none !important',
    },
    '&:before,&:after': {
      display: 'block',
      content: '""',
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      top: '0',
      left: '0',
      zIndex: '2',
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 'fit-content!important',
      paddingBottom: 150,
      backgroundSize: 'cover',
    },
  },
  wrapper: {
    height: 'auto',
    minHeight: '100vh',
    position: 'relative',
    top: '0',
  },
  fullPage: {
    position: 'relative',
    display: 'flex!important',
    margin: '0',
    border: '0',
    color: whiteColor,
    top: 80,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'fit-content!important',
    },
  },
  requestAccessFullPage: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex!important',
    margin: '0',
    border: '0',
    color: whiteColor,
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'fit-content!important',
    },
    '& footer': {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      border: 'none !important',
    },
    '&:before': {
      backgroundColor: `rgba(${hexToRgb(blackColor)}, 0.65)`,
    },
    '&:before,&:after': {
      display: 'block',
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      zIndex: '2',
    },
  },
})

export default pagesStyle
