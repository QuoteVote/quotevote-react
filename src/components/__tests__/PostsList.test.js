/* eslint-disable react/jsx-no-undef */
import React from 'react'
import PostsList, { LoadPostsList } from '../PostsList'
import AlertSkeletonLoader from '../AlertSkeletonLoader'

describe('PostsList component unit test', () => {
  let component
  const props = {
    Data: {
      posts: [],
    },
    loading: false,
    limit: 1,
  }

  beforeEach(async () => {
    component = shallow(
      <PostsList {...props} />
    )
  })

  it('renders PostsList without crashing', () => {
    expect(component).toMatchSnapshot()
  })

  it('should LoadPostsList if loading = false', async () => {
    const fnd = component.find(LoadPostsList)
    expect(fnd.exists()).toBeTruthy()
  })

  it('should exist AlertSkeletonLoader if loading = true', async () => {
    component.setProps({ loading: true })
    const fnd = component.find(AlertSkeletonLoader)
    expect(fnd.exists()).toBeTruthy()
  })
})
