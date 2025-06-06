import React from 'react'
import { render } from '@testing-library/react'
import Homepage from '../Homepage'
import withTestWrapper from '../../../hoc/withTestWrapper'

const HomepageWrapper = withTestWrapper(Homepage)

describe('Post test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <HomepageWrapper />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
