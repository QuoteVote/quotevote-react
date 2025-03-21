'use client'

import { Box, Container, Typography, Paper, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function InvestorThanksPage() {
  const router = useRouter()

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Thank You for Your Interest!
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            We appreciate your interest in investing in QuoteVote
          </Typography>
          <Typography variant="body1" paragraph>
            Our team has received your information and will review it carefully. We'll be in touch
            with you soon to discuss the next steps.
          </Typography>
          <Typography variant="body1" paragraph>
            In the meantime, feel free to explore our platform and see how we're revolutionizing
            content curation.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push('/')}
            >
              Explore QuoteVote
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
} 