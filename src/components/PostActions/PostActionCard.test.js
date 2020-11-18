import React from 'react'
import { render } from '@testing-library/react'

// Component being tested
import PostActionCard from './PostActionCard'
import withTestWrapper from '../../hoc/withTestWrapper'

const PostActionCardWrapper = withTestWrapper(PostActionCard)

describe('PostActionCard test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PostActionCardWrapper />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
