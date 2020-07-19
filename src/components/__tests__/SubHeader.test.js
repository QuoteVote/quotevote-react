/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from 'react'
import SubHeader from '../SubHeader'

describe('SubHeader component unit test', () => {
  let component

  beforeEach(async () => {
    component = mount(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <SubHeader />
        </Provider>
      </ApolloProvider>
    )
  })

  it('renders SubHeader without crashing', () => {
    expect(component).toMatchSnapshot()
  })
})
