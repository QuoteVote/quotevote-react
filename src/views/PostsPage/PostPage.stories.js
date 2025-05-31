// Important stuff, must always be imported on a storybook file
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withA11y } from '@storybook/addon-a11y'

// Apollo Imports not needed for story, just for calling data
// If you want to apply theme
// The component
import PostPage from './PostPage'

// Story config
export default {
  title: 'PostPage',
  component: PostPage,
  decorators: [withKnobs, withA11y],
}

export const base = () => <PostPage />

PostPage.story = {
  parameters: {
    jest: ['PostPage.test.js'],
  },
}
