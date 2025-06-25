import React from 'react'
import { render } from '@testing-library/react'
import withTestWrapper from '../../hoc/withTestWrapper'
import SearchView from './SearchView'

const SearchViewWrapper = withTestWrapper(SearchView)

describe('SearchView test -', () => {
  it('renders correctly', () => {
    const { container } = render(<SearchViewWrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
