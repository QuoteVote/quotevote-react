import React from 'react'
import { render } from '@testing-library/react'

// Component being tested
import SubmitPost from './SubmitPost'
import withTestWrapper from '../../hoc/withTestWrapper'

const SubmitPostWrapper = withTestWrapper(SubmitPost)

describe('SubmitPost test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <SubmitPostWrapper />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
