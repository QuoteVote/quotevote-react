'use client'

import { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Container,
  Tabs,
  Tab,
} from '@mui/material'
import { ThumbUp, ThumbDown, Share } from '@mui/icons-material'
import SubHeader from '@/components/SubHeader'

const QuoteCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}))

const CategoryChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

// Temporary mock data
const trendingQuotes = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Inspiration",
    votes: 1234,
    comments: 89,
    date: "2024-03-15",
    trend: "up",
  },
  {
    id: 2,
    text: "Life is what happens while you're busy making other plans.",
    author: "John Lennon",
    category: "Life",
    votes: 987,
    comments: 45,
    date: "2024-03-14",
    trend: "up",
  },
  {
    id: 3,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Success",
    votes: 876,
    comments: 67,
    date: "2024-03-13",
    trend: "down",
  },
]

const categories = [
  "All",
  "Inspiration",
  "Life",
  "Success",
  "Love",
  "Wisdom",
  "Humor",
  "Philosophy",
  "Science",
]

export default function Trending() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [timeRange, setTimeRange] = useState(0)

  const handleTimeRangeChange = (event, newValue) => {
    setTimeRange(newValue)
  }

  const filteredQuotes = trendingQuotes.filter((quote) => {
    const matchesCategory = selectedCategory === 'All' || quote.category === selectedCategory
    return matchesCategory
  })

  return (
    <>
      <SubHeader headerName="Trending Quotes" />
      <Container>
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={timeRange}
            onChange={handleTimeRangeChange}
            sx={{ mb: 3 }}
          >
            <Tab label="Today" />
            <Tab label="This Week" />
            <Tab label="This Month" />
            <Tab label="All Time" />
          </Tabs>

          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
                clickable
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </Box>
        </Box>

        <Grid container spacing={3}>
          {filteredQuotes.map((quote) => (
            <Grid item xs={12} md={4} key={quote.id}>
              <QuoteCard>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    "{quote.text}"
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    - {quote.author}
                  </Typography>
                  <CategoryChip
                    label={quote.category}
                    color="primary"
                    size="small"
                  />
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {quote.votes} votes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {quote.comments} comments
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button startIcon={<ThumbUp />} size="small">
                    Upvote
                  </Button>
                  <Button startIcon={<ThumbDown />} size="small">
                    Downvote
                  </Button>
                  <Button startIcon={<Share />} size="small">
                    Share
                  </Button>
                </CardActions>
              </QuoteCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
} 