import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: (props) => props.color,
    minHeight: '75px',
    display: 'flex',
  },
  [theme.breakpoints.down('sm')]: {
    avatarStyle: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
  [theme.breakpoints.up('md')]: {
    avatarStyle: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
  [theme.breakpoints.up('lg')]: {
    avatarStyle: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  },
}))

export default function Alert(props) {
  const classes = useStyles(props)

  return (
    <Box boxShadow={3} className={classes.root}>
      <Grid container direction="row" justify="space-between" alignContent="flex-end" spacing={1}>
        <div
          style={{
            width: '10%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignContent: 'center',
            marginLeft: '15px',
          }}
        >

          <p
            style={{
              color: 'white',
              font: 'League Spartan',
              fontWeight: 'bold',
              paddingLeft: '15px',
              paddingTop: '10px',
              fontSize: '10px',
            }}
          >
            {props.time}
          </p>
          <p
            style={{
              color: 'white',
              font: 'League Spartan',
              fontWeight: 'bold',
              paddingLeft: '10px',
              margin: '0px',
              fontSize: '20px',
            }}
          >
            {props.points}
          </p>
        </div>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignContent: 'center',
          }}
        >
          <Tooltip title={props.creator.name}>
            <Avatar alt={props.creator.name} src={props.creator.profileImageUrl} className={classes.avatarStyle} />
          </Tooltip>
        </div>
        <div
          style={{
            width: '70%',
            height: '100%',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Grid
            container
            direction="row"
            justify="left"
            alignContent="left"
          >
            <p
              style={{
                color: 'white',
                font: 'League Spartan',
                fontWeight: 'bold',
                paddingLeft: '10px',
                paddingBottom: '5px',
                paddingTop: '25px',
              }}
            >
              {props.AlertTitle}
            </p>
            <p
              style={{
                color: 'white',
                font: 'League Spartan',

                paddingLeft: '10px',
                paddingBottom: '5px',
                paddingTop: '25px',
              }}
            >
              {props.AlertBody}
            </p>


          </Grid>

        </div>

        <div
          style={{
            width: '10%',
            height: '100%',
            display: 'flex',
            paddingTop: '25px',
            paddingRight: '5px',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <CloseIcon style={{ color: 'white', height: '15px' }} />
        </div>
      </Grid>
    </Box>
  )
}
