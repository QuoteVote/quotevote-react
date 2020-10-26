// Important stuff, must always be imported on a storybook file
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withA11y } from '@storybook/addon-a11y'

// Apollo Imports not needed for story, just for calling data
// If you want to apply theme
// The component
import Post from './Post'
import PostSkeleton from './PostSkeleton'

// Story config
export default {
  title: 'Post',
  component: Post,
  decorators: [withKnobs, withA11y],
}

const post = {
  creator: {
    name: 'John Doe',
    avatar: 'J',
  },
  created: '11/06/2018 11:00 AM',
  title: 'Title of a post',
  text: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  upvotes: 100,
  downvotes: 200,
  approvedBy: [],
  rejectedBy: [],
}

const user = {
  name: 'John Doe',
  avatar: 'J',
}

export const Base = () => <Post post={post} user={user} />
export const Loading = () => <PostSkeleton />

Base.story = {
  parameters: {
    jest: ['Post.test.js'],
  },
}
