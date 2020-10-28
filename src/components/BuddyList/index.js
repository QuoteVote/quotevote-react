import React from 'react'
import { isEmpty } from 'lodash'
import { useQuery } from '@apollo/react-hooks'
import { GET_CHAT_ROOMS } from '../../graphql/query'
import LoadingSpinner from '../LoadingSpinner'
import BuddyItemList from './BuddyItemList'

export default function BuddyList() {
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

  if (loading) return <LoadingSpinner size={50} />

  return <BuddyItemList buddyList={buddyList} />
}
