'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, IconButton, Popover } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useMutation } from '@apollo/client';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { find, groupBy } from 'lodash';
import { ADD_MESSAGE_REACTION, UPDATE_MESSAGE_REACTION } from '@/graphql/mutations';
import { GET_MESSAGE_REACTIONS } from '@/graphql/queries';
import { parseCommentDate } from '@/utils/momentUtils';

interface Reaction {
  _id: string;
  userId: string;
  emoji: string;
}

interface PostChatReactionsProps {
  messageId: string;
  reactions: Reaction[];
  created?: string;
}

export default function PostChatReactions({ messageId, reactions, created }: PostChatReactionsProps) {
  const userId = useSelector((state: any) => state.user.data._id);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const parsedTime = created ? parseCommentDate(created) : '';

  const [addReaction] = useMutation(ADD_MESSAGE_REACTION, {
    refetchQueries: [{
      query: GET_MESSAGE_REACTIONS,
      variables: { messageId },
    }],
  });

  const [updateReaction] = useMutation(UPDATE_MESSAGE_REACTION, {
    refetchQueries: [{
      query: GET_MESSAGE_REACTIONS,
      variables: { messageId },
    }],
  });

  const userReaction = find(reactions, { userId });
  const groupedReactions = groupBy(reactions, 'emoji');

  const handleEmojiSelect = async (emoji: any) => {
    const newEmoji = emoji.native;
    const reaction = {
      userId,
      messageId,
      emoji: newEmoji,
    };

    try {
      if (userReaction) {
        await updateReaction({
          variables: { _id: userReaction._id, emoji: reaction.emoji },
        });
      } else {
        await addReaction({
          variables: { reaction },
        });
      }
    } catch (err) {
      console.error('Error handling reaction:', err);
    }

    setAnchorEl(null);
  };

  return (
    <Grid container alignItems="center" className="mt-2 mb-1">
      <Typography variant="caption" className="text-gray-500 pr-2">
        {parsedTime}
      </Typography>
      
      <IconButton
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <InsertEmoticonIcon fontSize="small" />
      </IconButton>

      {Object.entries(groupedReactions).map(([emoji, reactions]) => (
        <div
          key={emoji}
          className="rounded-lg bg-gray-100 px-2 py-1 ml-1 flex items-center gap-1"
        >
          <span role="img" aria-label="emoji">
            {emoji}
          </span>
          <span className="text-xs">{reactions.length}</span>
        </div>
      ))}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Picker
          data={data}
          onEmojiSelect={handleEmojiSelect}
          theme="light"
        />
      </Popover>
    </Grid>
  );
} 