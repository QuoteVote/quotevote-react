'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SEND_MESSAGE } from '@/graphql/mutations';
import { GET_ROOM_MESSAGES } from '@/graphql/queries';
import { CHAT_SUBMITTING } from '@/redux/actions/chatAction';
import { InputChangeEvent, KeyboardEvent } from '@/utils/react';

interface MessageSendProps {
  messageRoomId: string;
  type?: string;
}

export default function MessageSend({ messageRoomId, type = 'CHAT' }: MessageSendProps) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const user = useSelector((state: any) => state.user.data);

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    refetchQueries: [{
      query: GET_ROOM_MESSAGES,
      variables: { messageRoomId },
    }],
  });

  const handleSubmit = async () => {
    if (!text.trim() || loading) return;

    dispatch(CHAT_SUBMITTING(true));

    const message = {
      messageRoomId,
      content: text,
      type,
    };

    setText('');

    try {
      await sendMessage({
        variables: { input: message },
        optimisticResponse: {
          createMessage: {
            __typename: 'Message',
            _id: new Date().toISOString(),
            messageRoomId,
            content: text,
            createdAt: new Date().toISOString(),
            sender: {
              __typename: 'User',
              _id: user._id,
              name: user.name,
              avatar: user.avatar,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      dispatch(CHAT_SUBMITTING(false));
    }
  };

  const handleChange = (e: InputChangeEvent) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Paper className="p-2 flex items-center gap-2">
      <InputBase
        className="flex-1 px-2"
        placeholder="Type a message..."
        value={text}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        multiline
        maxRows={4}
      />
      <IconButton 
        onClick={handleSubmit}
        disabled={!text.trim() || loading}
        color="primary"
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
} 