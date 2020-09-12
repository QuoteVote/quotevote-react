import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import PaymentMethod from './PaymentMethod'
import store from '../../../store/store'

const PaymentMethodWrapper = () => (
  <Provider store={store}>
    <PaymentMethod />
  </Provider>
)

describe('PaymentMethod test -', () => {
  it('renders correctly', () => {
    const { container } = render(<PaymentMethodWrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
