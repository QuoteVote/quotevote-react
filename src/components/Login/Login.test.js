import React from 'react'
import { render } from '@testing-library/react'

// Component being tested
import Login from './Login'

describe('Login test -', () => {
  it('renders correctly', () => {
    const { container } = render(<Login />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
