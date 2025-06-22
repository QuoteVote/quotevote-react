import React from 'react';

import {
  defaultFont,
  container,
  containerFluid,
  primaryColor,
  whiteColor,
  grayColor,
} from 'assets/jss/material-dashboard-pro-react'

const footerStyle = (theme) => ({
  block: {
    textTransform: 'none',
  },
  left: {
    float: 'left!important',
    display: 'block',
  },
  right: {
    margin: '0',
    fontSize: '14px',
    float: 'right!important',
    padding: '15px',
  },
  grow: {
    flexGrow: 1,
  },
  footer: {
    bottom: '0',
    borderTop: `1px solid ${grayColor[15]}`,
    ...defaultFont,
  },
  container: {
    zIndex: 3,
    ...container,
    position: 'relative',
    width: '95%!important',
  },
  containerFluid: {
    zIndex: 3,
    ...containerFluid,
    position: 'relative',
  },
  a: {
    color: primaryColor[0],
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0',
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0',
    width: 'auto',
  },
  whiteColor: {
    '&,&:hover,&:focus': {
      color: whiteColor,
    },
  },
  links: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    float: 'right',
  },
})
export default footerStyle
