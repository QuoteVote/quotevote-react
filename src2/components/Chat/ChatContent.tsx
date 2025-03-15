'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import ChatSearchInput from './ChatSearchInput';
import BuddyList from '../BuddyList/BuddyList';
import MessageBox from './MessageBox';
import { useBuddyList } from '@/hooks/useBuddyList';

export default function ChatContent() {
  const selectedRoom = useSelector((state: any) => state.chat.selectedRoom);
  const {
    loading,
    error,
    buddyRooms,
    search,
    setSearch,
  } = useBuddyList();

  if (!selectedRoom || !selectedRoom.room) {
    return (
      <div className="w-96">
        <Typography variant="h6" className="text-white">Chat</Typography>
        <ChatSearchInput value={search} onChange={setSearch} />
        <BuddyList buddyRooms={buddyRooms} />
      </div>
    );
  }

  return (
    <div className="w-96">
      <MessageBox />
    </div>
  );
} 