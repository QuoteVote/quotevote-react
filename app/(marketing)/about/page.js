'use client'

import { Box, Container, Typography, Grid, Paper } from '@mui/material'

export default function AboutPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                About QuoteVote
              </Typography>
              <Typography variant="h6" color="textSecondary" paragraph>
                Empowering voices through democratic content curation
              </Typography>
              <Typography variant="body1" paragraph>
                QuoteVote is a platform that revolutionizes how we discover and share meaningful content.
                Our mission is to create a democratic space where quality content rises to the top through
                community engagement and thoughtful curation.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                We believe in the power of collective wisdom. QuoteVote provides a platform where
                users can share, discover, and vote on content that matters. Our democratic approach
                ensures that the best content naturally rises to prominence.
              </Typography>
              <Typography variant="body1" paragraph>
                By combining modern technology with community-driven curation, we're building a
                space where quality content thrives and meaningful discussions flourish.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Our Values
              </Typography>
              <Typography variant="body1" paragraph>
                • Democracy: Every voice matters in our community
              </Typography>
              <Typography variant="body1" paragraph>
                • Quality: We prioritize meaningful, well-thought-out content
              </Typography>
              <Typography variant="body1" paragraph>
                • Transparency: Our voting system is open and fair
              </Typography>
              <Typography variant="body1" paragraph>
                • Community: We foster respectful and constructive discussions
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Join Our Community
              </Typography>
              <Typography variant="body1" paragraph>
                Become part of a growing community of content curators and enthusiasts. Share your
                favorite quotes, discover new perspectives, and help shape the future of content
                discovery.
              </Typography>
              <Typography variant="body1" paragraph>
                Start your journey with QuoteVote today and be part of the democratic content
                revolution.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
} 