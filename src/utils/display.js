import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import moment from 'moment'

export const getGridListCols = {
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1,
}

export function useWidth() {
  const theme = useTheme()
  const keys = [...theme.breakpoints.keys].reverse()
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || 'xs'
  )
}

export function composePost(activity, theme) {
  const time = activity && formatContentDate(activity.data.created)

  const ACTIVITY_COLORS = {
    QUOTED: theme.activityCards.quoted.color,
    UP: '#55B559',
    DOWN: '#FF1100',
    COMMENTED: theme.activityCards.commented.color,
    HEARTED: '#E91E63',
    POSTED: '#020202',
  }

  switch (activity.event) {
    case 'VOTED':
      return {
        id: activity.data._id,
        AlertTitle: `${activity.data.type.toUpperCase()}VOTED`,
        color: ACTIVITY_COLORS[`${activity.data.type.toUpperCase()}`],
        AlertBody: activity.data.content.title,
        time,
        points: activity.data.type === 'up' ? `+${activity.data.points}` : `-${activity.data.points}`,
        creator: activity.data.creator,
      }
    case 'POSTED':
      return {
        id: activity.data._id,
        AlertTitle: 'CONTENT',
        color: ACTIVITY_COLORS.POSTED,
        AlertBody: activity.data.title,
        time,
        points: '',
        creator: activity.data.creator,
      }
    case 'QUOTED':
      return {
        id: activity.data._id,
        AlertTitle: activity.event,
        color: ACTIVITY_COLORS.QUOTED,
        AlertBody: `"${activity.data.quote}"`,
        time,
        points: '',
        creator: activity.data.creator,
      }
    case 'COMMENTED':
      return {
        id: activity.data._id,
        AlertTitle: activity.event,
        color: ACTIVITY_COLORS.COMMENTED,
        AlertBody: `"${activity.data.content}"`,
        time,
        points: '',
        creator: activity.data.creator,
      }
    case 'HEARTED':
      return {
        id: activity.data._id,
        AlertTitle: activity.event,
        color: ACTIVITY_COLORS.HEARTED,
        AlertBody: activity.data.content.title,
        time,
        points: '',
        creator: activity.data.creator,
      }
    default:
      break
  }
  return null
}

function formatContentDate(sDate) {
  const a = moment.utc()
  const b = moment.utc(sDate)
  const dateDiff = a.diff(b, 'days')
  if (dateDiff <= 1) {
    return moment(sDate)
      .calendar()
      .toString()
      .replace('at', '@')
  }

  return moment(sDate).format('MMM Do')
}
