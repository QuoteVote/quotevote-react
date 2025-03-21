'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  IconButton,
  Avatar,
} from '@mui/material'
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Share as ShareIcon,
} from '@mui/icons-material'

export default function HomePage() {
  const [newQuote, setNewQuote] = useState('')
  const [quotes] = useState([
    {
      id: 1,
      text: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
      votes: 42,
      user: {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
    },
    {
      id: 2,
      text: 'Innovation distinguishes between a leader and a follower.',
      author: 'Steve Jobs',
      votes: 38,
      user: {
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
    },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement quote submission
    setNewQuote('')
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to QuoteVote
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Share and vote on your favorite quotes
        </Typography>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Share your favorite quote..."
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!newQuote.trim()}
            >
              Share Quote
            </Button>
          </form>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {quotes.map((quote) => (
          <Grid item xs={12} key={quote.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={quote.user.avatar} sx={{ mr: 2 }}>
                    {quote.user.name[0]}
                  </Avatar>
                  <Typography variant="subtitle1">{quote.user.name}</Typography>
                </Box>
                <Typography variant="h6" gutterBottom>
                  "{quote.text}"
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  - {quote.author}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton>
                  <ThumbUpIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {quote.votes}
                </Typography>
                <IconButton>
                  <ThumbDownIcon />
                </IconButton>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
} 