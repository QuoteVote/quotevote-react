'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material'
import { Notifications as NotificationsIcon } from '@mui/icons-material'
import Image from 'next/image'

const NotificationsContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
}))

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

const NotificationItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

const NotificationIcon = styled(Image)(({ theme }) => ({
  width: 24,
  height: 24,
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
}))

export default function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null)
  const notifications = useSelector((state) => state.notifications?.items || [])
  const unreadCount = notifications.filter((n) => !n.read).length

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNotificationClick = (notification) => {
    // TODO: Implement notification click handler
    handleClose()
  }

  return (
    <NotificationsContainer>
      <IconButton color="inherit" onClick={handleClick}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <NotificationIcon
            src="/svg/Notifications.svg"
            alt="Notifications"
            width={24}
            height={24}
          />
        </StyledBadge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: 360,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText primary="No notifications" />
            </ListItem>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                button
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  backgroundColor: notification.read ? 'inherit' : 'action.hover',
                }}
              >
                <ListItemAvatar>
                  <Avatar src={notification.avatar} alt={notification.sender}>
                    {notification.sender[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.message}
                  secondaryTypographyProps={{
                    noWrap: true,
                  }}
                />
              </NotificationItem>
            ))
          )}
        </List>
        {notifications.length > 0 && (
          <>
            <Divider />
            <MenuItem onClick={handleClose}>
              <Typography variant="body2" color="primary" align="center" sx={{ width: '100%' }}>
                View All
              </Typography>
            </MenuItem>
          </>
        )}
      </Menu>
    </NotificationsContainer>
  )
} 