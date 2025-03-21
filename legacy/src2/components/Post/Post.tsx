'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardContent, CardActions, Avatar, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import { formatDistanceToNow } from 'date-fns';
import PostChatMessage from '../PostChat/PostChatMessage';
import PostChatSend from '../PostChat/PostChatSend';

interface PostProps {
  post: {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    author: {
      _id: string;
      name: string;
      avatar?: {
        url: string;
      };
    };
    likes: number;
    comments: number;
    shares: number;
    messageRoomId: string;
  };
}

export default function Post({ post }: PostProps) {
  const router = useRouter();
  const [showComments, setShowComments] = useState(false);
  const currentUser = useSelector((state: any) => state.user.data);

  const handleProfileClick = () => {
    router.push(`/profile/${post.author._id}`);
  };

  return (
    <Card className="mb-4">
      <CardHeader
        avatar={
          <Avatar
            src={post.author.avatar?.url}
            onClick={handleProfileClick}
            className="cursor-pointer"
          >
            {post.author.name[0]}
          </Avatar>
        }
        title={
          <Typography 
            variant="h6" 
            className="cursor-pointer hover:text-blue-500"
            onClick={handleProfileClick}
          >
            {post.author.name}
          </Typography>
        }
        subheader={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      />
      
      <CardContent>
        <Typography variant="h5" className="mb-2">
          {post.title}
        </Typography>
        <Typography variant="body1">
          {post.content}
        </Typography>
      </CardContent>

      <CardActions className="flex justify-between">
        <div className="flex gap-4">
          <IconButton>
            <FavoriteIcon />
            <Typography className="ml-1">{post.likes}</Typography>
          </IconButton>
          <IconButton onClick={() => setShowComments(!showComments)}>
            <CommentIcon />
            <Typography className="ml-1">{post.comments}</Typography>
          </IconButton>
          <IconButton>
            <ShareIcon />
            <Typography className="ml-1">{post.shares}</Typography>
          </IconButton>
        </div>
      </CardActions>

      {showComments && (
        <div className="px-4 pb-4">
          <PostChatSend 
            messageRoomId={post.messageRoomId} 
            title={post.title} 
          />
          <div className="mt-4">
            {/* Comments would be rendered here */}
            <PostChatMessage
              message={{
                _id: '123',
                content: 'Sample comment',
                sender: currentUser,
              }}
            />
          </div>
        </div>
      )}
    </Card>
  );
} 