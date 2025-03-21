import React from 'react'
import { render } from '@testing-library/react'

// Component being tested
import Notification from './Notification'
import withTestWrapper from '../../hoc/withTestWrapper'

const NotificationWrapper = withTestWrapper(Notification)

describe('Notification test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <NotificationWrapper />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
