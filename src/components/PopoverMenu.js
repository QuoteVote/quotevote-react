import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3c4858',
    },
  },
})

function PopoverMenu({
  appRoutes, handleClick, handleClose, anchorEl, page,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Hidden mdUp implementation="css">
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {appRoutes.map((appRoute) => (
                <MenuItem
                  selected={appRoute.name === page}
                  component={Link}
                  to={`${appRoute.layout}${appRoute.path}`}
                  onClick={handleClose}
                >
                  {appRoute.name}
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h6">
              {page}
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
    </ThemeProvider>
  )
}
PopoverMenu.propTypes = {
  appRoutes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.any.isRequired,
  page: PropTypes.string.isRequired,
}

export default PopoverMenu
