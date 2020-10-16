// Important stuff, must always be imported on a storybook file
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withA11y } from '@storybook/addon-a11y'

// Apollo Imports not needed for story, just for calling data
// If you want to apply theme
// The component
import SubmitPost from './SubmitPost'

// Story config
export default {
  title: 'Submit Post',
  component: SubmitPost,
  decorators: [withKnobs, withA11y],
}

export const SubmitPostWithOptions = () => <SubmitPost options={[]} user={{ name: 'John Doe', avatar: '' }} />

SubmitPostWithOptions.story = {
  parameters: {
    jest: ['SubmitPost.test.js'],
  },
}
