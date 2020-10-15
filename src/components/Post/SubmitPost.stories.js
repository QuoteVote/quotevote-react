// Important stuff, must always be imported on a storybook file
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withA11y } from '@storybook/addon-a11y'

// Apollo Imports not needed for story, just for calling data
// If you want to apply theme

// The component
import SubmitPost from './SubmitPost'
import withTestWrapper from '../../hoc/withTestWrapper'

// Story config
export default {
  title: 'Post',
  component: SubmitPost,
  decorators: [withKnobs, withA11y],
}

// eslint-disable-next-line react/prop-types
const Wrapper = () => withTestWrapper(
  <SubmitPost />
)

export const base = () => <Wrapper width={500} />

base.story = {
  parameters: {
    jest: ['SubmitPost.test.js'],
  },
}
