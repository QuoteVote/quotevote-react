'use client';

import { useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import { GET_CHAT_ROOMS } from '@/graphql/queries';
import LoadingSpinner from '@/components/LoadingSpinner';
import BuddyItemList from './BuddyItemList';

interface BuddyListProps {
  search?: string;
}

export default function BuddyList({ search }: BuddyListProps) {
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS, {
    fetchPolicy: 'cache-and-network',
  });

  const buddyList =
    (!error && !loading && data && !isEmpty(data.messageRooms) &&
      data.messageRooms.map((item: any) => ({
        id: item._id,
        name: item.title,
        type: item.messageType,
        avatar: item.avatar,
        unreadMessages: item.unreadMessages,
        room: item,
      }))) ||
    [];

  const filteredBuddyList = search 
    ? buddyList.filter((buddy) => buddy.name.toLowerCase().includes(search.toLowerCase())) 
    : buddyList;

  if (loading) return <LoadingSpinner />;

  return <BuddyItemList buddyList={filteredBuddyList} />;
} 