// Important stuff, must always be imported on a storybook file
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withA11y } from '@storybook/addon-a11y'

// Apollo Imports not needed for story, just for calling data
// If you want to apply theme
// The component
import Notification from './Notification'
import NotificationLists from './NotificationLists'

// Story config
export default {
  title: 'Notifications',
  component: Notification,
  decorators: [withKnobs, withA11y],
}
const notificationsData = [
  {
    _id: '1234',
    notificationType: 'UPVOTED',
    label: 'Relax, you don’t have any alerts right now.',
    userBy: { avatar: 'J', name: 'John' },
    created: '2020-11-09 03:12 PM',
  },
  {
    _id: '1235',
    notificationType: 'DOWNVOTED',
    label: 'I\'ll be in your neighborhood doing errands this',
    userBy: { avatar: 'J', name: 'John' },
    created: '2020-11-02 03:12 PM',
  },
  {
    _id: '1236',
    notificationType: 'COMMENTED',
    label: 'Wish I could come, but I\'m out of town this…',
    userBy: { avatar: 'J', name: 'John' },
    created: '2020-11-05 03:12 PM',
  },
]

export const Base = () => <NotificationLists notifications={notificationsData} />
export const EmptyList = () => <NotificationLists />

Base.story = {
  parameters: {
    jest: ['NotificationLists.test.js', 'Notification.test.js'],
  },
}
