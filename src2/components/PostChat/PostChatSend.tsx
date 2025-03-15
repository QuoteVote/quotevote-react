'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SEND_MESSAGE } from '@/graphql/mutations';
import { GET_ROOM_MESSAGES } from '@/graphql/queries';
import { CHAT_SUBMITTING } from '@/redux/actions/chatAction';

interface PostChatSendProps {
  messageRoomId: string;
  title: string;
}

export default function PostChatSend({ messageRoomId, title }: PostChatSendProps) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const user = useSelector((state: any) => state.user.data);
  const type = 'POST';

  const [createMessage, { loading }] = useMutation(SEND_MESSAGE, {
    onError: (err) => {
      setError(err.message);
    },
    refetchQueries: [{
      query: GET_ROOM_MESSAGES,
      variables: { messageRoomId },
    }],
  });

  const handleSubmit = async () => {
    if (!text.trim() || loading) return;
    
    dispatch(CHAT_SUBMITTING(true));
    const dateSubmitted = new Date();

    try {
      await createMessage({
        variables: { 
          input: {
            content: text,
            messageRoomId,
            title,
            type,
          }
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createMessage: {
            __typename: 'Message',
            _id: dateSubmitted.toISOString(),
            messageRoomId,
            content: text,
            createdAt: dateSubmitted.toISOString(),
            sender: {
              __typename: 'User',
              _id: user._id,
              name: user.name,
              avatar: user.avatar,
            },
          },
        },
      });
      setText('');
      setError('');
    } catch (err) {
      // Error handled by onError above
    } finally {
      dispatch(CHAT_SUBMITTING(false));
    }
  };

  return (
    <Paper className="flex p-2 rounded-lg">
      <InputBase
        className="flex-1 mx-2"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
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