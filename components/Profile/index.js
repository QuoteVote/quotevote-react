'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { useTheme } from '@mui/material'

const ProfileContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 1200,
  margin: '0 auto',
}))

const ProfileHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
}))

const ProfileContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}))

const ProfileField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const ProfileLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}))

export default function Profile() {
  const theme = useTheme()
  const user = useSelector((state) => state.auth.user)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleEditClick = () => {
    setEditedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditDialogOpen(false)
  }

  const handleCancel = () => {
    setIsEditDialogOpen(false)
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar
          src={user?.avatar}
          alt={user?.name}
          sx={{ width: 100, height: 100 }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            {user?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditClick}
          sx={{ marginLeft: 'auto' }}
        >
          Edit Profile
        </Button>
      </ProfileHeader>

      <ProfileContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ProfileField>
              <ProfileLabel>Bio</ProfileLabel>
              <Typography>{user?.bio || 'No bio yet'}</Typography>
            </ProfileField>
            <ProfileField>
              <ProfileLabel>Location</ProfileLabel>
              <Typography>{user?.location || 'Not specified'}</Typography>
            </ProfileField>
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileField>
              <ProfileLabel>Member Since</ProfileLabel>
              <Typography>
                {new Date(user?.createdAt).toLocaleDateString()}
              </Typography>
            </ProfileField>
            <ProfileField>
              <ProfileLabel>Last Updated</ProfileLabel>
              <Typography>
                {new Date(user?.updatedAt).toLocaleDateString()}
              </Typography>
            </ProfileField>
          </Grid>
        </Grid>
      </ProfileContent>

      <Dialog open={isEditDialogOpen} onClose={handleCancel}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={editedUser?.name || ''}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Bio"
              value={editedUser?.bio || ''}
              onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Location"
              value={editedUser?.location || ''}
              onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </ProfileContainer>
  )
} 