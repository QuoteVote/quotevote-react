import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { Provider } from 'react-redux'
import Homepage from '../Homepage'
import { GET_SEARCH_KEY } from '../../../components/SearchBar'
import { GET_USER_ACTIVITY } from '../../../graphql/query'
import store from '../../../store/store'

const searchKey = 'Test'
const mocks = [
  {
    request: {
      query: GET_USER_ACTIVITY,
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
        <Provider store={store}>
          <Homepage />
        </Provider>
      </MockedProvider>
    )
  })

  it('renders Homepage without crashing', () => {
    expect(component).toMatchSnapshot()
  })
})
