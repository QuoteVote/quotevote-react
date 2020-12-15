import React from 'react'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'

function RequestInviteCarouselButton({ classes }) {
  const history = useHistory()
  return (
    <Hidden mdUp>
      <Grid item xs={12}>
        <Button
          variant="contained"
          className={classes.requestInvite}
          type="submit"
          onClick={() => history.push('/auth/request-access')}
        >
          Request Invite
        </Button>
      </Grid>
    </Hidden>
  )
}

RequestInviteCarouselButton.propTypes = {
  classes: PropTypes.object,
}
export default RequestInviteCarouselButton
