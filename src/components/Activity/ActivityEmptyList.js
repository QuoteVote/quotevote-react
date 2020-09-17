import React from 'react'
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import GridContainer from '../../mui-pro/Grid/GridContainer'
import GridItem from '../../mui-pro/Grid/GridItem'
import ActivityFindSvg from '../../assets/svg/ActivityFind.svg'
const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00CF6E',
    },
    secondary: {
      main: '#E91E63',
    },
  },
})
const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    textAlign: 'center',
    alignContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '5px',
    },
  },
  emptyMessage: {
    textAlign: 'center',
  },
  paragraph: {
    width: '45%',
    display: 'block',
    alignContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '20px',
    },
  },
  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignContent: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '130px',
    },
  },
  buttons: {
    margin: '20px 20px 20px 20px',
  },
}))
function ActivityEmptyList() {
  const classes = useStyles()
  return (
    <GridContainer className={classes.root}>
      <GridItem xs={12}>
        <p className={classes.paragraph}>
          Welcome to VoxPOP. To read some ideas you need to start following people. You can find your friends or you
          could go to the trending page and follow anyone.
        </p>
      </GridItem>
      <GridItem xs={12}>
        <img
          alt="Add Buddy / Find Posts"
          src={ActivityFindSvg}
        />
      </GridItem>
      <GridItem xs={12}>
        <MuiThemeProvider theme={customTheme}>
          <Button variant="contained" color="secondary" className={classes.buttons}>
            FIND FRIENDS
          </Button>
          <Button variant="contained" color="primary" className={classes.buttons}>
            GO TO TRENDING
          </Button>
        </MuiThemeProvider>
      </GridItem>
    </GridContainer>
  )
}

export default ActivityEmptyList
