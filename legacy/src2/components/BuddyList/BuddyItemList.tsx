'use client';

import React from '@/utils/imports';
import { useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import { SELECTED_CHAT_ROOM } from '@/redux/actions/chatAction';
import { BuddyRoom } from '@/types/chat';

interface BuddyItemListProps {
  buddyList: BuddyRoom[];
}

// Empty data for when buddy list is empty
const emptyData = [
  {
    id: '0',
    name: 'No buddies found',
    lastMessage: 'Start adding some buddies!',
    avatar: '',
    timestamp: '',
    messageType: 'SYSTEM'
  },
];

export default function BuddyItemList({ buddyList }: BuddyItemListProps) {
  const dispatch = useDispatch();
  const itemList = buddyList.length ? buddyList : emptyData;

  const handleClickItem = (room: BuddyRoom) => {
    if (buddyList.length) {
      dispatch(SELECTED_CHAT_ROOM(room));
    }
  };

  return (
    <List className="p-0 bg-background-paper">
      {itemList.map((item, index) => (
        <div key={item.id}>
          <ListItem
            button
            onClick={() => handleClickItem(item)}
            className="p-4 hover:bg-gray-50"
          >
            <ListItemAvatar>
              <Avatar
                src={item.avatar}
                className="w-10 h-10"
              >
                {item.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={item.lastMessage}
              className="m-0"
              primaryTypographyProps={{
                className: 'font-medium',
              }}
              secondaryTypographyProps={{
                className: 'text-gray-600',
              }}
            />
            {item.timestamp && (
              <span className="text-xs text-gray-500">
                {item.timestamp}
              </span>
            )}
          </ListItem>
          {index < itemList.length - 1 && (
            <Divider className="mx-4" />
          )}
        </div>
      ))}
    </List>
  );
} 