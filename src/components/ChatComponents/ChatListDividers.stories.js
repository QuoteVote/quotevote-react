import React from 'react'

import ChatListDividers from './ChatListDividers'

export default {
  component: ChatListDividers,
  title: 'ChatListDividers',
  // Our exports that end in "Data" are not stories.s
  excludeStories: /.*Data$/,
}

const List = [{
  Text: 'test',
  color: 'orange',
  icon: '',
}]

export const chatListDividers = () => <ChatListDividers List={List} />
