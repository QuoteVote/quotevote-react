import { createTheme } from '@material-ui/core/styles'

export default createTheme({
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
    accent: {
      main: '#56b3ff',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
})
