'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Tooltip,
  Badge
} from '@mui/material'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { useGetQuoteQuery, useVoteQuoteMutation } from '@/store/api/quotesApi'
import { useAddCommentMutation } from '@/store/api/commentsApi'
import { useShareQuoteMutation } from '@/store/api/shareApi'
import { formatDistanceToNow } from 'date-fns'

export default function QuoteDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const theme = useTheme()
  const { data: quote, isLoading } = useGetQuoteQuery(params.id)
  const [voteQuote] = useVoteQuoteMutation()
  const [addComment] = useAddCommentMutation()
  const [shareQuote] = useShareQuoteMutation()
  const { user } = useSelector((state) => state.auth)
  const [comment, setComment] = useState('')
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async () => {
    if (!user || isVoting) return
    setIsVoting(true)
    try {
      await voteQuote({ quoteId: params.id }).unwrap()
    } catch (error) {
      console.error('Failed to vote:', error)
    } finally {
      setIsVoting(false)
    }
  }

  const handleComment = async () => {
    if (!user || !comment.trim()) return
    try {
      await addComment({
        quoteId: params.id,
        content: comment.trim()
      }).unwrap()
      setComment('')
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  const handleShare = async () => {
    try {
      await shareQuote({ quoteId: params.id }).unwrap()
    } catch (error) {
      console.error('Failed to share:', error)
    }
  }

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Typography>Loading...</Typography>
      </Container>
    )
  }

  if (!quote) {
    return (
      <Container maxWidth="md">
        <Typography>Quote not found</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h1" gutterBottom>
                {quote.text}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Posted by {quote.user.name} • {formatDistanceToNow(new Date(quote.createdAt), { addSuffix: true })}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2
                }}
              >
                <Tooltip title="Vote">
                  <IconButton
                    onClick={handleVote}
                    disabled={!user || isVoting}
                    sx={{
                      color: quote.hasVoted ? 'primary.main' : 'text.secondary',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <Badge badgeContent={quote.votes} color="primary">
                      <Image
                        src="/assets/img/Heart.svg"
                        alt="Vote"
                        width={24}
                        height={24}
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Comment">
                  <IconButton
                    onClick={() => document.getElementById('comment-section')?.scrollIntoView({ behavior: 'smooth' })}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <Badge badgeContent={quote.comments?.length || 0} color="primary">
                      <Image
                        src="/assets/img/Chat.svg"
                        alt="Comment"
                        width={24}
                        height={24}
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton
                    onClick={handleShare}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <Image
                      src="/assets/img/Send.svg"
                      alt="Share"
                      width={24}
                      height={24}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box id="comment-section" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>
        {user ? (
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleComment}
              disabled={!comment.trim()}
            >
              Post Comment
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={() => router.push('/login')}
            sx={{ mb: 4 }}
          >
            Sign in to comment
          </Button>
        )}

        {quote.comments?.map((comment) => (
          <Card key={comment.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="body1">{comment.content}</Typography>
              <Typography variant="caption" color="text.secondary">
                {comment.user.name} • {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  )
} 