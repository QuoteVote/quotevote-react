import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { Provider } from 'react-redux'
import Profile from '../Profile'
import { GET_SEARCH_KEY } from '../../components/searchBar'
import store from '../../store/store'
import { GET_USER_ACTIVITY } from '../../graphql/query'

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

describe('Profile component unit tests', () => {
  let component
  beforeEach(async () => {
    component = mount(
      // eslint-disable-next-line react/jsx-no-undef
      <MockedProvider mocks={mocks} cache={cache} resolvers={{}} addTypename={false}>
        <Provider store={store}>
          <Profile />
        </Provider>
      </MockedProvider>,
    )
  })

  it('renders Profile without crashing', () => {
    expect(component).toMatchSnapshot()
  })
})
