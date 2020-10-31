import orange from '@material-ui/core/colors/orange'
import green from '@material-ui/core/colors/green'
import purple from '@material-ui/core/colors/purple'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import lightBlue from '@material-ui/core/colors/lightBlue'
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
      color: '#E36DFA',
      fontColor: '#000000',
    },
    commented: {
      color: '#FDD835',
      fontColor: '#000000',
    },
    upvote: {
      color: '#00CF6E',
      fontColor: '#000000',
    },
    downvote: {
      color: '#FF6060',
      fontColor: '#000000',
    },
    submitted: {
      color: '#000000',
      fontColor: '#000000',
    },
    hearted: {
      color: '#F16C99',
      fontColor: '#000000',
    },
    trending: {
      color: lightBlue[500],
      fontColor: '#000000',
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
