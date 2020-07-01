import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListSubheader from '@material-ui/core/ListSubheader'
import initials from 'initials'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#191919',
    color: 'white',
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '100%',
  },
  listItem: {
    backgroundColor: '#191919',
    margin: theme.spacing(1),
  },
  dividerClass: {
    backgroundColor: '#6e6b6b',
    marginTop: theme.spacing(2),
  },
  listSubHeader: {
    color: '#B0b3B8',
    margin: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
}))

// eslint-disable-next-line react/prop-types
function ListItemLink({ classes, listData, toggle }) {
  return (
    <List disablePadding>
      {/* eslint-disable-next-line react/prop-types */}
      {listData.map((item, i) => (
        // eslint-disable-next-line react/prop-types
        <ListItem button className={classes.listItem} key={i} onClick={() => toggle(item)}>
          <ListItemAvatar>
            <Avatar alt={item.Text} src={item.avatar}>
              {initials(item.Text)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.Text} />
        </ListItem>
      ))}
    </List>
  )
}


// eslint-disable-next-line react/prop-types
export default function BuddyListPanel({ data, toggle }) {
  const classes = useStyles()
  // eslint-disable-next-line react/prop-types
  const followingData = data.filter((following) => following.type === 'USER')
  // eslint-disable-next-line react/prop-types
  const postsData = data.filter((post) => post.type === 'POST')
  return (
    <div className={classes.root}>
      <List>
        <ListSubheader component="div" className={classes.listSubHeader}>
          <Typography variant="subtitle1">
            Following
          </Typography>
        </ListSubheader>
        <ListItemLink toggle={toggle} classes={classes} listData={followingData} key="FollowingList" />
        <Divider className={classes.dividerClass} />
        <ListSubheader component="div" className={classes.listSubHeader}>
          <Typography variant="subtitle1">
            Posts
          </Typography>
        </ListSubheader>
        <ListItemLink toggle={toggle} classes={classes} listData={postsData} key="PostList" />
      </List>
    </div>
  )
}
