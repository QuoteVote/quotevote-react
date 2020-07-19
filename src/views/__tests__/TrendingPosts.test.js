/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from 'react'
import Card from 'mui-pro/Card/Card'
import TrendingPosts from '../TrendingPosts'

describe('TrendingPosts component unit test', () => {
  let component

  beforeEach(async () => {
    component = mount(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <TrendingPosts />
        </Provider>
      </ApolloProvider>
    )
  })

  it('renders TrendingPosts without crashing', () => {
    expect(component).toMatchSnapshot()
  })

  it('should exist Card tag', async () => {
    const fnd = component.find(Card)
    expect(fnd.exists()).toBeTruthy()
  })
})
