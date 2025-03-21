'use client';

import { Paper, Skeleton } from '@mui/material';

export default function BuddyListSkeleton() {
  return (
    <Paper className="h-full">
      <div className="p-4">
        <Skeleton variant="rectangular" height={40} />
      </div>
      
      {[...Array(5)].map((_, index) => (
        <div key={index} className="px-4 py-2">
          <div className="flex items-center space-x-4">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
            <Skeleton variant="text" width={40} />
          </div>
        </div>
      ))}
    </Paper>
  );
} 