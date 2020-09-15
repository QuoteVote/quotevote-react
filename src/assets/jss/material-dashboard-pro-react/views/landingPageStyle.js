import {
  cardTitle, container, grayColor, whiteColor,
} from 'assets/jss/material-dashboard-pro-react'
import { green } from '@material-ui/core/colors'

const landingPageStyle = (theme) => ({
  container: {
    ...container,
    zIndex: '4',
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor,
  },
  textCenter: {
    textAlign: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center !important',
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: whiteColor,
    },
    marginLeft: '5px',
    marginRight: '5px',
  },
  inputAdornment: {
    marginRight: '18px',
  },
  inputAdornmentIcon: {
    color: grayColor[6],
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)',
  },
  cardHeader: {
    marginBottom: '20px',
  },
  socialLine: {
    padding: '0.9375rem 0',
  },
  share: {
    objectFit: 'contain',
    font: 'Montserrat',
    fontSize: '34px',
    fontWeight: 'bold',
    letterspacing: '0.25px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '34px',
    },
  },
  greenTitleText: {
    objectFit: 'contain',
    font: 'Montserrat',
    fontSize: '34px',
    fontWeight: 'bold',
    letterspacing: '0.25px',
    color: '#00cf6e',
  },
  fits: {
    height: '28px',
    font: 'Roboto',
    fontSize: '22px',
    letterspacing: '0.25px',
    lineHeight: 1.27,
    margin: theme.spacing(2),
  },
  buttonSpacing: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  opinionsText: {
    maxWidth: '400px',
  },
  greenText: {
    color: '#00cf6e',
  },
  bottomText: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  sendEmail: {
    background: 'white',
    backgroundColor: 'white',
    color: 'white',
    borderRadius: '8px',
  },
  sendEmailButton: {
    backgroundColor: green[500],
    color: 'white',
    '&:hover': {
      backgroundColor: green[700],
      color: 'white',
    },
  },
})

export default landingPageStyle
