import React, { useState } from 'react';
import { Button, Box, Typography, Link } from '@mui/material';

const SignupForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields go here */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{' '}
          <Link href="/login" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Box>
    </form>
  );
};

export default SignupForm; 