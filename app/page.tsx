'use client'

import { useRouter } from 'next/navigation'
import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { useSelector } from 'react-redux'

export default function LandingPage() {
  const router = useRouter()
  const theme = useTheme()
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                {isAuthenticated ? 'Welcome Back!' : 'Ready to get started?'}
              </Typography>
              <Typography variant="h5" sx={{ mb: 4 }}>
                {isAuthenticated 
                  ? 'Continue sharing and discovering amazing quotes with our community.'
                  : 'Join our community of quote enthusiasts today.'}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => router.push(isAuthenticated ? '/home' : '/signup')}
                sx={{ mr: 2 }}
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Sign Up Now'}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  width: '100%',
                }}
              >
                <Image
                  src="/assets/img/PeopleWaving.png"
                  alt="People Waving"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                  priority
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  height: 200,
                  width: '100%',
                  mb: 2,
                }}
              >
                <Image
                  src="/assets/svg/AboutUs1.svg"
                  alt="Feature 1"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Typography variant="h5" gutterBottom>
                Share Your Thoughts
              </Typography>
              <Typography>
                Post your favorite quotes and share them with the world.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  height: 200,
                  width: '100%',
                  mb: 2,
                }}
              >
                <Image
                  src="/assets/svg/AboutUs2.svg"
                  alt="Feature 2"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Typography variant="h5" gutterBottom>
                Vote & Discover
              </Typography>
              <Typography>
                Vote on quotes and discover new perspectives from others.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  height: 200,
                  width: '100%',
                  mb: 2,
                }}
              >
                <Image
                  src="/assets/svg/AboutUs3.svg"
                  alt="Feature 3"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Typography variant="h5" gutterBottom>
                Build Your Collection
              </Typography>
              <Typography>
                Create your personal collection of inspiring quotes.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      {!isAuthenticated && (
        <Box
          sx={{
            background: theme.palette.grey[100],
            py: 8,
          }}
        >
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" component="h2" gutterBottom>
                Ready to Start?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Join our community and start sharing your favorite quotes today.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => router.push('/signup')}
              >
                Sign Up Now
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  )
} 