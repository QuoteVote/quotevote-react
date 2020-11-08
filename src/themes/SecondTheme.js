import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#00cf6e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E91E63',
    },
    text: {
      primary: '#424556',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
})
