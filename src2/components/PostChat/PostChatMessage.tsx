'use client';

import { useSelector } from 'react-redux';
import { Grid, Paper, Typography, Avatar } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_MESSAGE_REACTIONS } from '@/graphql/queries';
import PostChatReactions from './PostChatReactions';
import { parseCommentDate } from '@/utils/momentUtils';

interface Message {
  _id: string;
  content: string;
  createdAt?: string;
  sender: {
    _id: string;
    name: string;
    avatar?: {
      url: string;
    };
  };
}

interface PostChatMessageProps {
  message: Message;
}

export default function PostChatMessage({ message }: PostChatMessageProps) {
  const currentUser = useSelector((state: any) => state.user.data);
  const isCurrentUser = currentUser._id === message.sender._id;

  const { data: reactionData } = useQuery(GET_MESSAGE_REACTIONS, {
    variables: { messageId: message._id },
  });

  return (
    <Grid 
      container 
      spacing={2} 
      className={`mb-4 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
    >
      <Grid item>
        <Avatar
          src={message.sender.avatar?.url}
          className="w-10 h-10"
        >
          {message.sender.name[0]}
        </Avatar>
      </Grid>
      <Grid item xs>
        <div className="flex flex-col">
          <Typography variant="caption" className="mb-1 text-gray-500">
            {message.sender.name} • {message.createdAt && parseCommentDate(message.createdAt)}
          </Typography>
          <Paper
            className={`relative p-3 max-w-[80%] ${
              isCurrentUser 
                ? 'bg-primary-main text-white ml-auto after:right-[-10px] after:border-t-primary-main' 
                : 'bg-white after:left-[-10px] after:border-t-white'
            } rounded-lg
            after:absolute after:content-[''] after:border-[10px] after:border-transparent 
            after:border-t-[10px] after:top-0`}
          >
            <Typography className="whitespace-pre-wrap break-words">
              {message.content}
            </Typography>
            {reactionData?.messageReactions && (
              <PostChatReactions 
                messageId={message._id}
                reactions={reactionData.messageReactions}
                created={message.createdAt}
                isDefaultDirection={!isCurrentUser}
              />
            )}
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
} 