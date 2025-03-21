'use client'

import { useState, useEffect } from 'react'
import { useTheme, useMediaQuery } from '@mui/material'
import { Box, CssBaseline } from '@mui/material'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false)
    }
  }, [isMobile])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header onMenuClick={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
        isMobile={isMobile}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '240px' },
        }}
      >
        <Box sx={{ mt: 8 }}>{children}</Box>
      </Box>
    </Box>
  )
} 