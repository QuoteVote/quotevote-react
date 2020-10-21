import React from 'react'
import { render } from '@testing-library/react'

// Component being tested
import Post from './Post'
import withTestWrapper from '../../hoc/withTestWrapper'

const SubmitPostWrapper = withTestWrapper(Post)

describe('Post test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <SubmitPostWrapper />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
