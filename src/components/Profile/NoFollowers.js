import React from 'react'
import PropTypes from 'prop-types'
// MUI
import { makeStyles, MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

//  Local
import EmptyFollowing from 'assets/img/EmptyFollowing.png'
import EmptyFollowers from 'assets/img/EmptyFollowers.png'
import mainTheme from '../../themes/MainTheme'

const useStyles = makeStyles((theme) => ({
  buttonPrimary: {
    color: theme.subHeader.followButton.color,
    backgroundColor: theme.subHeader.followButton.backgroundColor,
  },
  buttonSecondary: {
    color: theme.palette.primary,
    backgroundColor: theme.subHeader.followButton.backgroundColor,
  },
}))

export default NoFollowers

/**
  * Component to display when there are no followers
  @param {props} filter - Followers or Following
  @returns {JSX.element}
*/
function NoFollowers({ filter }) {
  const classes = useStyles()

  return (
    <ThemeProvider theme={mainTheme}>
      <Grid
        container
        className={classes.followDisplay}
        id="component-followers-display"
      >
        <Grid
          item
          container
          direction="column"
          className={classes.followDisplayWrapper}
          align="center"
          xs={12}
          md={8}
          id="component-banner"
        >
          <div id="component-empty-follow-verbiage">
            {
              filter === 'following' ? (
                <Typography variant="p">
                  Here you are going to see people that you like their ideas.  You couple fellow people on the trending page or find some friends.
                </Typography>
              ) : (
                <Typography variant="p">
                  Here you are going to see people that like your ideas.  Start writing to attract people to follow you.
                </Typography>
              )
            }
          </div>
          <div id="component-empty-follow-image">
            {
              filter === 'following' ? (
                <img
                  alt="EmptyFollowing"
                  src={EmptyFollowing}
                />
              ) : (
                <img
                  alt="EmptyFollowers"
                  src={EmptyFollowers}
                />
              )
            }

          </div>
          <div id="component-empty-follow-actions">
            {
              filter === 'following' ? (
                <>
                  <Button variant="contained" color="secondary">
                    Find Friends
                  </Button>
                  <Button variant="contained" color="primary">
                    Go to Trending
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="contained" color="secondary">
                    Create a Post
                  </Button>
                </>
              )
            }

          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

NoFollowers.propTypes = {
  filter: PropTypes.string.isRequired,
}
