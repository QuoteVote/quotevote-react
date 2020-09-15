import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import PropTypes from 'prop-types'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00cf6e',
    },
  },
})

function DoubleArrowIconButton({ onClick }) {
  return (
    <MuiThemeProvider theme={customTheme}>
      <IconButton color="primary" size="small">
        <DoubleArrowIcon onClick={onClick} />
      </IconButton>
    </MuiThemeProvider>
  )
}

DoubleArrowIconButton.propTypes = {
  onClick: PropTypes.func,
}
export default DoubleArrowIconButton
