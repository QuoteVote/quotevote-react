'use client'

import { Box, Typography, Button } from '@mui/material'

export default function Error({ error, reset }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Something went wrong!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => reset()}
        sx={{ mt: 2 }}
      >
        Try again
      </Button>
    </Box>
  )
} 