// Important stuff, must always be imported on a storybook file
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withA11y } from '@storybook/addon-a11y'

// Apollo Imports not needed for story, just for calling data
// If you want to apply theme
// The component
import SubmitPostForm from './SubmitPostForm'

// Story config
export default {
  title: 'Submit Post',
  component: SubmitPostForm,
  decorators: [withKnobs, withA11y],
}

export const Form = () => <SubmitPostForm />

Form.story = {
  parameters: {
    jest: ['SubmitPostForm.test.js'],
  },
}
