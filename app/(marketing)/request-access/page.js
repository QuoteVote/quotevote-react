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
  MenuItem,
  Alert,
  Grid,
} from '@mui/material'
import SubHeader from '@/components/SubHeader'

const roles = [
  { value: 'investor', label: 'Investor' },
  { value: 'partner', label: 'Partner' },
  { value: 'advertiser', label: 'Advertiser' },
  { value: 'other', label: 'Other' },
]

export default function RequestAccess() {
  const [formData, setFormData] = useState({
    organization: '',
    role: '',
    email: '',
    name: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement access request submission
    setSubmitted(true)
  }

  return (
    <>
      <SubHeader headerName="Request Access" />
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Request Platform Access
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Fill out the form to request access to our platform. We'll review your request and get back to you shortly.
                </Typography>

                {submitted ? (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Thank you for your request. We'll review it and contact you soon.
                  </Alert>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <TextField
                    required
                    fullWidth
                    label="Organization Name"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    required
                    fullWidth
                    select
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  >
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={submitted}
                  >
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Why Request Access?
                </Typography>
                <Typography variant="body1" paragraph>
                  Our platform offers exclusive features and benefits for verified users:
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body1" paragraph>
                    Access to premium content and features
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Direct communication with our team
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Early access to new features
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Customized support and onboarding
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  We review each request carefully to ensure the best experience for our users.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
} 