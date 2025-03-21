'use client';

import { CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export default function LoadingSpinner({ size = 40, className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <CircularProgress size={size} />
    </div>
  );
} 