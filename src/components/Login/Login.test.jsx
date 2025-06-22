import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from 'store/store'

// Component being tested
import Login from './Login'

describe('Login test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Login />
      </Provider>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it.todo('validate email')
  it.todo('validate password')
  it.todo('submits upon button press')
})
