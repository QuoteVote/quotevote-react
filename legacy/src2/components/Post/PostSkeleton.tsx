'use client';

import { Card, CardHeader, CardContent, CardActions, Skeleton } from '@mui/material';

export default function PostSkeleton() {
  return (
    <Card className="mb-4">
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={<Skeleton variant="text" width={120} />}
        subheader={<Skeleton variant="text" width={80} />}
      />
      
      <CardContent>
        <Skeleton variant="text" width="90%" height={28} className="mb-2" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="60%" />
      </CardContent>

      <CardActions className="flex justify-between">
        <div className="flex gap-4">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </div>
      </CardActions>
    </Card>
  );
} 