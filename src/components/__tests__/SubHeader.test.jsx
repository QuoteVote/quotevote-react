/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from 'react'
import { render } from '@testing-library/react'
import SubHeader from '../SubHeader'
import withTestWrapper from '../../hoc/withTestWrapper'

const SubHeaderWrapper = withTestWrapper(SubHeader)

describe('SubHeader test -', () => {
  it('renders correctly', () => {
    const { container } = render(
      <SubHeaderWrapper />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
