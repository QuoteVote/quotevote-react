'use client'

import { useEffect, useState } from 'react'
import { Box, Container, Typography, Paper, Avatar, Grid, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user)
  const router = useRouter()
  const [stats, setStats] = useState({
    posts: 0,
    followers: 0,
    following: 0,
  })

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
    // TODO: Fetch user stats
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                src={user.avatar}
                alt={user.username}
                sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {user.username}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {user.email}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => router.push('/profile/edit')}
              >
                Edit Profile
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Profile Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{stats.posts}</Typography>
                    <Typography color="textSecondary">Posts</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{stats.followers}</Typography>
                    <Typography color="textSecondary">Followers</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{stats.following}</Typography>
                    <Typography color="textSecondary">Following</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                {/* TODO: Add recent activity list */}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  )
} 