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
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Alert,
} from '@mui/material'
import SubHeader from '@/components/SubHeader'

export default function ControlPanel() {
  const [settings, setSettings] = useState({
    siteName: 'QuoteVote',
    siteDescription: 'A platform for sharing and voting on quotes',
    allowRegistration: true,
    requireInvite: false,
    maxQuotesPerUser: 10,
    maxVotesPerDay: 50,
    maintenanceMode: false,
    emailNotifications: true,
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement settings update
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <>
      <SubHeader headerName="Control Panel" />
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit}>
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Settings saved successfully!
            </Alert>
          )}

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                General Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Site Name"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Site Description"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                User Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.allowRegistration}
                        onChange={handleChange}
                        name="allowRegistration"
                      />
                    }
                    label="Allow New User Registration"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.requireInvite}
                        onChange={handleChange}
                        name="requireInvite"
                      />
                    }
                    label="Require Invite for Registration"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Max Quotes Per User"
                    name="maxQuotesPerUser"
                    value={settings.maxQuotesPerUser}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Max Votes Per Day"
                    name="maxVotesPerDay"
                    value={settings.maxVotesPerDay}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                System Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.maintenanceMode}
                        onChange={handleChange}
                        name="maintenanceMode"
                      />
                    }
                    label="Maintenance Mode"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={handleChange}
                        name="emailNotifications"
                      />
                    }
                    label="Enable Email Notifications"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
            >
              Save Settings
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
} 