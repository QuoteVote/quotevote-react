import React, { useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from 'graphql/query'
import ProfileView from 'views/Profile/ProfileView'

function ProfileController() {
  //  Set state for events and use viewModel props for redux/apollo?
  const conditions = ['POSTED', 'VOTED', 'COMMENTED', 'QUOTED']
  const [selectedEvent, setSelectedEvent] = useState(conditions)
  const [selectAll, setSelectAll] = useState('ALL')
  const [offset, setOffset] = useState(1)
  const limit = 5
  const { userId } = useParams()
  const [userInfo, setUserInfo] = useState({})
  const loggedInUser = useSelector((state) => state.user.data)

  const [filterState, dispatch] = useReducer(filterReducer, {
    filter: {
      visibility: false,
    },
    date: {
      visibility: false,
    },
    search: {
      visibility: false,
    },
  })

  function filterReducer(state, action) {
    switch (action.type) {
      case 'FILTER_VISIBILITY':
        return {
          ...state,
          filter: { ...state.filter, visibility: action.payload },
        }
      case 'FILTER_VALUE':
        return { ...state, filter: { ...state.filter, value: action.payload } }
      case 'DATE_VISIBILITY':
        return { ...state, date: { ...state.date, visibility: action.payload } }
      case 'DATE_VALUE':
        return { ...state, date: { ...state.date, value: action.payload } }
      case 'SEARCH_VISIBILITY':
        return {
          ...state,
          search: { ...state.search, visibility: action.payload },
        }
      case 'SEARCH_VALUE':
        return { ...state, date: { ...state.search, value: action.payload } }
      default:
        throw new Error()
    }
  }

  const handleActivityEvent = (event, newActivityEvent) => {
    if (!newActivityEvent.length) {
      setSelectAll(['ALL'])
      setSelectedEvent(conditions)
    } else {
      const isAllToggled = newActivityEvent.length === 4
      setSelectAll(isAllToggled ? ['ALL'] : [])
      setSelectedEvent(newActivityEvent)
    }
  }

  const handleSelectAll = (event, newSelectAll) => {
    if (newSelectAll.length) {
      setSelectedEvent(conditions)
    }
    setSelectAll(newSelectAll)
  }

  const { data: userData } = useQuery(GET_USER, {
    variables: { user_id: userId || loggedInUser._id },
  })

  useEffect(() => {
    if (userData) {
      setUserInfo(userData.user)
    }
  }, [userData])

  return (
    <ProfileView
      handleActivityEvent={handleActivityEvent}
      handleSelectAll={handleSelectAll}
      selectAll={selectAll}
      loggedInUser={loggedInUser}
      filterState={filterState}
      dispatch={dispatch}
      setOffset={setOffset}
      profileUser={userInfo}
      limit={limit}
      offset={offset}
      selectedEvent={selectedEvent}
    />
  )
}

ProfileController.propTypes = {
  //   viewModel: PropTypes.object.isRequired,
}

export default ProfileController
