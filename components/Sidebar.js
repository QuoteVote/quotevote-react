'use client'

import { usePathname } from 'next/navigation'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
} from '@mui/material'
import {
  Home as HomeIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  Email as EmailIcon,
} from '@mui/icons-material'

const drawerWidth = 240

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/home' },
  { text: 'Trending', icon: <TrendingUpIcon />, path: '/trending' },
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Manage Invites', icon: <PeopleIcon />, path: '/manage-invites' },
  { text: 'Control Panel', icon: <SettingsIcon />, path: '/control-panel' },
]

export default function Sidebar({ mobileOpen, onClose, isMobile }) {
  const pathname = usePathname()

  const drawer = (
    <Box>
      <Box sx={{ p: 2 }}>
        <img
          src="/logo.png"
          alt="QuoteVote Logo"
          style={{ width: '100%', maxWidth: 150 }}
        />
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => window.location.href = item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  )
} 