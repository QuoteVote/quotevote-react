'use client';

import { List, ListItem, Grid, Skeleton } from '@mui/material';

export default function MessageSkeleton() {
  return (
    <List className="flex-1 overflow-y-auto p-4">
      {[...Array(3)].map((_, index) => (
        <ListItem key={index} className="mb-4">
          <Grid container spacing={2} className={index % 2 === 0 ? '' : 'flex-row-reverse'}>
            <Grid item>
              <Skeleton variant="circular" width={40} height={40} />
            </Grid>
            <Grid item xs>
              <div className="flex flex-col">
                <Skeleton variant="text" width={100} className="mb-1" />
                <Skeleton 
                  variant="rectangular" 
                  width={index % 2 === 0 ? '60%' : '40%'} 
                  height={60} 
                  className="rounded-lg"
                />
              </div>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
} 