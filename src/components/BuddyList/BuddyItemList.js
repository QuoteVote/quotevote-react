import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import PropTypes from 'prop-types'
import { Avatar, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import AvatarDisplay from '../Avatar'
import { SELECTED_CHAT_ROOM } from '../../store/chat'

const useStyles = makeStyles(() => ({
  root: {
    width: 380,
    backgroundColor: 'transparent',
    color: 'white',
    height: '60vh',
    position: 'relative',
    overflow: 'auto',
  },
  blur: {
    opacity: 0.5,
  },
  inline: {
    display: 'inline',
  },
  divider: {
    backgroundColor: 'white',
  },
  count: {
    margin: 5,
    color: '#E91E63',
    borderRadius: '50%',
    backgroundColor: 'white',
    width: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  friendType: {
    margin: 5,
    padding: 5,
    background: '#00CF6E',
    borderRadius: '5px',
  },
  postType: {
    padding: 5,
    margin: 5,
    background: '#791E89',
    borderRadius: '5px',
  },
  hint: {
    color: 'white',
    marginBottom: 10,
    marginLeft: 5,
    marginTop: 10,
  },
}))
const emptyData = [
  {
    Text: 'Car Shark',
    type: 'USER',
    avatar: {},
  }, {
    Text: 'Four Aces',
    type: 'Post',
    avatar: {},
  }, {
    Text: 'Peter Parker',
    type: 'USER',
    avatar: {},
  }, {
    Text: 'Lebron James',
    type: 'USER',
    avatar: {},
  }, {
    Text: 'Twitter',
    type: 'Post',
    avatar: {},
  },
]

function BuddyItemList({ buddyList }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const itemList = buddyList.length ? buddyList : emptyData
  const handleClickItem = (room) => {
    if (buddyList.length) {
      dispatch(SELECTED_CHAT_ROOM(room))
    }
  }
  return (
    <>
      {!buddyList.length && (
        <Typography className={classes.hint}>
          You can add friend by following them.
          <br />
          You will see them on this section.
        </Typography>
      )}
      <List className={buddyList.length ? classes.root : classNames(classes.root, classes.blur)}>
        {itemList.map((item) => (
          <>
            <ListItem onClick={() => handleClickItem(item)}>
              <ListItemAvatar>
                <Avatar>
                  {item.type === 'USER' && <AvatarDisplay height={40} width={40} {...item.avatar} />}
                  {item.type !== 'USER' && item.Text[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={(
                  <Typography>
                    {item.Text}
                    <span className={item.type === 'USER' ? classes.friendType : classes.postType}>
                      {item.type === 'USER' ? 'FRIEND' : 'POST'}
                    </span>
                  </Typography>
                )}
              />
              <ListItemSecondaryAction>
                <div className={classes.count}>
                  {Math.floor((Math.random() * 20) + 1)}
                </div>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider className={classes.divider} />
          </>
        ))}
      </List>
    </>
  )
}

BuddyItemList.propTypes = {
  buddyList: PropTypes.any,
}

export default BuddyItemList
