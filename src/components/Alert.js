/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: (props) => props.color,
    minHeight: '75px',
    display: 'flex',
    color: 'white',
    borderRadius: 7,
    padding: 10,
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
  titleWrapper: {
    marginLeft: 10,
  },
  favoriteIcon: {
    color: 'white',
    height: '55px',
  },
  closeIcon: {
    color: 'white',
    height: '15px',
  },
}))

export default function Alert(props) {
  const classes = useStyles(props)

  return (
    <Box boxShadow={3} className={classes.root}>
      <Grid container direction="row">
        <Grid className={classes.titleWrapper} item xs={10}>
          <Typography variant="overline">
            {`${props.AlertTitle} - ${props.AlertBody}`}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <CloseIcon className={classes.closeIcon} />
        </Grid>

        <Grid
          item
          alignItems="center"
          container
          direction="row"
          xs={12}
        >
          <Grid item xs={3}>
            <Avatar alt={props.creator.name} src={props.creator.profileImageUrl} className={classes.avatarStyle} />
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            item
            xs={8}
          >
            <Grid item>
              <Typography variant="subtitle2">
                {props.creator.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="overline">
                {props.time}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <FavoriteBorderIcon className={classes.favoriteIcon} />
          </Grid>
        </Grid>

      </Grid>
    </Box>
  )
}
