'use client';

import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Grid, Typography, Link } from '@mui/material';
import { GET_POST, GET_ROOM_MESSAGES } from '@/graphql/queries';
import Post from '@/components/Post/Post';
import PostSkeleton from '@/components/Post/PostSkeleton';
import PostChatSend from '@/components/PostChat/PostChatSend';
import PostActionList from '@/components/PostActions/PostActionList';

interface PostPageProps {
  params: {
    id: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const postId = params.id;
  const user = useSelector((state: any) => state.user.data);

  const {
    loading: loadingPost,
    error: postError,
    data: postData,
    refetch: refetchPost,
  } = useQuery(GET_POST, {
    variables: { postId },
  });

  const post = !loadingPost && postData?.post;
  const messageRoomId = post?.messageRoom?._id;
  const title = post?.title;

  const {
    loading: loadingMessages,
    data: messageData,
    refetch: refetchMessages,
  } = useQuery(GET_ROOM_MESSAGES, {
    skip: !messageRoomId,
    variables: { messageRoomId },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  if (postError) return <div>Something went wrong!</div>;

  if (!loadingPost && !post) {
    return (
      <Grid container spacing={4} className="mt-2.5">
        <Grid item xs={12}>
          <Typography>
            Invalid post.{' '}
            <Link href="/home" className="text-cyan-500">
              Return to homepage.
            </Link>
          </Typography>
        </Grid>
      </Grid>
    );
  }

  const handleLike = () => {
    // Implement like functionality
  };

  const handleComment = () => {
    // Implement comment functionality
  };

  const handleShare = () => {
    // Implement share functionality
  };

  return (
    <Grid 
      container 
      spacing={4} 
      className="mt-2.5 relative"
    >
      <Grid item xs={12} md={6}>
        {loadingPost ? (
          <PostSkeleton />
        ) : (
          <Post post={post} />
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <PostChatSend messageRoomId={messageRoomId} title={title} />
        <PostActionList
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      </Grid>
    </Grid>
  );
} 