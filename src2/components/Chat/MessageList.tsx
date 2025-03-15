'use client';

import { useEffect, useRef } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { List } from '@mui/material';
import { GET_ROOM_MESSAGES } from '@/graphql/queries';
import { NEW_MESSAGE_SUBSCRIPTION } from '@/graphql/subscriptions';
import MessageItem from './MessageItem';
import MessageSkeleton from './MessageSkeleton';

interface MessageListProps {
  messageRoomId: string;
}

export default function MessageList({ messageRoomId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    loading, 
    error, 
    data, 
    refetch,
    fetchMore 
  } = useQuery(GET_ROOM_MESSAGES, {
    variables: { 
      messageRoomId,
      limit: 20,
      offset: 0
    },
  });

  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { messageRoomId },
    onData: () => {
      refetch();
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages]);

  if (error) return <div>Error loading messages</div>;
  if (loading) return <MessageSkeleton />;

  const messages = data?.messages || [];

  return (
    <List className="flex-1 overflow-y-auto p-4">
      {messages.map((message: any) => (
        <MessageItem key={message._id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </List>
  );
} 