import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/react-hooks'
import { GET_POST } from 'graphql/query'
import PostPage from 'views/PostsPage/PostPage'
import { SET_SELECTED_PAGE } from 'store/ui'

function PostController() {
  //  Set state for events and use viewModel props for redux/apollo?
  const conditions = ['POSTED', 'VOTED', 'COMMENTED', 'QUOTED']
  const [selectedEvent, setSelectedEvent] = useState(conditions)
  const [selectAll, setSelectAll] = useState('ALL')
  const [offset, setOffset] = useState(1)
  const limit = 5
  const { id } = useParams()
  console.log("POSTCONTROLLER: ")
  console.log(id)
  const [userInfo, setUserInfo] = useState({})
  const loggedInUser = useSelector((state) => state.user.data)

  const dispatch = useDispatch()
  const filterState = useSelector((state) => state.filter)
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

  const { data: postData } = useQuery(GET_POST, {
    variables: { postId: id },
  })

  useEffect(() => {
    dispatch(SET_SELECTED_PAGE(null))
  }, [dispatch])

  useEffect(() => {
    if (postData) {
      setUserInfo(postData)
    }
  }, [postData])

  return (
    <PostPage
      handleActivityEvent={handleActivityEvent}
      handleSelectAll={handleSelectAll}
      selectAll={selectAll}
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

export default PostController
