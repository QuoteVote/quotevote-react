import React from 'react'
import Card from 'mui-pro/Card/Card'
import Pagination from 'material-ui-flat-pagination'
import { ACTIVITIES_QUERY } from '../HomepageGQL'
import Homepage from '../Homepage'
import { GET_SEARCH_KEY } from '../../../components/searchBar'

const searchKey = 'Test'
const mocks = [
  {
    request: {
      query: ACTIVITIES_QUERY,
      variables: {
        limit: 5,
        offset: 0,
        searchKey,
        activityEvent: ['POSTED', 'VOTED', 'COMMENTED', 'QUOTED'],
      },
    },
    result: {
      data: {
        activities: [],
      },
    },
  },
  {
    request: {
      query: GET_SEARCH_KEY,
    },
    result: {
      data: {
        searchKey,
      },
    },
  },
]

describe('Homepage component unit tests', () => {
  let component
  beforeEach(async () => {
    component = mount(
      // eslint-disable-next-line react/jsx-no-undef
      <MockedProvider mocks={mocks} cache={cache} resolvers={{}} addTypename={false}>
        <Homepage />
      </MockedProvider>,
    )
  })

  it('renders Homepage without crashing', () => {
    expect(component).toMatchSnapshot()
  })

  it('should exist Card tag', async () => {
    const fnd = component.find(Card)
    expect(fnd.exists()).toBeTruthy()
  })

  it('should exist Pagination tag', async () => {
    const fnd = component.find(Pagination)
    expect(fnd.exists()).toBeTruthy()
  })
})
