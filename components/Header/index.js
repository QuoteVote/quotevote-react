'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Divider,
  ListItemIcon,
} from '@mui/material'
import { logout } from '@/lib/slices/authSlice'
import Notifications from '../Notifications'
import Image from 'next/image'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: theme.spacing(1),
}))

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}))

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export default function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigation = (path) => {
    handleClose()
    router.push(path)
  }

  const handleLogout = async () => {
    handleClose()
    try {
      await dispatch(logout()).unwrap()
      router.push('/login')
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <LogoContainer
          onClick={() => router.push('/')}
          sx={{ flexGrow: 1 }}
        >
          <Image
            src="/images/logo.svg"
            alt="QuoteVote Logo"
            width={32}
            height={32}
            priority
          />
          <LogoText variant="h6" component="div">
            QuoteVote
          </LogoText>
        </LogoContainer>

        {user ? (
          <>
            <NavButton onClick={() => router.push('/')}>
              Home
            </NavButton>
            <NavButton onClick={() => router.push('/quotes')}>
              Quotes
            </NavButton>
            <NavButton onClick={() => router.push('/trending')}>
              Trending
            </NavButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Notifications />
              <IconButton
                onClick={handleMenu}
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar
                  src={user.avatar || '/images/default-avatar.png'}
                  alt={user.username}
                  sx={{ width: 32, height: 32 }}
                >
                  {user.username[0]}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleNavigation('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => handleNavigation('/plans')}>Plans</MenuItem>
                <MenuItem onClick={() => handleNavigation('/manage-invites')}>Manage Invites</MenuItem>
                <MenuItem onClick={() => handleNavigation('/control-panel')}>Control Panel</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </>
        ) : (
          <>
            <MenuItem onClick={() => router.push('/login')}>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              Sign In
            </MenuItem>
            <MenuItem onClick={() => router.push('/signup')}>
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              Sign Up
            </MenuItem>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  )
} 