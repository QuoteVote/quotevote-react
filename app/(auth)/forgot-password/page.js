'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Link,
} from '@mui/material'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement password reset request
    setSubmitted(true)
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" gutterBottom>
                Forgot Your Password?
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Enter your email address and we'll send you instructions to reset your password.
              </Typography>
            </Box>

            {submitted ? (
              <Alert severity="success" sx={{ mb: 3 }}>
                If an account exists with that email address, you will receive password reset instructions shortly.
              </Alert>
            ) : null}

            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={submitted}
              >
                Send Reset Instructions
              </Button>
            </form>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Remember your password?{' '}
                <Link href="/login" underline="hover">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
} 