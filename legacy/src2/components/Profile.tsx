'use client';

import React from '@/utils/react';
import { useQuery, useMutation } from '@apollo/client';
import { 
  Paper, 
  Typography, 
  Avatar, 
  Button, 
  TextField,
  Grid 
} from '@mui/material';
import { GET_USER_PROFILE, UPDATE_PROFILE } from '@/graphql/queries';
import LoadingSpinner from './LoadingSpinner';

export default function Profile() {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading profile</div>;

  const { profile } = data;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    
    try {
      await updateProfile({
        variables: {
          input: {
            name: formData.get('name'),
            bio: formData.get('bio'),
          },
        },
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Paper className="p-6">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} className="text-center">
          <Avatar
            src={profile.avatar?.url}
            className="w-32 h-32 mx-auto mb-4"
          >
            {profile.name[0]}
          </Avatar>
          <Typography variant="h5" className="mb-2">
            {profile.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {profile.email}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              defaultValue={profile.name}
              className="mb-4"
            />
            <TextField
              fullWidth
              name="bio"
              label="Bio"
              multiline
              rows={4}
              defaultValue={profile.bio}
              className="mb-4"
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
            >
              Update Profile
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
} 