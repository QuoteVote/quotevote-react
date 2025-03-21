import moment from 'moment';

export const parseCommentDate = (date: string): string => {
  const momentDate = moment(date);
  const now = moment();
  
  if (momentDate.isSame(now, 'day')) {
    return momentDate.format('HH:mm');
  }
  
  if (momentDate.isSame(now, 'week')) {
    return momentDate.format('ddd HH:mm');
  }
  
  if (momentDate.isSame(now, 'year')) {
    return momentDate.format('MMM D');
  }
  
  return momentDate.format('MMM D, YYYY');
};

export const formatMessageTime = (date: string): string => {
  const momentDate = moment(date);
  const now = moment();
  
  if (momentDate.isSame(now, 'day')) {
    return momentDate.format('HH:mm');
  }
  
  if (momentDate.isSame(now.subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  }
  
  if (momentDate.isSame(now, 'week')) {
    return momentDate.format('dddd');
  }
  
  return momentDate.format('MMM D');
};

export const isNewDay = (currentDate: string, previousDate?: string): boolean => {
  if (!previousDate) return true;
  
  const current = moment(currentDate).startOf('day');
  const previous = moment(previousDate).startOf('day');
  
  return !current.isSame(previous, 'day');
}; 