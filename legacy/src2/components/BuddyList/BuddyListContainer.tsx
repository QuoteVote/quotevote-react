'use client';

import { useQuery } from '@apollo/client';
import { GET_CHAT_ROOMS } from '@/graphql/queries';
import BuddyList from './BuddyList';
import BuddyListSkeleton from './BuddyListSkeleton';

interface BuddyListContainerProps {
  search?: string;
}

export default function BuddyListContainer({ search }: BuddyListContainerProps) {
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <BuddyListSkeleton />;
  if (error) return <div>Error loading buddy list</div>;

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

  return <BuddyList buddyRooms={filteredBuddyRooms} />;
} 