'use client';

import React from '@/utils/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Box,
  CircularProgress
} from '@mui/material';
import { useAuth } from './AuthProvider';
import type { FormEvent, InputChangeEvent } from '@/utils/react';

interface LoginFormState {
  email: string;
  password: string;
  error: string;
  isSubmitting: boolean;
}

export default function LoginForm() {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    error: '',
    isSubmitting: false
  });
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formState;

    if (!email || !password) {
      setFormState(prev => ({ ...prev, error: 'Please fill in all fields' }));
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true, error: '' }));

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setFormState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Invalid email or password',
        isSubmitting: false
      }));
    }
  };

  const handleChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
      error: '' // Clear error when user types
    }));
  };

  return (
    <Paper className="p-6 w-full max-w-md">
      <Typography variant="h5" className="mb-4 text-center">
        Log in to VoxPop
      </Typography>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {formState.error && (
          <Alert severity="error" className="mb-4">
            {formState.error}
          </Alert>
        )}
        
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          disabled={formState.isSubmitting}
          required
          autoComplete="email"
          autoFocus
        />
        
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          disabled={formState.isSubmitting}
          required
          autoComplete="current-password"
        />
        
        <Box className="pt-2">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Log In'
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
} 