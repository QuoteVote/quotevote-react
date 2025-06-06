import React from 'react'
import { render } from '@testing-library/react'

// Component being tested
import Post from './Post'
import withTestWrapper from '../../hoc/withTestWrapper'
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

function PostData() {
  return (<Post post={post} user={user} />)
}

const SubmitPostWrapper = withTestWrapper(PostData)

describe('Post test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <SubmitPostWrapper />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
