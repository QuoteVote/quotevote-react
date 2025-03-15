'use client';

import { useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { useSelector } from 'react-redux';
import { List, ListItem } from '@mui/material';
import ScrollableFeed from 'react-scrollable-feed';
import MessageItem from './MessageItem';
import { GET_ROOM_MESSAGES } from '@/graphql/queries';
import { NEW_MESSAGE_SUBSCRIPTION } from '@/graphql/subscriptions';
import LoadingSpinner from '../LoadingSpinner';

export default function MessageItemList() {
  const selectedRoom = useSelector((state: any) => state.chat.selectedRoom);
  const messageRoomId = selectedRoom.room._id;

  const {
    loading, error, data, refetch,
  } = useQuery(GET_ROOM_MESSAGES, {
    variables: { messageRoomId },
  });

  useSubscription(
    NEW_MESSAGE_SUBSCRIPTION,
    {
      variables: { messageRoomId },
      onData: async () => {
        await refetch();
      },
    },
  );

  useEffect(() => {
    // Scroll to bottom on new messages
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [data?.messages]);

  if (error) return <div>Something went wrong!</div>;

  const messageData = (!loading && data?.messages) || [];

  return (
    <List className="h-full overflow-auto" id="message-container">
      <ScrollableFeed>
        {loading && <LoadingSpinner size={50} />}
        {messageData.map((message: any) => (
          <ListItem key={message._id} className="flex-col items-start">
            <MessageItem message={message} />
          </ListItem>
        ))}
      </ScrollableFeed>
    </List>
  );
} 