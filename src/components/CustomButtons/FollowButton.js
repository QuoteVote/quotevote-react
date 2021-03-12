import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/react-hooks'
import { FOLLOW_MUTATION } from 'graphql/mutations'
import { GET_USER } from 'graphql/query'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import { updateFollowing } from 'store/user'

const useStyles = makeStyles((theme) => ({
  followButton: {
    color: theme.subHeader.followButton.color,
    backgroundColor: theme.subHeader.followButton.backgroundColor,
    '&:hover': {
      backgroundColor: theme.subHeader.followButton.backgroundColor,
    },
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
  const dispatch = useDispatch()
  const [followMutation] = useMutation(FOLLOW_MUTATION, {
    refetchQueries: [{
      query: GET_USER,
      variables: {
        username,
      },
    }],
  })

  const user = useSelector((state) => state.user)
  const followingArray = user.data._followingId

  async function handleClick(action) {
    let newFollowingArray
    if (action === 'un-follow') {
      newFollowingArray = _.without(followingArray, profileUserId)
    } else {
      newFollowingArray = _.concat(followingArray, profileUserId)
    }
    await updateFollowing(dispatch, newFollowingArray)
    await followMutation({ variables: { user_id: profileUserId, action: action } })
  }

  // TODO handle data object
  if (isFollowing) {
    const action = 'un-follow'
    return (
      <Button
        variant="contained"
        className={classNames(classes.followButton, otherProps.className)}
        onClick={() => handleClick(action)}
      >
        Un-Follow
      </Button>
    )
  }

  const action = 'follow'
  return (
    <Button
      variant="contained"
      className={classNames(classes.followButton, otherProps.className)}
      onClick={() => handleClick(action)}
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
