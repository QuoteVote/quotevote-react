import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'

//  Todo - styling
// const useStyles = makeStyles((theme) => ({
// }))

export const GET_SEARCH_START_DATE = gql`
  {
    startDateRange @client
  }
`

Datepicker.propTypes = {
  // setOffset: PropTypes.func.isRequired,
}

export default function Datepicker() {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  })
  const [focus, setFocus] = useState(null)

  const { startDate, endDate } = dateRange

  // eslint-disable-next-line no-shadow
  const handleOnDateChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate })
  }

  return (
    <DateRangePicker
      startDatePlaceholderText="Start"
      startDate={startDate}
      onDatesChange={handleOnDateChange}
      endDatePlaceholderText="End"
      endDate={endDate}
      numberOfMonths={1}
      displayFormat="MMM D"
      showClearDates
      focusedInput={focus}
      onFocusChange={(focusArg) => setFocus(focusArg)}
      startDateId="startDateMookh"
      endDateId="endDateMookh"
      minimumNights={0}
    />
  )
}
