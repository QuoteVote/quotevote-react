'use client'

import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    try {
      // TODO: Implement password reset
      setMessage('Password has been reset successfully')
      setTimeout(() => router.push('/login'), 2000)
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    }
  }

  if (!token) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Invalid Reset Link
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              This password reset link is invalid or has expired.
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/forgot-password')}
              fullWidth
              size="large"
            >
              Request New Reset Link
            </Button>
          </Paper>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
            />
            {message && (
              <Typography color="primary" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
            <Box sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Reset Password
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  )
} 