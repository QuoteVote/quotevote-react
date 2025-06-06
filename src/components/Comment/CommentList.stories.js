// Important stuff, must always be imported on a storybook file
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withA11y } from '@storybook/addon-a11y'

// Apollo Imports not needed for story, just for calling data
// If you want to apply theme
// The component
import Comments from './CommentList'

// Story config
export default {
  title: 'Comment',
  component: Comments,
  decorators: [withKnobs, withA11y],
}

const comment = {
  user: {
    name: 'John Doe',
    username: 'jdoe',
  },
  avatar: 'J',
  created: '11/06/2018 11:00 AM',
  text: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
}

// eslint-disable-next-line no-unused-vars
const comments = Array.from({ length: 20 }).map((i) => comment)

export const CommentList = () => <Comments comments={comments} />

export const NoComments = () => <Comments />

CommentList.story = {
  parameters: {
    jest: ['CommentList.test.js'],
  },
}
