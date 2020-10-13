import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from 'store/store'

// Component being tested
import Unauthorized from './Unauthorized'

describe('Unauthorized test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Unauthorized />
      </Provider>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
