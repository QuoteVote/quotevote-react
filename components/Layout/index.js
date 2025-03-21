'use client'

import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import Header from '../Header'
import Footer from '../Footer'

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}))

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  maxWidth: 1200,
  margin: '0 auto',
  width: '100%',
}))

export default function Layout({ children }) {
  return (
    <MainContainer>
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </MainContainer>
  )
} 