import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import Plans from './Plans'
import store from '../../../store/store'

const PlansWrapper = () => (
  <Provider store={store}>
    <Plans />
  </Provider>
)

describe('Plans test -', () => {
  it('renders correctly', () => {
    const { container } = render(<PlansWrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
