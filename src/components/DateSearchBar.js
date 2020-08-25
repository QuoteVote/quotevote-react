import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
// import Paper from '@material-ui/core/Paper'
// import InputBase from '@material-ui/core/InputBase'
// import Divider from '@material-ui/core/Divider'
// import IconButton from '@material-ui/core/IconButton'
// import SearchIcon from '@material-ui/icons/Search'
// import TextField from '@material-ui/core/TextField'
// import { DateRangePicker, DateRange, DateRangeDelimiter } from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    flexBasis: 300,
    minWidth: 0,
    flexWrap: 'inherit',
    maxHeight: 50,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export const GET_SEARCH_START_DATE = gql`
  {
    startDateRange @client
  }
`

DateSearchBar.propTypes = {
  setOffset: PropTypes.func.isRequired,
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


function DateSearchBar({ setOffset }) {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles()
  const { client } = useQuery(GET_SEARCH_START_DATE)
  // const [selectedDate, handleDateChange] = React.useState<DateRange>([null, null])
  // eslint-disable-next-line no-unused-vars
  const handleChangeStartDate = (event) => {
    client.writeData({ data: { startDateRange: event.target.value } })
    setOffset(0)
  }

  // console.log('Rendering DateSearchBar startDateRange', startDateRange)
  /*
  In an ideal world we can use this
  <DateRangePicker
    startText="Check-in"
    endText="Check-out"
    value={selectedDate}
    onChange={(date) => handleDateChange(date)}
    renderInput={(startProps, endProps) => (
      <>
        <TextField {...startProps} />
        <DateRangeDelimiter> to </DateRangeDelimiter>
        <TextField {...endProps} />
      </>
    )}
  />
  */
  return (
    <DateRangePicker
      startDate={null} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={null} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={() => {}} // PropTypes.func.isRequired,
      focusedInput={null} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={() => {}} // PropTypes.func.isRequired,
    />
  )
}
