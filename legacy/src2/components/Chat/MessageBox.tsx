'use client';

import { useSelector } from 'react-redux';
import { Paper, Typography, IconButton, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMutation } from '@apollo/client';
import MessageSend from './MessageSend';
import MessageItemList from './MessageItemList';
import { READ_MESSAGES } from '@/graphql/mutations';
import { GET_CHAT_ROOMS } from '@/graphql/queries';

export default function MessageBox() {
  const selectedRoom = useSelector((state: any) => state.chat.selectedRoom);
  const { room } = selectedRoom;

  const [readMessages] = useMutation(READ_MESSAGES, {
    refetchQueries: [{ query: GET_CHAT_ROOMS }],
  });

  const handleBack = () => {
    // Implement back functionality
  };

  return (
    <Paper className="h-full flex flex-col bg-transparent text-white">
      <div className="p-4 border-b border-white/10 flex items-center gap-4">
        <IconButton onClick={handleBack} className="text-white">
          <ArrowBackIcon />
        </IconButton>
        <Avatar src={room.avatar?.url} className="w-10 h-10">
          {room.title[0]}
        </Avatar>
        <Typography variant="h6" className="flex-1">
          {room.title}
        </Typography>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <MessageItemList />
      </div>
      
      <div className="p-4 border-t border-white/10">
        <MessageSend 
          messageRoomId={room._id}
          type={room.messageType}
          title={room.title}
        />
      </div>
    </Paper>
  );
} 