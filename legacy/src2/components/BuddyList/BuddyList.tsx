'use client';

import { useState } from 'react';
import { Paper, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BuddyItemList from './BuddyItemList';

interface BuddyRoom {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  timestamp?: string;
}

interface BuddyListProps {
  buddyRooms: BuddyRoom[];
}

export default function BuddyList({ buddyRooms }: BuddyListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBuddies = buddyRooms.filter(buddy =>
    buddy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper className="h-full flex flex-col">
      <div className="p-4">
        <TextField
          fullWidth
          placeholder="Search buddies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
        />
      </div>
      
      <div className="flex-1 overflow-auto">
        <BuddyItemList buddyList={filteredBuddies} />
      </div>
    </Paper>
  );
} 