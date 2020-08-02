import orange from '@material-ui/core/colors/orange'
// import blue from '@material-ui/core/colors/blue'
// import grey from '@material-ui/core/colors/grey'
import pink from '@material-ui/core/colors/pink'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
// import yellow from '@material-ui/core/colors/yellow'
import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'

const theme = {
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
