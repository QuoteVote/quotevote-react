import React, { useState } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'

export const GET_SEARCH_START_DATE = gql`
  {
    startDateRange @client
  }
`

Datepicker.propTypes = {
  setOffset: PropTypes.func.isRequired,
  setDateRangeFilter: PropTypes.func.isRequired,
  dateRangeFilter: PropTypes.object.isRequired,
}

export default function Datepicker({ setOffset, dateRangeFilter, setDateRangeFilter }) {
  const [focus, setFocus] = useState(null)
  const { startDate, endDate } = dateRangeFilter

  // eslint-disable-next-line no-shadow
  const handleOnDateChange = ({ startDate, endDate }) => {
    setDateRangeFilter({ startDate, endDate })
    setOffset(0)
  }

  return (
    <DateRangePicker
      startDatePlaceholderText="Start"
      startDate={startDate}
      onDatesChange={handleOnDateChange}
      endDatePlaceholderText="End"
      endDate={endDate}
      numberOfMonths={1}
      displayFormat="MMM D, YYYY"
      showClearDates
      focusedInput={focus}
      onFocusChange={(focusArg) => setFocus(focusArg)}
      startDateId="startDateMookh"
      endDateId="endDateMookh"
      minimumNights={0}
      isOutsideRange={() => false}
    />
  )
}
