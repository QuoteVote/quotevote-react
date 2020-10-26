/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from 'react'
import Card from 'mui-pro/Card/Card'
import PostCard from '../PostCard'

describe('PostCard component unit test', () => {
  let component
  const props = {
    _id: 123,
    text: '',
    title: '',
    upvotes: 0,
    downvotes: 0,
    url: '',
    bookmarkedBy: [],
    rank: 1,
    created: '',
    creator: {
      avatar: {
        accessoriesType: 'Sunglasses',
        eyebrowType: 'FlatNatural',
        facialHairColor: 'Brown',
      },
    },
    onHidePost: jest.fn(),
    onBookmark: jest.fn(),
  }

  beforeEach(async () => {
    component = mount(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PostCard {...props} />
        </Provider>
      </ApolloProvider>
    )
  })

  it('renders PostCard without crashing', () => {
    expect(component).toMatchSnapshot()
  })

  it('should exist Card tag', async () => {
    const fnd = component.find(Card)
    expect(fnd.exists()).toBeTruthy()
  })
})
