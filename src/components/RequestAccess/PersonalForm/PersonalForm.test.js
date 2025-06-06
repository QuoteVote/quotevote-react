import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import PersonalForm from './PersonalForm'
import store from '../../../store/store'

const props = {
  handleSubmit: jest.fn(),
  register: jest.fn(),
  errors: {
    fullName: '',
  },
}

const PersonalFormWrapper = () => (
  <Provider store={store}>
    <PersonalForm {...props} />
  </Provider>
)

describe('PersonalForm test -', () => {
  it('renders correctly', () => {
    const { container } = render(<PersonalFormWrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
