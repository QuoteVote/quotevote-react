'use client'

import { useEffect, useState } from 'react'
import { Box, Container, Typography, Paper, Grid, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Chip } from '@mui/material'
import { Delete as DeleteIcon, Send as SendIcon } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function ManageInvitesPage() {
  const user = useSelector((state) => state.auth.user)
  const router = useRouter()
  const [invites, setInvites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    // TODO: Fetch user's invites
    setLoading(false)
  }, [user, router])

  if (!user) {
    return null
  }

  const handleDeleteInvite = async (inviteId) => {
    // TODO: Implement invite deletion
    console.log('Delete invite:', inviteId)
  }

  const handleResendInvite = async (inviteId) => {
    // TODO: Implement invite resend
    console.log('Resend invite:', inviteId)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'accepted':
        return 'success'
      case 'expired':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">Manage Invites</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/invites/new')}
            >
              Create New Invite
            </Button>
          </Box>

          <Typography variant="h6" gutterBottom>
            Your Invites
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : invites.length === 0 ? (
            <Typography color="textSecondary">No invites yet</Typography>
          ) : (
            <List>
              {invites.map((invite) => (
                <ListItem key={invite.id} divider>
                  <ListItemText
                    primary={invite.email}
                    secondary={`Created: ${new Date(invite.createdAt).toLocaleDateString()}`}
                  />
                  <ListItemSecondaryAction>
                    <Chip
                      label={invite.status}
                      color={getStatusColor(invite.status)}
                      size="small"
                      sx={{ mr: 2 }}
                    />
                    {invite.status === 'pending' && (
                      <IconButton
                        edge="end"
                        aria-label="resend"
                        onClick={() => handleResendInvite(invite.id)}
                        sx={{ mr: 1 }}
                      >
                        <SendIcon />
                      </IconButton>
                    )}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteInvite(invite.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Invite Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4">
                    {invites.filter((invite) => invite.status === 'pending').length}
                  </Typography>
                  <Typography color="textSecondary">Pending</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4">
                    {invites.filter((invite) => invite.status === 'accepted').length}
                  </Typography>
                  <Typography color="textSecondary">Accepted</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4">
                    {invites.filter((invite) => invite.status === 'expired').length}
                  </Typography>
                  <Typography color="textSecondary">Expired</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
} 