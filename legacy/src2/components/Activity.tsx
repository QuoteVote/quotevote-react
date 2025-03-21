'use client';

import React from '@/utils/react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_RECENT_ACTIVITIES } from '@/graphql/queries';
import LoadingSpinner from './LoadingSpinner';

interface Activity {
  _id: string;
  type: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
    avatar?: {
      url: string;
    };
  };
}

export default function Activity() {
  const { loading, error, data } = useQuery(GET_RECENT_ACTIVITIES);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading activities</div>;

  const activities = data?.recentActivities || [];

  return (
    <Paper className="p-4">
      <Typography variant="h6" className="mb-4">
        Recent Activity
      </Typography>
      <List>
        {activities.map((activity: Activity) => (
          <ListItem key={activity._id} className="px-0">
            <ListItemText
              primary={activity.content}
              secondary={`${activity.user.name} • ${activity.createdAt}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
} 