import React from 'react'
import { render } from '@testing-library/react'

// Component being tested
import Comment from './Comment'
import withTestWrapper from '../../hoc/withTestWrapper'

const comment = {
  user: {
    name: 'John',
    avatar: 'J',
    username: 'jdoe',
  },
  content: 'TEST',
  created: '2020-11-01',
}

function CommentData() {
  return (<Comment comment={comment} />)
}

const CommentPostWrapper = withTestWrapper(CommentData)

describe('Comment test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <CommentPostWrapper />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
