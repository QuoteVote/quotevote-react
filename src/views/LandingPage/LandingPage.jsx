import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, InputBase, Paper, IconButton, Button } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import { GET_TOP_POSTS } from '../../graphql/query'
import { serializePost } from '../../utils/objectIdSerializer'
import ErrorBoundary from '../../components/ErrorBoundary'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Post from '../../components/Post/Post'

export const MOBILE_IMAGE_WIDTH = 250

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2rem',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
    background: 'none',
  },
  headerSection: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  headerLogo: {
    width: 320,
    maxWidth: '90vw',
    margin: '0 auto',
    display: 'block',
  },
  headerTagline: {
    fontWeight: 600,
    fontSize: 18,
    margin: theme.spacing(2, 0),
  },
  headerButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    flexWrap: 'wrap',
  },
  headerButton: {
    minWidth: 140,
    fontWeight: 500,
  },
  headerDivider: {
    margin: `${theme.spacing(3)}px auto`,
    border: 0,
    borderTop: '2px solid #222',
    width: '90%',
    maxWidth: 700,
  },
  container: {
    maxWidth: 600,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
  logoImage: {
    width: '100%',
    maxWidth: 500,
    height: 'auto',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(2),
    border: '2px solid #ddd',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '16px',
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.7,
    },
  },
  iconButton: {
    padding: 10,
    color: theme.palette.text.secondary,
  },
  tagline: {
    color: theme.palette.text.secondary,
  },
  iconsContainer: {
    marginTop: theme.spacing(2),
  },
  icon: {
    margin: theme.spacing(0, 2),
    color: theme.palette.text.secondary,
    fontSize: '1.5rem',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      backgroundColor: theme.palette.action.hover,
    },
  },
  list: {
    marginTop: theme.spacing(4),
    width: '100%',
  },
  activeFilter: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  datePickerContainer: {
    '& .DateRangePickerInput': {
      display: 'none',
    },
    '& .DateRangePicker_picker': {
      position: 'static',
      boxShadow: 'none',
    },
    '& .DayPicker_weekHeader_li': {
      fontWeight: 'bold',
      color: theme.palette.text.primary,
    },
    '& .CalendarDay__default': {
      border: 'none',
      color: theme.palette.text.primary,
      fontWeight: '500',
    },
    '& .CalendarDay__default:hover': {
      background: theme.palette.action.hover,
      border: 'none',
      borderRadius: '50%',
    },
    '& .CalendarDay__selected, .CalendarDay__selected:active, .CalendarDay__selected:hover': {
      background: '#28a745',
      color: 'white',
      borderRadius: '50%',
    },
    '& .CalendarDay__selected_span': {
      background: '#e9ecef',
      color: theme.palette.text.primary,
    },
    '& .CalendarDay__hovered_span, .CalendarDay__hovered_span:hover': {
      background: '#e9ecef',
      color: theme.palette.text.primary,
      borderRadius: '0',
    },
    '& .CalendarDay__selected_start.CalendarDay__selected_span, & .CalendarDay__selected_end.CalendarDay__selected_span': {
      background: '#28a745',
      color: 'white',
    },
    '& .DateInput_input, & .DateInput_input__focused': {
      borderBottom: 'none',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
  filterButton: {
    margin: theme.spacing(1),
  },
}))

export default function LandingPage() {
  const classes = useStyles()
  const [showResults, setShowResults] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const hiddenPosts = useSelector((state) => state.ui.hiddenPosts) || []
  const user = useSelector((state) => state.user.data)
  const limit = 12 + hiddenPosts.length
  const [offset, setOffset] = useState(0)
  const [dateRangeFilter, setDateRangeFilter] = useState({
    startDate: null,
    endDate: null,
  })
  
  const [filterMode, setFilterMode] = useState('all')
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [queryKey, setQueryKey] = useState(0)

  const variables = {
    limit,
    offset,
    searchKey,
    startDateRange: dateRangeFilter.startDate ? dateRangeFilter.startDate.format('YYYY-MM-DD') : '',
    endDateRange: dateRangeFilter.endDate ? dateRangeFilter.endDate.format('YYYY-MM-DD') : '',
    friendsOnly: filterMode === 'friends',
    filterKey: `${filterMode}-${dateRangeFilter.startDate ? dateRangeFilter.startDate.format('YYYY-MM-DD') : ''}-${dateRangeFilter.endDate ? dateRangeFilter.endDate.format('YYYY-MM-DD') : ''}`,
  }

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_TOP_POSTS, {
    variables,
    fetchPolicy: 'network-only',
    skip: !showResults,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  })

  const triggerQueryRefetch = () => {
    console.log('Triggering query refetch with variables:', variables)
    setQueryKey(prev => prev + 1)
    if (showResults) {
      refetch(variables)
    }
  }

  useEffect(() => {
    if (showResults) {
      console.log('Filter mode changed, refetching query')
      refetch(variables)
    }
  }, [filterMode, showResults])

  useEffect(() => {
    if (showResults && (dateRangeFilter.startDate || dateRangeFilter.endDate)) {
      console.log('Date range changed, refetching query')
      refetch(variables)
    }
  }, [dateRangeFilter.startDate, dateRangeFilter.endDate, showResults])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchKey.trim()) {
      setShowResults(true)
      setOffset(0)
      triggerQueryRefetch()
    }
  }

  const handleFriendsFilter = () => {
    if (user && user._id) {
      setFilterMode(filterMode === 'friends' ? 'all' : 'friends')
      setShowResults(true)
      setOffset(0)
    }
  }

  const handleInteractionsFilter = () => {
    setFilterMode(filterMode === 'interactions' ? 'all' : 'interactions')
    setShowResults(true)
    setOffset(0)
  }

  const handleDateFilterToggle = () => {
    setIsCalendarVisible(!isCalendarVisible)
  }

  const handleDateChange = ({ startDate, endDate }) => {
    setDateRangeFilter({ startDate, endDate })
    if (startDate || endDate) {
      setShowResults(true)
      setOffset(0)
    }
  }

  const clearDateFilter = () => {
    setDateRangeFilter({ startDate: null, endDate: null })
    setShowResults(true)
    setOffset(0)
  }

  const clearDateFilterAndClose = () => {
    clearDateFilter()
    setIsCalendarVisible(false)
  }

  const processAndSortData = (rawData) => {
    if (!rawData || !rawData.posts) {
      return null
    }

    console.log('Raw data:', rawData)

    let processedData = {
      ...rawData,
      posts: {
        ...rawData.posts,
        entities: rawData.posts.entities.map((post) => serializePost(post)),
      },
    }

    if (filterMode === 'interactions') {
      console.log('Sorting by interactions')
      console.log('Posts before sorting:', processedData.posts.entities.map(p => ({
        id: p._id,
        title: p.title,
        comments: p.comments?.length || 0,
        votes: p.votes?.length || 0,
        quotes: p.quotes?.length || 0,
        total: (p.comments?.length || 0) + (p.votes?.length || 0) + (p.quotes?.length || 0)
      })))
      
      processedData.posts.entities.sort((a, b) => {
        const aInteractions = (a.comments?.length || 0) + (a.votes?.length || 0) + (a.quotes?.length || 0)
        const bInteractions = (b.comments?.length || 0) + (b.votes?.length || 0) + (b.quotes?.length || 0)
        console.log(`Post ${a._id}: ${aInteractions} interactions, Post ${b._id}: ${bInteractions} interactions`)
        return bInteractions - aInteractions
      })
      
      console.log('Posts after sorting:', processedData.posts.entities.map(p => ({
        id: p._id,
        title: p.title,
        total: (p.comments?.length || 0) + (p.votes?.length || 0) + (p.quotes?.length || 0)
      })))
    }

    return processedData
  }

  const hasError = error && error.graphQLErrors && error.graphQLErrors.length > 0
  const errorMessage = hasError ? error.graphQLErrors[0].message : null

  if (hasError && errorMessage?.includes('friendsOnly')) {
    console.warn('Backend does not support friendsOnly parameter, using client-side filtering')
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Error loading posts</h3>
        <p>{error.message}</p>
        <pre style={{ textAlign: 'left', overflow: 'auto' }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    )
  }

  const processedData = data ? processAndSortData(data) : null

  return (
    <ErrorBoundary>
      <div className={classes.root}>
        {/* Header Section */}
        <div className={classes.headerSection}>
          <img
            src="/assets/QuoteVoteLogo.png"
            alt="QUOTE.VOTE"
            className={classes.headerLogo}
          />
          <Typography className={classes.headerTagline}>
            No algorithms. No ads. Just conversations.
          </Typography>
          <div className={classes.headerButtons}>
            <Button variant="outlined" className={classes.headerButton}>Request Invite</Button>
            <Button variant="outlined" className={classes.headerButton}>Donate</Button>
            <Button variant="outlined" className={classes.headerButton}>Volunteer</Button>
            <Button variant="outlined" className={classes.headerButton}>GitHub</Button>
          </div>
          <hr className={classes.headerDivider} />
        </div>
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.container}
        >
          {!showResults && (
            <Grid item>
              <div className={classes.logoContainer}>
                <img
                  src="/assets/QuoteVoteLogo.png"
                  alt="Quote.Vote Logo"
                  className={classes.logoImage}
                  onError={(e) => {
                    console.log('Logo image failed to load, using fallback');
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </Grid>
          )}
          <Grid item style={{ width: '100%' }}>
            <Paper
              component="form"
              className={classes.searchBar}
              onSubmit={handleSearch}
              style={{ minHeight: '50px' }}
            >
              <InputBase
                className={classes.input}
                placeholder="Search for posts..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                style={{ fontSize: '16px', padding: '8px 0' }}
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
                style={{ color: '#666' }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          {!showResults && (
            <Grid item>
              <Typography className={classes.tagline}>
                No algorithms. No ads. Just conversations.
              </Typography>
            </Grid>
          )}
          <Grid item className={classes.iconsContainer}>
            <IconButton 
              aria-label="friends" 
              className={`${classes.icon} ${filterMode === 'friends' ? classes.activeFilter : ''}`}
              onClick={handleFriendsFilter}
              title={user && user._id ? "Show posts from friends only" : "Please log in to use friends filter"}
              disabled={!user || !user._id}
              style={{ opacity: (!user || !user._id) ? 0.5 : 1 }}
            >
              👥
            </IconButton>
            <IconButton 
              aria-label="filter" 
              className={`${classes.icon} ${filterMode === 'interactions' ? classes.activeFilter : ''}`}
              onClick={handleInteractionsFilter}
              title="Sort by most interactions"
            >
              🔥
            </IconButton>
            <IconButton 
              aria-label="calendar" 
              className={`${classes.icon} ${(dateRangeFilter.startDate || dateRangeFilter.endDate || isCalendarVisible) ? classes.activeFilter : ''}`}
              onClick={handleDateFilterToggle}
              title="Filter by date range"
            >
              📅
            </IconButton>
          </Grid>
          
          {isCalendarVisible && (
            <Grid item style={{ width: '100%', marginTop: 16 }}>
              <Paper className={classes.datePickerContainer} style={{ padding: 16 }}>
                <DateRangePicker
                  startDatePlaceholderText="Start Date"
                  startDate={dateRangeFilter.startDate}
                  onDatesChange={handleDateChange}
                  endDatePlaceholderText="End Date"
                  endDate={dateRangeFilter.endDate}
                  numberOfMonths={2}
                  displayFormat="MMM D, YYYY"
                  showClearDates
                  focusedInput={focusedInput || (isCalendarVisible ? 'startDate' : null)}
                  onFocusChange={(input) => setFocusedInput(input)}
                  startDateId="startDateSearch"
                  endDateId="endDateSearch"
                  minimumNights={0}
                  isOutsideRange={() => false}
                  noBorder
                  hideKeyboardShortcutsPanel
                />
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                  <Button 
                    variant="outlined" 
                    onClick={clearDateFilterAndClose}
                    size="small"
                  >
                    Clear and Close
                  </Button>
                </div>
              </Paper>
            </Grid>
          )}

          {showResults && (filterMode !== 'all' || dateRangeFilter.startDate || dateRangeFilter.endDate) && (
            <Grid item style={{ width: '100%', marginTop: 16 }}>
              <Paper style={{ padding: 16, backgroundColor: '#f8f9fa' }}>
                <Typography variant="body2" color="textSecondary">
                  Active Filters:
                  {filterMode === 'friends' && ' 👥 Friends only'}
                  {filterMode === 'interactions' && ' 🔥 Sorted by interactions'}
                  {dateRangeFilter.startDate && ` 📅 From ${dateRangeFilter.startDate.format('MMM D, YYYY')}`}
                  {dateRangeFilter.endDate && ` to ${dateRangeFilter.endDate.format('MMM D, YYYY')}`}
                </Typography>
                {filterMode === 'friends' && (
                  <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginTop: 8 }}>
                    Showing posts from people you follow
                  </Typography>
                )}
                {filterMode === 'interactions' && (
                  <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginTop: 8 }}>
                    Posts sorted by total interactions (comments + votes + quotes)
                  </Typography>
                )}
              </Paper>
            </Grid>
          )}

          {showResults && processedData && (
            <Grid item xs={12} className={classes.list}>
              <Slider
                dots={true}
                infinite={processedData.posts.entities.length > 1}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                arrows={true}
                adaptiveHeight={true}
              >
                {processedData.posts.entities.map((post) => (
                  <div key={post._id}>
                    <Post post={post} />
                  </div>
                ))}
              </Slider>
            </Grid>
          )}
        </Grid>
      </div>
    </ErrorBoundary>
  )
}
