import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Typography,
  Button,
  InputBase,
  Paper,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import format from 'date-fns/format'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import LivePostStream from '../../components/Post/LivePostStream'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  iconsContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(2),
    border: '1px solid #ddd',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: theme.palette.text.secondary,
  },
  icon: {
    margin: theme.spacing(0, 1),
    color: theme.palette.text.secondary,
    fontSize: '1.5rem',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      backgroundColor: theme.palette.action.hover,
    },
  },
  activeFilter: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  datePickerContainer: {
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    maxWidth: 400,
    margin: '0 auto',
    marginBottom: 16,
  },
  datePickerInput: {
    '& .react-datepicker-wrapper': {
      width: '100%',
    },
    '& .react-datepicker__input-container input': {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      fontFamily: theme.typography.fontFamily,
      '&:focus': {
        outline: 'none',
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
      },
    },
  },
}))

function SearchView() {
  const classes = useStyles()
  const loggedIn = useSelector((state) => !!state.user.data._id)
  const [paused, setPaused] = useState(false)
  const [filterMode, setFilterMode] = useState('all')
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [dateRangeFilter, setDateRangeFilter] = useState({ startDate: null, endDate: null })
  const [searchKey, setSearchKey] = useState('')
  const [streamEnabled, setStreamEnabled] = useState(loggedIn)

  const togglePause = () => setPaused((p) => !p)
  const handleFriendsFilter = () => setFilterMode((m) => (m === 'friends' ? 'all' : 'friends'))
  const handleInteractionsFilter = () => setFilterMode((m) => (m === 'interactions' ? 'all' : 'interactions'))
  const handleCalendarToggle = () => setIsCalendarVisible((v) => !v)
  const handleDateChange = ([startDate, endDate]) => setDateRangeFilter({ startDate, endDate })
  const clearDateFilter = () => setDateRangeFilter({ startDate: null, endDate: null })

  useEffect(() => {
    if (
      streamEnabled &&
      (
        searchKey ||
        filterMode !== 'all' ||
        dateRangeFilter.startDate ||
        dateRangeFilter.endDate
      )
    ) {
      setStreamEnabled(false)
    }
  }, [searchKey, filterMode, dateRangeFilter.startDate, dateRangeFilter.endDate, streamEnabled])

  const showLiveStream =
    streamEnabled &&
    loggedIn &&
    !searchKey &&
    filterMode === 'all' &&
    !dateRangeFilter.startDate &&
    !dateRangeFilter.endDate

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <IconButton onClick={togglePause} aria-label="pause-resume">
          {paused ? <PlayArrowIcon /> : <PauseIcon />}
        </IconButton>
        <Typography variant="body2">{paused ? 'Stream paused' : 'Live stream'}</Typography>
      </div>

      <Paper component="form" className={classes.searchBar} onSubmit={(e) => e.preventDefault()}>
        <InputBase
          className={classes.input}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <div className={classes.iconsContainer}>
        <IconButton
          aria-label="friends"
          className={`${classes.icon} ${filterMode === 'friends' ? classes.activeFilter : ''}`}
          onClick={handleFriendsFilter}
        >
          👥
        </IconButton>
        <IconButton
          aria-label="filter"
          className={`${classes.icon} ${filterMode === 'interactions' ? classes.activeFilter : ''}`}
          onClick={handleInteractionsFilter}
        >
          🔥
        </IconButton>
        <IconButton
          aria-label="calendar"
          className={`${classes.icon} ${(dateRangeFilter.startDate || dateRangeFilter.endDate || isCalendarVisible) ? classes.activeFilter : ''}`}
          onClick={handleCalendarToggle}
        >
          📅
        </IconButton>
      </div>

      {isCalendarVisible && (
        <div className={classes.datePickerContainer}>
          <div className={classes.datePickerInput} style={{ marginBottom: 8 }}>
            <DatePicker
              selected={dateRangeFilter.startDate}
              onChange={(date) => handleDateChange([date, dateRangeFilter.endDate])}
              selectsStart
              startDate={dateRangeFilter.startDate}
              endDate={dateRangeFilter.endDate}
              maxDate={dateRangeFilter.endDate || new Date()}
              dateFormat="MMM d, yyyy"
              placeholderText="Select start date"
            />
          </div>
          <div className={classes.datePickerInput} style={{ marginBottom: 8 }}>
            <DatePicker
              selected={dateRangeFilter.endDate}
              onChange={(date) => handleDateChange([dateRangeFilter.startDate, date])}
              selectsEnd
              startDate={dateRangeFilter.startDate}
              endDate={dateRangeFilter.endDate}
              minDate={dateRangeFilter.startDate}
              maxDate={new Date()}
              dateFormat="MMM d, yyyy"
              placeholderText="Select end date"
            />
          </div>
          <Button variant="outlined" onClick={() => { clearDateFilter(); setIsCalendarVisible(false) }} size="small">
            Clear
          </Button>
        </div>
      )}

      {showLiveStream && (
        <LivePostStream
          paused={paused}
          friendsOnly={filterMode === 'friends'}
          searchKey={searchKey}
          startDateRange={dateRangeFilter.startDate ? format(dateRangeFilter.startDate, 'yyyy-MM-dd') : ''}
          endDateRange={dateRangeFilter.endDate ? format(dateRangeFilter.endDate, 'yyyy-MM-dd') : ''}
        />
      )}
    </div>
  )
}

export default SearchView
