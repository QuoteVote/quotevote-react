import React from 'react'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'

import Popover from '@material-ui/core/Popover'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import LinearProgress from '@material-ui/core/LinearProgress'

import { GET_USERS } from 'graphql/query'

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto',
    maxHeight: 240,
  },
  paper: {
    padding: theme.spacing(1),
    overflow: 'hidden',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const ApproveRejectPopover = (props) => {
  const classes = useStyles()
  const { loading, data } = useQuery(GET_USERS)
  const {
    anchorEl, handlePopoverClose, type, approvedBy, rejectedBy,
  } = props
  const list = []
  const typeArray = type === 'approved' ? approvedBy : rejectedBy

  if (data) {
    data.users.forEach((user) => {
      if (typeArray.includes(user._id)) {
        list.push(user.name)
      }
    })
  }

  const renderListItems = () => {
    if (list.length > 0) {
      return list.map((user) => (
        <ListItem button className={classes.nested}>
          <ListItemText primary={user} />
        </ListItem>
      ))
    }

    return (
      <ListItem className={classes.nested}>
        <ListItemText primary={`No user ${type} this post yet.`} />
      </ListItem>
    )
  }

  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem>
          <ListItemText primary={`Users who ${type} this post:`} />
        </ListItem>
        <Collapse in timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.root}>
            {loading ? <LinearProgress /> : renderListItems()}
          </List>
        </Collapse>
      </List>
    </Popover>
  )
}

ApproveRejectPopover.propTypes = {
  anchorEl: PropTypes.object,
  handlePopoverClose: PropTypes.func,
  type: PropTypes.string,
  approvedBy: PropTypes.array,
  rejectedBy: PropTypes.array,
}

export default ApproveRejectPopover
