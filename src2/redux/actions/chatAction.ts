import { BuddyRoom } from '@/types/chat';

export const SELECTED_CHAT_ROOM = (room: BuddyRoom) => ({
  type: 'SELECTED_CHAT_ROOM',
  payload: room,
});

export const CHAT_SUBMITTING = (isSubmitting: boolean) => ({
  type: 'CHAT_SUBMITTING',
  payload: isSubmitting,
}); 