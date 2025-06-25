import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardHeader, CardContent, Typography, Avatar } from '@material-ui/core'
import AvatarDisplay from '../Avatar'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

const useStyles = makeStyles(() => ({
  card: {
    marginBottom: 8,
    cursor: 'pointer',
  },
  quoteText: {
    fontStyle: 'italic',
    marginBottom: 8,
  },
  postTitle: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
}))

export default function QuoteCard({ quote }) {
  const classes = useStyles()
  const history = useHistory()

  const handlePostClick = (e) => {
    e.stopPropagation()
    if (quote.post && quote.post.url) {
      history.push(quote.post.url.replace(/\?/g, ''))
    }
  }

  const handleProfileClick = (e) => {
    e.stopPropagation()
    if (quote.user && quote.user.username) {
      history.push(`/Profile/${quote.user.username}`)
    }
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={(
          <Avatar onClick={handleProfileClick}>
            {quote.user && <AvatarDisplay height="40" width="40" {...quote.user.avatar} />}
          </Avatar>
        )}
        title={quote.user ? quote.user.username : 'Anonymous'}
        subheader={moment(quote.created).calendar()}
      />
      <CardContent onClick={handlePostClick}>
        <Typography className={classes.quoteText}>{quote.quote}</Typography>
        {quote.post && (
          <Typography variant="subtitle2" className={classes.postTitle}>
            {quote.post.title}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

QuoteCard.propTypes = {
  quote: PropTypes.object.isRequired,
}
