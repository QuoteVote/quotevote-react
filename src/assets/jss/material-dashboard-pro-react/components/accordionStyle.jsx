import React from 'react';

import { primaryColor, grayColor } from '../../material-dashboard-pro-react'

const accordionStyle = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '20px',
  },
  expansionPanel: {
    boxShadow: 'none',
    '&:before': {
      display: 'none !important',
    },
  },
  expansionPanelExpanded: {
    margin: '0 !important',
  },
  expansionPanelSummary: {
    minHeight: 'auto !important',
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${grayColor[5]}`,
    padding: '25px 10px 5px 0px',
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
    color: grayColor[2],
    '&:hover': {
      color: primaryColor[0],
    },
  },
  expansionPanelSummaryExpaned: {
    color: primaryColor[0],
    '& $expansionPanelSummaryExpandIcon': {
      [theme.breakpoints.up('md')]: {
        top: 'auto !important',
      },
      transform: 'rotate(180deg)',
      [theme.breakpoints.down('sm')]: {
        top: '10px !important',
      },
    },
  },
  expansionPanelSummaryContent: {
    margin: '0 !important',
  },
  expansionPanelSummaryExpandIcon: {
    [theme.breakpoints.up('md')]: {
      top: 'auto !important',
    },
    transform: 'rotate(0deg)',
    color: 'inherit',
    position: 'absolute',
    right: '20px',
    [theme.breakpoints.down('sm')]: {
      top: '10px !important',
    },
  },
  expansionPanelSummaryExpandIconExpanded: {},
  title: {
    fontSize: '15px',
    fontWeight: 'bolder',
    marginTop: '0',
    marginBottom: '0',
    color: '#E91E63',
  },
  expansionPanelDetails: {
    padding: '15px 0px 5px',
  },
})

export default accordionStyle
