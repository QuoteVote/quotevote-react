import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/react-hooks'
import { FOLLOW_MUTATION } from 'graphql/mutations'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  followButton: {
    color: theme.subHeader.followButton.color,
    backgroundColor: theme.subHeader.followButton.backgroundColor,
  },
}))


function FollowButton({ isFollowing, profileUserId }) {
  const classes = useStyles()
  // TODO handle data object
  const [followMutation] = useMutation(FOLLOW_MUTATION)
  if (isFollowing) {
    return (
      <Button
        variant="contained"
        className={classes.followButton}
        onClick={() => followMutation({ variables: { user_id: profileUserId, action: 'un-follow' } })}
      >
        Un-Follow
      </Button>
    )
  }

  return (
    <Button
      variant="contained"
      className={classes.followButton}
      onClick={() => followMutation({ variables: { user_id: profileUserId, action: 'follow' } })}
    >
      Follow
    </Button>
  )
}

FollowButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  profileUserId: PropTypes.string.isRequired,
}

export default FollowButton
