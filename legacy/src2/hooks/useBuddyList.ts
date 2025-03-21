import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHAT_ROOMS } from '@/graphql/queries';

export function useBuddyList(initialSearch = '') {
  const [search, setSearch] = useState(initialSearch);
  const { loading, error, data, refetch } = useQuery(GET_CHAT_ROOMS, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  const buddyRooms = data?.messageRooms?.map((room: any) => ({
    id: room._id,
    name: room.title,
    avatar: room.avatar?.url,
    lastMessage: room.lastMessage?.content,
    timestamp: room.lastMessage?.createdAt,
    unreadCount: room.unreadMessages,
    type: room.messageType,
  })) || [];

  const filteredBuddyRooms = search 
    ? buddyRooms.filter(buddy => 
        buddy.name.toLowerCase().includes(search.toLowerCase())
      )
    : buddyRooms;

  return {
    loading,
    error,
    buddyRooms: filteredBuddyRooms,
    search,
    setSearch,
    refetch,
  };
} 