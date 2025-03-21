'use client'

import { useState, useEffect } from 'react'
import { Box, Container, Typography, Paper, TextField, Grid, Card, CardContent, CardActions, Button, CircularProgress } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchTerm) => {
    setLoading(true)
    setError('')
    try {
      // TODO: Implement search functionality
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      setResults([
        {
          id: 1,
          title: 'Sample Quote 1',
          author: 'Author 1',
          content: 'This is a sample quote content...',
          votes: 42,
        },
        {
          id: 2,
          title: 'Sample Quote 2',
          author: 'Author 2',
          content: 'Another sample quote content...',
          votes: 28,
        },
      ])
    } catch (err) {
      setError('An error occurred while searching. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim())
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Search Quotes
          </Typography>

          <form onSubmit={handleSearch}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for quotes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ mb: 3 }}
            />
          </form>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : results.length > 0 ? (
            <Grid container spacing={3}>
              {results.map((result) => (
                <Grid item xs={12} md={6} key={result.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {result.title}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        by {result.author}
                      </Typography>
                      <Typography variant="body2">
                        {result.content}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Vote ({result.votes})
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : query ? (
            <Typography align="center" color="textSecondary">
              No results found for "{query}"
            </Typography>
          ) : null}
        </Paper>
      </Box>
    </Container>
  )
} 