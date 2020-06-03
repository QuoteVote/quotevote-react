import {
  drawerWidth,
  drawerMiniWidth,
  transition,
  containerFluid,
} from 'assets/jss/material-dashboard-pro-react'

const appStyle = (theme) => ({
  wrapper: {
    display: 'flex',
  },
  mainPanel: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerMiniWidth}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  mainPanelResize: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      marginRight: drawerWidth,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginRight: drawerWidth,
    },
  },
  container: { ...containerFluid },
  map: {
    marginTop: '70px',
  },
  mainPanelSidebarMini: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerMiniWidth}px)`,
    },
  },
  mainPanelWithPerfectScrollbar: {
    overflow: 'hidden !important',
  },
})

export default appStyle
