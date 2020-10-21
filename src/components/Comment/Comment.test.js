import React from 'react'
import { render } from '@testing-library/react'

// Component being tested
import Comment from './Comment'
import withTestWrapper from '../../hoc/withTestWrapper'

const CommentPostWrapper = withTestWrapper(Comment)

describe('Comment test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <CommentPostWrapper />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
