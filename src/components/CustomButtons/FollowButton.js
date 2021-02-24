import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/react-hooks'
import { FOLLOW_MUTATION } from 'graphql/mutations'
import { GET_USER } from 'graphql/query'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'

const useStyles = makeStyles((theme) => ({
  followButton: {
    color: theme.subHeader.followButton.color,
    backgroundColor: theme.subHeader.followButton.backgroundColor,
  },
}))

/**
 * FollowButton - description
 *
 * @param  {string} isFollowing   description
 * @param  {string} profileUserId   description
 * @param  {type} otherProps description
 * @returns {JSX.Element} description
 */
function FollowButton({
  isFollowing,
  username,
  profileUserId,
  ...otherProps
}) {
  const classes = useStyles()
  // TODO handle data object
  const [followMutation] = useMutation(FOLLOW_MUTATION, {
    refetchQueries: [{
      query: GET_USER,
      variables: {
        username,
      },
    }],
  })
  if (isFollowing) {
    return (
      <Button
        variant="contained"
        className={classNames(classes.followButton, otherProps.className)}
        onClick={() => followMutation({ variables: { user_id: profileUserId, action: 'un-follow' } })}
      >
        Un-Follow
      </Button>
    )
  }

  return (
    <Button
      variant="contained"
      className={classNames(classes.followButton, otherProps.className)}
      onClick={() => followMutation({ variables: { user_id: profileUserId, action: 'follow' } })}
    >
      Follow
    </Button>
  )
}

FollowButton.propTypes = {
  username: PropTypes.string,
  isFollowing: PropTypes.any.isRequired,
  profileUserId: PropTypes.string.isRequired,
}

export default FollowButton
