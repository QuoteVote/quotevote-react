import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, InputBase, Paper, IconButton, Button } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { GET_TOP_POSTS } from '../../graphql/query';
import { serializePost } from '../../utils/objectIdSerializer';
import PostsList from '../../components/Post/PostsList';
import ErrorBoundary from '../../components/ErrorBoundary';

// Add custom styles for the date range picker to match the screenshot
const datePickerStyles = `
  .DateRangePicker_picker {
    border-radius: 12px !important;
    box-shadow: 0 4px 24px rgba(0,0,0,0.10) !important;
    padding: 16px 8px 8px 8px !important;
    border: 1px solid #eee !important;
    background: #fff !important;
    min-width: 520px;
  }
  .DateRangePickerInput {
    display: none !important;
  }
  .DayPicker {
    font-family: 'Montserrat', 'Roboto', 'Arial', sans-serif !important;
    font-size: 1rem !important;
    background: #fff !important;
  }
  .CalendarMonth_caption {
    font-weight: 600 !important;
    font-size: 1.1rem !important;
    color: #444 !important;
    margin-bottom: 8px !important;
  }
  .DayPicker_weekHeader_li {
    color: #888 !important;
    font-weight: 500 !important;
    font-size: 0.95em !important;
  }
  .CalendarDay__default {
    border: none !important;
    color: #222 !important;
    font-weight: 500 !important;
    background: none !important;
    border-radius: 50% !important;
    transition: background 0.2s;
  }
  .CalendarDay__default:hover {
    background: #f0f2f5 !important;
    color: #111 !important;
  }
  .CalendarDay__selected, .CalendarDay__selected:active, .CalendarDay__selected:hover {
    background: #1ec773 !important; /* Green */
    color: #fff !important;
    border-radius: 50% !important;
    font-weight: 700 !important;
    box-shadow: 0 2px 8px rgba(30,199,115,0.10);
  }
  .CalendarDay__selected_span {
    background: #e9ecef !important; /* Light gray for the range */
    color: #222 !important;
    border-radius: 0 !important;
  }
  .CalendarDay__hovered_span, .CalendarDay__hovered_span:hover {
    background: #e9ecef !important;
    color: #222 !important;
    border-radius: 0 !important;
  }
  .CalendarDay__selected_start.CalendarDay__selected_span, .CalendarDay__selected_end.CalendarDay__selected_span {
    background: #1ec773 !important;
    color: #fff !important;
    border-radius: 50% !important;
  }
`;

if (typeof document !== 'undefined' && !document.getElementById('custom-date-picker-styles')) {
  const style = document.createElement('style');
  style.id = 'custom-date-picker-styles';
  style.textContent = datePickerStyles;
  document.head.appendChild(style);
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2rem',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#f0f2f5',
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
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    '& .DateRangePickerInput': {
      display: 'none !important',
    },
    '& .DateRangePicker_picker': {
      position: 'static !important',
      boxShadow: 'none !important',
      border: 'none !important',
      display: 'block !important',
      visibility: 'visible !important',
      opacity: '1 !important',
    },
    '& .DayPicker': {
      background: 'white !important',
      display: 'block !important',
      visibility: 'visible !important',
      opacity: '1 !important',
    },
    '& .DayPicker_weekHeader': {
      background: 'white !important',
      display: 'table-row !important',
    },
    '& .DayPicker_weekHeader_ul': {
      background: 'white !important',
      display: 'table-row !important',
    },
    '& .DayPicker_transitionContainer': {
      background: 'white !important',
      display: 'block !important',
      visibility: 'visible !important',
      opacity: '1 !important',
    },
    '& .DayPicker_focusRegion': {
      background: 'white !important',
      display: 'block !important',
    },
    '& .DayPicker_weekHeader_li': {
      fontWeight: 'bold',
      color: theme.palette.text.primary,
      display: 'table-cell !important',
    },
    '& .CalendarDay__default': {
      border: 'none',
      color: theme.palette.text.primary,
      fontWeight: '500',
      display: 'table-cell !important',
    },
    '& .CalendarDay__default:hover': {
      background: theme.palette.action.hover,
      border: 'none',
      borderRadius: '50%',
    },
    '& .CalendarDay__selected, .CalendarDay__selected:active, .CalendarDay__selected:hover': {
      background: '#28a745 !important',
      color: 'white !important',
      borderRadius: '50% !important',
    },
    '& .CalendarDay__selected_span': {
      background: '#e9ecef !important',
      color: theme.palette.text.primary,
    },
    '& .CalendarDay__hovered_span, .CalendarDay__hovered_span:hover': {
      background: '#e9ecef !important',
      color: theme.palette.text.primary,
      borderRadius: '0',
    },
    '& .CalendarDay__selected_start.CalendarDay__selected_span, & .CalendarDay__selected_end.CalendarDay__selected_span': {
      background: '#28a745 !important',
      color: 'white !important',
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
}));

export default function SearchPage() {
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
  
  // New state for filter modes
  const [filterMode, setFilterMode] = useState('all') // 'all', 'friends', 'interactions'
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  
  // Add a query key that changes when filters change to force refetch
  const [queryKey, setQueryKey] = useState(0)

  const variables = {
    limit,
    offset,
    searchKey,
    startDateRange: dateRangeFilter.startDate ? dateRangeFilter.startDate.format('YYYY-MM-DD') : '',
    endDateRange: dateRangeFilter.endDate ? dateRangeFilter.endDate.format('YYYY-MM-DD') : '',
    friendsOnly: filterMode === 'friends',
    // Add a dummy variable that changes when filters change to force refetch
    filterKey: `${filterMode}-${dateRangeFilter.startDate ? dateRangeFilter.startDate.format('YYYY-MM-DD') : ''}-${dateRangeFilter.endDate ? dateRangeFilter.endDate.format('YYYY-MM-DD') : ''}`,
  }

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_TOP_POSTS, {
    variables,
    fetchPolicy: 'network-only',
    skip: !showResults,
    errorPolicy: 'all', // Allow partial errors
    notifyOnNetworkStatusChange: true,
  })

  // Function to trigger query refetch when filters change
  const triggerQueryRefetch = () => {
    console.log('Triggering query refetch with variables:', variables)
    setQueryKey(prev => prev + 1)
    if (showResults) {
      refetch(variables)
    }
  }

  // Refetch when filter mode changes
  useEffect(() => {
    if (showResults) {
      console.log('Filter mode changed, refetching query')
      refetch(variables)
    }
  }, [filterMode, showResults])

  // Refetch when date range changes
  useEffect(() => {
    if (showResults && (dateRangeFilter.startDate || dateRangeFilter.endDate)) {
      console.log('Date range changed, refetching query')
      refetch(variables)
    }
  }, [dateRangeFilter.startDate, dateRangeFilter.endDate, showResults])

  const handleSearch = (e) => {
    e.preventDefault()
    setShowResults(true)
  }

  const handleFriendsFilter = () => {
    console.log('Friends filter clicked, current mode:', filterMode)
    
    if (!user || !user._id) {
      console.log('User not logged in, cannot use friends filter')
      alert('Please log in to use the friends filter')
      return
    }
    
    setFilterMode(filterMode === 'friends' ? 'all' : 'friends')
    setOffset(0)
    triggerQueryRefetch()
    setShowResults(true)
  }

  const handleInteractionsFilter = () => {
    console.log('Interactions filter clicked, current mode:', filterMode)
    setFilterMode(filterMode === 'interactions' ? 'all' : 'interactions')
    setOffset(0)
    triggerQueryRefetch()
    setShowResults(true)
  }

  const handleDateFilterToggle = (event) => {
    const willBeVisible = !isCalendarVisible;
    setIsCalendarVisible(willBeVisible);
    setFocusedInput(willBeVisible ? 'startDate' : null);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setDateRangeFilter({ startDate, endDate })
    setOffset(0)
    // Trigger refetch after a short delay to ensure state is updated
    setTimeout(() => {
      triggerQueryRefetch()
    }, 100)

    if (startDate && endDate) {
      setIsCalendarVisible(false);
      setFocusedInput(null);
    }
    setShowResults(true)
  }

  const clearDateFilter = () => {
    setDateRangeFilter({ startDate: null, endDate: null })
    setOffset(0)
    setTimeout(() => {
      triggerQueryRefetch()
    }, 100)
  }

  const clearDateFilterAndClose = () => {
    clearDateFilter();
    setIsCalendarVisible(false);
    setFocusedInput(null);
  }

  // Sort posts by interactions if interactions filter is active
  const processAndSortData = (rawData) => {
    if (!rawData) return null

    console.log('Processing data with filter mode:', filterMode)
    console.log('Raw data:', rawData)

    let processedData = {
      ...rawData,
      posts: {
        ...rawData.posts,
        entities: rawData.posts.entities.map((post) => serializePost(post)),
      },
    }

    // Sort by interactions if interactions filter is active
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

  // Handle GraphQL errors gracefully
  const hasError = error && error.graphQLErrors && error.graphQLErrors.length > 0
  const errorMessage = hasError ? error.graphQLErrors[0].message : null

  if (hasError && errorMessage?.includes('friendsOnly')) {
    // If backend doesn't support friendsOnly, fall back to client-side filtering
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

  const processedData = processAndSortData(data)

  return (
    <ErrorBoundary>
      <div className={classes.root}>
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
                  src="/assets/search-quote-vote.png"
                  alt="logo"
                  className={classes.logoImage}
                />
              </div>
            </Grid>
          )}
          <Grid item style={{ width: '100%' }}>
            <Paper
              component="form"
              className={classes.searchBar}
              onSubmit={handleSearch}
            >
              <InputBase
                className={classes.input}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
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
              onClick={e => handleDateFilterToggle(e)}
              title="Filter by date range"
            >
              📅
            </IconButton>
          </Grid>
          
          {isCalendarVisible && (
            <Grid item xs={12} style={{ marginTop: '20px', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', background: '#fff', border: '1px solid #eee', maxWidth: 600 }}>
              <DateRangePicker
                startDatePlaceholderText="Start Date"
                startDate={dateRangeFilter.startDate}
                onDatesChange={handleDateChange}
                endDatePlaceholderText="End Date"
                endDate={dateRangeFilter.endDate}
                numberOfMonths={2}
                displayFormat="MMM D, YYYY"
                showClearDates
                focusedInput={focusedInput || 'startDate'}
                onFocusChange={(input) => setFocusedInput(input)}
                startDateId="startDateSearch"
                endDateId="endDateSearch"
                minimumNights={0}
                isOutsideRange={() => false}
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
            </Grid>
          )}
          
          {/* Filter Status Display */}
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

          {showResults && (
            <Grid item xs={12} className={classes.list}>
              {loading && !processedData && <div>Loading...</div>}
              {loading && processedData && (
                <div style={{ textAlign: 'center', padding: '10px', color: '#666' }}>
                  Refreshing results...
                </div>
              )}
              {processedData && (
                <PostsList
                  data={processedData}
                  loading={loading}
                  limit={limit}
                  fetchMore={fetchMore}
                  variables={variables}
                  cols={1}
                />
              )}
            </Grid>
          )}
        </Grid>
      </div>
    </ErrorBoundary>
  )
}

