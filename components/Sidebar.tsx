'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material'
import Image from 'next/image'
import { useSelector } from 'react-redux'

const menuItems = [
  {
    text: 'Home',
    icon: '/assets/svg/Home.svg',
    path: '/home'
  },
  {
    text: 'Trending',
    icon: '/assets/svg/TrendingIcon.svg',
    path: '/trending'
  },
  {
    text: 'Add Post',
    icon: '/assets/svg/AddPost.svg',
    path: '/quotes/new'
  },
  {
    text: 'Notifications',
    icon: '/assets/svg/NotificationsActive.svg',
    path: '/notifications'
  }
]

interface SidebarProps {
  isMobile: boolean
  open: boolean
  onClose: () => void
}

export default function Sidebar({ isMobile, open, onClose }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const { user } = useSelector((state) => state.auth)

  const drawer = (
    <Box sx={{ width: 240 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 40,
            height: 40
          }}
        >
          <Image
            src="/assets/img/QuoteIcon.png"
            alt="QuoteVote"
            fill
            style={{
              objectFit: 'contain'
            }}
          />
        </Box>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => {
                router.push(item.path)
                if (isMobile) onClose()
              }}
            >
              <ListItemIcon>
                <Box
                  sx={{
                    position: 'relative',
                    width: 24,
                    height: 24
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={item.text}
                    fill
                    style={{
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
        }}
      >
        {drawer}
      </Drawer>
    )
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
      }}
      open
    >
      {drawer}
    </Drawer>
  )
} 