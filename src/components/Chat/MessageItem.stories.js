import React from 'react'

import MessageItem from './MessageItem'

export default {
  component: MessageItem,
  title: 'Chat',
}

export const Message = () => <MessageItem />

export const MessageReverse = () => <MessageItem direction="row-reverse" />
