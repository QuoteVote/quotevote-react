'use client';

import { List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';

interface PostActionListProps {
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export default function PostActionList({ onLike, onComment, onShare }: PostActionListProps) {
  const actions = [
    { icon: <FavoriteIcon />, text: 'Like', onClick: onLike },
    { icon: <CommentIcon />, text: 'Comment', onClick: onComment },
    { icon: <ShareIcon />, text: 'Share', onClick: onShare },
  ];

  return (
    <Paper className="mt-4">
      <List>
        {actions.map((action, index) => (
          <ListItem
            key={index}
            button
            onClick={action.onClick}
            className="hover:bg-gray-100"
          >
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText primary={action.text} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
} 