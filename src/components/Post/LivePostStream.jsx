import { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import { GET_TOP_POSTS } from '../../graphql/query'
import { NEW_POST_SUBSCRIPTION } from '../../graphql/subscription'

function LivePostStream({ paused }) {
  const { data, loading } = useQuery(GET_TOP_POSTS, {
    variables: { limit: 10, offset: 0, searchKey: '', startDateRange: '', endDateRange: '', friendsOnly: false },
    fetchPolicy: 'network-only',
  })

  const [posts, setPosts] = useState([])
  const [queued, setQueued] = useState([])

  useEffect(() => {
    if (data && data.posts) {
      setPosts(data.posts.entities)
    }
  }, [data])

  useSubscription(NEW_POST_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newPost = subscriptionData.data && subscriptionData.data.post
      if (!newPost) return
      if (paused) {
        setQueued((q) => [newPost, ...q])
      } else {
        setPosts((p) => [newPost, ...p])
      }
    },
  })

  useEffect(() => {
    if (!paused && queued.length) {
      setPosts((p) => [...queued, ...p])
      setQueued([])
    }
  }, [paused, queued])

  if (loading && posts.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <Grid container direction="column" spacing={2}>
      {posts.map((post) => (
        <Grid item key={post._id} style={{ marginBottom: 8 }}>
          <PostCard
            {...post}
            activityType={post.activityType || 'POSTED'}
            votes={post.votes || []}
            comments={post.comments || []}
            quotes={post.quotes || []}
            messageRoom={{ messages: post.messageRoom?.messages || [] }}
            limitText={false}
          />
        </Grid>
      ))}
    </Grid>
  )
}

LivePostStream.propTypes = {
  paused: PropTypes.bool,
}

LivePostStream.defaultProps = {
  paused: false,
}

export default LivePostStream
