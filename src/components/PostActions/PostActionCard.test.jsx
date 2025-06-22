import React from 'react'
import { render } from '@testing-library/react'

// Component being tested
import PostActionCard from './PostActionCard'
import withTestWrapper from '../../hoc/withTestWrapper'

const postAction = {
  _id: 1234,
  user: {
    name: 'John',
    avatar: 'J',
    username: 'jdoe',
  },
  content: 'TEST',
  created: '2020-11-01',
}

function PostActionCardWithProps() {
  return (<PostActionCard postAction={postAction} postUrl="" selected />)
}

const PostActionCardWrapper = withTestWrapper(PostActionCardWithProps)

describe('PostActionCard test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PostActionCardWrapper />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
