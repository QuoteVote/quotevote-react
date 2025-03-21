import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import BusinessForm from './BusinessForm'
import store from '../../../store/store'

const props = {
  handleSubmit: jest.fn(),
  register: jest.fn(),
  errors: {
    fullName: '',
  },
}

const BusinessFormWrapper = () => (
  <Provider store={store}>
    <BusinessForm {...props} />
  </Provider>
)

describe('BusinessForm test -', () => {
  it('renders correctly', () => {
    const { container } = render(<BusinessFormWrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
