import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid } from '@material-ui/core'
import { GET_LATEST_QUOTES } from '../../graphql/query'
import QuoteCard from './QuoteCard'
import LoadingSpinner from '../LoadingSpinner'

export default function LatestQuotesStream({ paused }) {
  const { data, loading, startPolling, stopPolling } = useQuery(GET_LATEST_QUOTES, {
    variables: { limit: 1, offset: 0 },
    pollInterval: 3000,
    fetchPolicy: 'network-only',
  })
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    if (paused) {
      stopPolling()
    } else {
      startPolling(3000)
    }
  }, [paused, startPolling, stopPolling])

  useEffect(() => {
    if (data && data.latestQuotes && data.latestQuotes.length) {
      const newQuote = data.latestQuotes[0]
      setQuotes((prev) => {
        if (prev.find((q) => q._id === newQuote._id)) {
          return prev
        }
        return [newQuote, ...prev]
      })
    }
  }, [data])

  return (
    <Grid container direction="column" spacing={2}>
      {quotes.map((q) => (
        <Grid item key={q._id}>
          <QuoteCard quote={q} />
        </Grid>
      ))}
      {loading && quotes.length === 0 && (
        <Grid item>
          <LoadingSpinner size={30} />
        </Grid>
      )}
    </Grid>
  )
}
