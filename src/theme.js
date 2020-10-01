import orange from '@material-ui/core/colors/orange'
import green from '@material-ui/core/colors/green'
import purple from '@material-ui/core/colors/purple'
import red from '@material-ui/core/colors/red'
import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import pink from '@material-ui/core/colors/pink'

const theme = {
  palette: {
    primary: green,
    secondary: purple,
    error: red,
  },
  activityCards: {
    quoted: {
      color: cyan[500],
    },
    commented: {
      color: orange[500],
    },
    upvote: {
      color: green[500],
    },
    downvote: {
      color: red[500],
    },
    submitted: {
      color: '#000000',
    },
    hearted: {
      color: pink,
    },
  },
  subHeader: {
    activeIcon: {
      color: teal.A400,
    },
    default: {
      color: 'black',
    },
    followButton: {
      backgroundColor: '#00CF6E',
      color: 'white',
    },
  },
}

export default theme
