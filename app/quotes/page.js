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
  TextField,
  InputAdornment,
  Pagination,
} from '@mui/material'
import { Search, ThumbUp, ThumbDown, Share } from '@mui/icons-material'
import SubHeader from '@/components/SubHeader'
import { useRouter } from 'next/navigation'

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
const quotes = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Inspiration",
    votes: 1234,
    comments: 89,
    date: "2024-03-15",
  },
  {
    id: 2,
    text: "Life is what happens while you're busy making other plans.",
    author: "John Lennon",
    category: "Life",
    votes: 987,
    comments: 45,
    date: "2024-03-14",
  },
  {
    id: 3,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Success",
    votes: 876,
    comments: 67,
    date: "2024-03-13",
  },
  // Add more mock quotes as needed
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

export default function Quotes() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [page, setPage] = useState(1)
  const quotesPerPage = 9

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch = quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || quote.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredQuotes.length / quotesPerPage)
  const paginatedQuotes = filteredQuotes.slice(
    (page - 1) * quotesPerPage,
    page * quotesPerPage
  )

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleQuoteClick = (quoteId) => {
    router.push(`/quotes/${quoteId}`)
  }

  return (
    <>
      <SubHeader headerName="Quotes" />
      <Container>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search quotes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
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
          {paginatedQuotes.map((quote) => (
            <Grid item xs={12} md={4} key={quote.id}>
              <QuoteCard onClick={() => handleQuoteClick(quote.id)} sx={{ cursor: 'pointer' }}>
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
                <CardActions onClick={(e) => e.stopPropagation()}>
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

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </>
  )
} 