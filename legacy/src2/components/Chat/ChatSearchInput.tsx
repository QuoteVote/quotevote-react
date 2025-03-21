'use client';

import React, { ChangeEvent } from '@/utils/imports';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ChatSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ChatSearchInput({ value, onChange }: ChatSearchInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      fullWidth
      placeholder="Search chats..."
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className="text-white" />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      size="small"
      className="mb-4"
      sx={{
        '& .MuiOutlinedInput-root': {
          color: 'white',
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'white',
        },
        '& .MuiInputBase-input::placeholder': {
          color: 'rgba(255, 255, 255, 0.7)',
          opacity: 1,
        },
      }}
    />
  );
} 