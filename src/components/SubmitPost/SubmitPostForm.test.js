import React from 'react'
import { render } from '@testing-library/react'

// Component being tested
import SubmitPostForm from './SubmitPostForm'
import withTestWrapper from '../../hoc/withTestWrapper'

const SubmitPostFormWrapper = withTestWrapper(SubmitPostForm)

describe('SubmitPostForm test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <SubmitPostFormWrapper />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
