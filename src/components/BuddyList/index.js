import React from 'react'
import { isEmpty } from 'lodash'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import { GET_CHAT_ROOMS } from '../../graphql/query'
import LoadingSpinner from '../LoadingSpinner'
import BuddyItemList from './BuddyItemList'

function BuddyList({ search }) {
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS)
  const buddyList =
    (!error && !loading && data && !isEmpty(data.messageRooms) &&
      data.messageRooms.map((item) => ({
        room: item,
        Text: item.title,
        color: '#191919',
        type: item.messageType,
        avatar: item.avatar,
      }))) ||
    []

  const filteredBuddyList = search ? buddyList.filter((buddy) => buddy.Text.includes(search)) : buddyList

  if (loading) return <LoadingSpinner size={50} />

  return <BuddyItemList buddyList={filteredBuddyList} />
}

BuddyList.propTypes = {
  search: PropTypes.string,
}

export default BuddyList
