import React, { useState, useReducer, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

//  MUI
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'
import { GET_SEARCH_KEY } from 'components/searchBar'
import Pagination from 'material-ui-flat-pagination'

//  Local
import { GET_USER_ACTIVITY, GET_USER } from 'graphql/query'
import { composePost } from 'utils/display'
import AlertList from 'components/AlertList'
import AppBar from 'components/Navbars/ProfileHeader'
import LoadingSpinner from 'components/LoadingSpinner'

// GQL
import { GET_SEARCH_START_DATE } from 'components/DateSearchBar'

const useStyles = makeStyles((theme) => ({
  activityListCard: {
    [theme.breakpoints.up('lg')]: {
      padding: 100,
      paddingTop: 10,
    },
    [theme.breakpoints.down('md')]: {
      padding: 10,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}))

function filterReducer(state, action) {
  switch (action.type) {
    case 'FILTER_VISIBILITY':
      return { ...state, filter: { ...state.filter, visibility: action.payload } }
    case 'FILTER_VALUE':
      return { ...state, filter: { ...state.filter, value: action.payload } }
    case 'DATE_VISIBILITY':
      return { ...state, date: { ...state.date, visibility: action.payload } }
    case 'DATE_VALUE':
      return { ...state, date: { ...state.date, value: action.payload } }
    case 'SEARCH_VISIBILITY':
      return { ...state, search: { ...state.search, visibility: action.payload } }
    case 'SEARCH_VALUE':
      return { ...state, date: { ...state.search, value: action.payload } }
    default:
      throw new Error()
  }
}

//  TODO
//  - [x] User Query for followers/following/(anything not in user reducer)
//  - [x] Refactor Activity query to accept UserId arg
//  - [x] Route using url params so that we can handle any profile (not just logged in user)
//  - [x] Use Isaacs icons for search/filter/ etc.
//  - [x] Native Date input (https://caniuse.com/#feat=input-datetime)
//  - [] make decisions on date widget material-pickers
//  - [] backend date search
//  - [x] Follow Unfollow button wiring
//  - [x] followers/following display on subheader
//  - [] Style sub header better, mostly tab list
//  - [] MOBILE design from figma v2

export default function Profile() {
  const classes = useStyles()
  const theme = useTheme()
  const { userId } = useParams()
  const loggedInUser = useSelector((state) => state.user.data)
  // Filtering resources
  const limit = 5
  const [offset, setOffset] = useState(1)
  const conditions = ['POSTED', 'VOTED', 'COMMENTED', 'QUOTED']
  const [selectedEvent, setSelectedEvent] = useState(conditions)
  const [selectAll, setSelectAll] = useState('ALL')
  const [userInfo, setUserInfo] = useState({})
  const [total, setTotal] = useState(1)
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

  //  Possibilities:
  //    1. This is the logged in users profile
  //    2. Different User
  //  If there is a userId in route params,
  //  we know its a different User profile.

  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER, {
    variables: { user_id: userId || loggedInUser._id },
  })

  useEffect(() => {
    if (userData) {
      setUserInfo(userData.user)
    }
  }, [userData])

  const handleSelectAll = (event, newSelectAll) => {
    if (newSelectAll.length) {
      setSelectedEvent(conditions)
    }
    setSelectAll(newSelectAll)
  }

  //  Date and Text Search Filters (apollo storage)
  const { data: { searchKey } } = useQuery(GET_SEARCH_KEY)
  const { data: { startDateRange } } = useQuery(GET_SEARCH_START_DATE)

  const { loading, data } = useQuery(GET_USER_ACTIVITY, {
    variables: {
      limit, offset, searchKey, startDateRange, activityEvent: selectedEvent, user_id: userId || loggedInUser._id,
    },
  })

  const handleActivityEvent = (event, newActivityEvent) => {
    // console.log('activityEvent newActivityEvent', newActivityEvent)
    if (!newActivityEvent.length) {
      setSelectAll(['ALL'])
      setSelectedEvent(conditions)
    } else {
      const isAllToggled = newActivityEvent.length === 4
      setSelectAll(isAllToggled ? ['ALL'] : [])
      setSelectedEvent(newActivityEvent)
    }
  }

  const { activities } = (!loading && data && data.activities) || { activities: { activities: [], total: 0 } }
  useEffect(() => {
    if (data) {
      setTotal(data.activities.total)
    }
  }, [data])

  const activitiesData = !loading && activities && activities.length && activities.map((activity) => composePost(activity, theme))
  if (userLoading) return <LoadingSpinner />

  if (userData) {
    return (
      <Card className={classes.activityListCard}>
        <AppBar
          handleActivityEvent={handleActivityEvent}
          handleSelectAll={handleSelectAll}
          selectAll={selectAll}
          loggedInUser={loggedInUser}
          filterState={filterState}
          dispatch={dispatch}
          setOffset={setOffset}
          profileUser={userInfo}
        />
        <CardBody>
          <AlertList Data={activitiesData} loading={loading} limit={limit} />
        </CardBody>
        <Pagination
          style={{ margin: 'auto' }}
          limit={limit}
          offset={offset}
          total={total}
          onClick={(e, offsetVal) => setOffset(offsetVal)}
        />
      </Card>
    )
  }
}
