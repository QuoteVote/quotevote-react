import {
  drawerWidth,
  drawerMiniWidth,
  transition,
  containerFluid,
} from 'assets/jss/material-dashboard-pro-react'

const appStyle = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    marginRight: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  menuIcons: {
    color: 'secondary',
  },
  profileRow: {
    backgroundColor: 'rgba(205, 214, 224, 0.4)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
  },
  profileBlockImage: {
    width: '100px',
  },
  profileBlockName: {
    marginTop: '5px',
    marginLeft: '5px',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '24px',
    color: '#424556',
    paddingTop: '10px',
    paddingRight: '10px',
  },
  voxPop: {
    height: '80px',
    paddingLeft: '15px',
  },
  rightMenuButton: {
    marginLeft: theme.spacing(1),
  },
  appBar: {
    color: 'light',
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
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
    height: '100%',
    marginTop: theme.spacing(10),
  },
  contentChat: {
    flexGrow: 1,
    height: '100%',
    marginTop: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      marginRight: drawerWidth,
    },
    [theme.breakpoints.down('sm')]: {
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
