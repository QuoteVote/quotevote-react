import React from 'react'
import { render } from '@testing-library/react'

// Component being tested
import NotificationLists from './NotificationLists'
import withTestWrapper from '../../hoc/withTestWrapper'

const NotificationListsWrapper = withTestWrapper(NotificationLists)

describe('NotificationLists test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <NotificationListsWrapper />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
