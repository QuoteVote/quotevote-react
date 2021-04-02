import {
  cardTitle, container, grayColor, whiteColor,
} from 'assets/jss/material-dashboard-pro-react'
import { green } from '@material-ui/core/colors'

const landingPageStyle = (theme) => ({
  container: {
    ...container,
    zIndex: '4',
    minWidth: '100%',
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
  listItem: {
    position: 'relative',
    display: 'block',
    width: 'auto',
    marginLeft: 5,
    padding: '0',
  },
  listItemTextRequestInvite: {
    backgroundColor: '#00cf6e',
    color: 'white',
    '&:hover': {
      backgroundColor: '#00cf6e',
    },
    width: 200,
    fontSize: 15,
    whiteSpace: 'nowrap',
    marginLeft: 5,
    marginRight: 5,
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
    marginTop: 30,
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
      margin: ((props) => props.isMobile ? theme.spacing(1) : theme.spacing(2)),
    },
  },
  opinionsText: {
    maxWidth: '400px',
    [theme.breakpoints.down('sm')]: {
      margin: 10,
    },
  },
  greenText: {
    color: '#00cf6e',
  },
  inactiveIndicator: {
    fontSize: '25px',
  },
  activeIndicator: {
    fontSize: '25px',
    color: '#00cf6e',
  },
  bottomText: {
    fontSize: '18px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      marginLeft: ((props) => props.isMobile ? 0 : 100),
      marginTop: 10,
    },
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
  requestInvite: {
    textTransform: 'none',
    backgroundColor: '#00cf6e',
    color: 'white',
    '&:hover': {
      backgroundColor: '#00cf6e',
    },
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      marginTop: ((props) => props.isMobile ? 10 : 20),
      marginLeft: ((props) => props.isMobile ? 25 : 100),
      width: 200,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: ((props) => props.isMobile ? 20 : 10),
      marginLeft: ((props) => props.isMobile ? 25 : 200),
      width: 200,
    },
  },
  investButton: {
    textTransform: 'none',
    color: '#00cf6e',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      marginTop: 20,
      marginLeft: ((props) => props.isMobile ? 25 : 100),
      width: ((props) => props.isMobile ? 100 : 200),
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 20,
      marginLeft: ((props) => props.isMobile ? 25 : 200),
      width: ((props) => props.isMobile ? 100 : 200),
    },
  },
  select: {
    fontSize: 25,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 60,
    },
  },
  plans: {
    paddingLeft: 50,

  },
  planAvatar: {
    height: 300,
    marginBottom: 20,
  },
  planButton: {
    color: '#FFF',
    borderColor: '#FFF',
    width: 100,
    [theme.breakpoints.down('xs')]: {
      marginTop: 20,
      width: '80%',
    },
  },
  inputContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 45,
    width: 250,
    marginRight: 20,
    paddingLeft: 20,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 20,
      marginRight: 0,
    },
  },
  requestAccessBtn: {
    textTransform: 'none',
    backgroundColor: '#00cf6e',
    color: 'white',
    width: 150,
    height: 45,
    fontSize: 16,
    marginRight: 5,
    '&:hover': {
      backgroundColor: '#00cf6e',
    },
    [theme.breakpoints.down('sm')]: {
      width: 250,
    },
  },
})

export default landingPageStyle
