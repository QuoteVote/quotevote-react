'use client';

import { useEffect, useRef } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { List, ListItem } from '@mui/material';
import { GET_ROOM_MESSAGES } from '@/graphql/queries';
import { NEW_MESSAGE_SUBSCRIPTION } from '@/graphql/subscriptions';
import PostChatMessage from './PostChatMessage';
import MessageSkeleton from '../Chat/MessageSkeleton';

interface PostChatMessageListProps {
  messageRoomId: string;
}

export default function PostChatMessageList({ messageRoomId }: PostChatMessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    loading, 
    error, 
    data, 
    refetch 
  } = useQuery(GET_ROOM_MESSAGES, {
    variables: { messageRoomId },
    fetchPolicy: 'cache-and-network',
  });

  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { messageRoomId },
    onData: () => {
      refetch();
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data?.messages]);

  if (error) return <div>Error loading messages</div>;
  if (loading) return <MessageSkeleton />;

  const messages = data?.messages || [];

  return (
    <List className="flex-1 overflow-y-auto p-4">
      {messages.map((message: any) => (
        <ListItem key={message._id} className="p-0">
          <PostChatMessage message={message} />
        </ListItem>
      ))}
      <div ref={messagesEndRef} />
    </List>
  );
} 